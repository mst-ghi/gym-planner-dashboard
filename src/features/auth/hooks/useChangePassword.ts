import { z } from 'zod';
import { useRequest } from '@/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface ChangePasswordFormValues {
  current_password: string;
  password: string;
  password_repeat: string;
}

const schema = z
  .object({
    current_password: z.string().min(8).max(100),
    password: z.string().min(8).max(100),
    password_repeat: z.string().min(8).max(100),
  })
  .superRefine(({ password_repeat, password }, ctx) => {
    if (password_repeat !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The password confirmation is incorrect.',
        path: ['password_repeat'],
      });
    }
  });

const useChangePassword = ({ done }: { done?: () => void }) => {
  const { callRequest, calling } = useRequest();

  const form = useForm<ChangePasswordFormValues>({
    initialValues: {
      current_password: '',
      password: '',
      password_repeat: '',
    },
    validate: zodResolver(schema),
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    const body = {
      current_password: values.current_password,
      new_password: values.password,
    };

    const res = await callRequest<{ tokens: ITokens }>('POST', '/api/v1/auth/change-password', {
      body,
    });

    if (res.unprocessable) {
      form.setErrors(res.errors);
    }

    if (res.success) {
      showNotification({
        color: 'green',
        title: 'Change Password',
        message: 'Password change successful',
      });

      if (done) {
        done();
      }
    }
  };

  return {
    form,
    loading: calling,
    onSubmit: form.onSubmit(onSubmit),
  };
};

export default useChangePassword;
