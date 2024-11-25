import { z } from 'zod';
import { useRequest } from '@/hooks';
import { useForm, zodResolver } from '@mantine/form';

const schema = z.object({
  email: z.string().email(),
});

interface ForgetFormState {
  email: string;
}

const useForget = () => {
  const { calling, callRequest } = useRequest();

  const form = useForm<ForgetFormState>({
    initialValues: {
      email: '',
    },
    validate: zodResolver(schema),
  });

  const onSubmit = (values: ForgetFormState) => {
    console.log('values', values);
  };

  return {
    form,
    loading: calling,
    onSubmit: form.onSubmit(onSubmit),
  };
};

export default useForget;
