import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import useRequest from './useRequest';
import { forceReload, getCookie, removeAllCookies, setCookie } from '@/utils';

export interface States {
  isLoggedIn?: boolean;
  workspace?: IWorkspace;
  user?: IUser;
}

const InitStoreData: States = {
  isLoggedIn: false,
  workspace: undefined,
  user: undefined,
};

export interface Actions {
  setIsLoading: (isLoading?: boolean) => void;
  setWorkspace: (workspace?: IWorkspace) => void;
  setUser: (user?: IUser) => void;
}

const useStore = create(
  immer<States & Actions>((set) => ({
    ...InitStoreData,
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    setWorkspace: (workspace) => set(() => ({ workspace })),
    setUser: (user) =>
      set(() => {
        return {
          user,
          isLoggedIn: Boolean(user),
          workspace: user?.teams && user?.teams[0] ? user.teams[0].workspace : undefined,
        };
      }),
  })),
);

const useApp = () => {
  const states = useStore();
  const { callRequest, calling } = useRequest();

  const getTokens = () => {
    const accessTkn = getCookie('acc-tkn');
    const refreshTkn = getCookie('ref-tkn');
    return {
      accessToken: accessTkn,
      refreshToken: refreshTkn,
      tokensExist: Boolean(accessTkn && refreshTkn),
    };
  };

  const syncTokens = async () => {
    const { tokensExist, accessToken, refreshToken } = getTokens();

    if (tokensExist) {
      try {
        const response = await callRequest<{ tokens: ITokens }>('POST', '/api/v1/auth/refresh', {
          body: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        });

        setCookie('acc-tkn', response.tokens.access_token);
        setCookie('ref-tkn', response.tokens.refresh_token);
        setCookie('exp-tkn', response.tokens.expires_at);

        forceReload('/');
      } catch (error) {
        removeAllCookies();
        forceReload('/auth/login');
      }
    } else {
      forceReload('/auth/login');
    }
  };

  const fetchUser = async () => {
    const { tokensExist } = getTokens();

    if (tokensExist) {
      try {
        const response = await callRequest<{ user: IUser }>('GET', '/api/v1/auth/user');
        states.setUser(response.user);
      } catch (error) {
        states.setUser();
        syncTokens();
      }
    }
  };

  return {
    ...states,
    calling,
    fetchUser,
    syncTokens,
    callRequest,
  };
};

export default useApp;
