import { useRequest } from '@/hooks';
import { forceReload, removeAllCookies } from '@/utils';

const useLogout = () => {
  const { calling, callRequest } = useRequest();

  const logout = async () => {
    try {
      await callRequest('GET', '/api/v1/auth/logout');
    } catch (error) {
      console.log('logout err', error);
    } finally {
      removeAllCookies();
      forceReload('/auth/login');
    }
  };

  return {
    loading: calling,
    logout,
  };
};

export default useLogout;
