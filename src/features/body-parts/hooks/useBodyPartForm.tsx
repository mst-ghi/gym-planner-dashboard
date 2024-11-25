import { useRequest } from '@/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useMemo } from 'react';
import { z } from 'zod';

interface UseBodyPartFormProps {
  bodyPart?: IBodyPart;
  done?: (bodyPart?: IBodyPart) => void;
}

interface BodyPartStates {
  title: string;
  description: string;
  media_url: string;
  level: TBodyPartLevel;
}

const schema = z.object({
  title: z.string().min(1).max(100),
});

const useBodyPartForm = ({ bodyPart, done }: UseBodyPartFormProps = {}) => {
  const { callRequest, calling } = useRequest();

  const isCreateMode = useMemo(() => {
    return !Boolean(bodyPart && bodyPart.id);
  }, [bodyPart]);

  const form = useForm<BodyPartStates>({
    initialValues: {
      title: bodyPart?.title || '',
      description: bodyPart?.description || '',
      media_url: bodyPart?.media_url || '',
      level: bodyPart?.level || 'beginner',
    },
    validate: zodResolver(schema),
  });

  const onSubmit = async (values: BodyPartStates) => {
    const response = await callRequest<{ body_part: IBodyPart }>(
      isCreateMode ? 'POST' : 'PUT',
      isCreateMode ? '/api/v1/body-parts' : `/api/v1/body-parts/${bodyPart?.id}`,
      {
        body: values,
      },
    );

    if (response.unprocessable) {
      form.setErrors(response.errors);
      showNotification({
        color: 'red',
        title: 'Body Part',
        message: 'Registration failed',
      });
    }

    if (response.success && done) {
      showNotification({
        color: 'green',
        title: 'Body Part',
        message: 'Registration was successful',
      });
      done(response.body_part);
    }
  };

  return {
    form,
    loading: calling,
    onSubmit: form.onSubmit(onSubmit),
  };
};

export default useBodyPartForm;
