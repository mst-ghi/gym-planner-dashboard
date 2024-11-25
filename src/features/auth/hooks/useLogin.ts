import { z } from 'zod';
import { useApp, useRequest } from '@/hooks';
import { forceReload, setCookie } from '@/utils';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

const schema = z.object({
  email_or_mobile: z.string(),
  password: z.string().min(8).max(100),
});

interface LoginFormState {
  email_or_mobile: string;
  password: string;
}

const useLogin = () => {
  const { setUser } = useApp();
  const { calling, callRequest, fetchUser } = useRequest();

  const form = useForm<LoginFormState>({
    initialValues: {
      email_or_mobile: '',
      password: '',
    },
    validate: zodResolver(schema),
  });

  const setTokensToCookies = async (tokens: ITokens) => {
    setCookie('acc-tkn', tokens.access_token);
    setCookie('ref-tkn', tokens.refresh_token);
    setCookie('exp-tkn', tokens.expires_at);

    setUser(await fetchUser());
  };

  const onSubmit = async (values: LoginFormState) => {
    try {
      const res = await callRequest<{ tokens: ITokens }>('POST', '/api/v1/auth/login', {
        body: values,
      });

      if (res.success) {
        await setTokensToCookies(res.tokens);

        forceReload('/dashboard');
      } else {
        showNotification({
          color: 'red',
          title: 'System Login',
          message: res.message || 'Incorrect user credentials',
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'System Login',
        message: 'Incorrect user credentials',
      });
    }
  };

  return {
    form,
    loading: calling,
    onSubmit: form.onSubmit(onSubmit),
  };
};

export default useLogin;
