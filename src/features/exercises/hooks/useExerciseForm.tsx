import { useRequest } from '@/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useMemo } from 'react';
import { z } from 'zod';

interface UseExerciseFormProps {
  exercise?: IExercise;
  done?: (exercise?: IExercise) => void;
}

interface ExerciseStates {
  body_part_id: string;
  equipment_id?: string;
  title: string;
  title_en: string;
  description: string;
  cover_url: string;
  media_url: string;
  gender: TUserGender;
}

const schema = z.object({
  title: z.string().min(1).max(100),
});

const useExerciseForm = ({ exercise, done }: UseExerciseFormProps) => {
  const { callRequest, calling } = useRequest();

  const isCreateMode = useMemo(() => {
    return !Boolean(exercise && exercise.id);
  }, [exercise]);

  const form = useForm<ExerciseStates>({
    initialValues: {
      body_part_id: exercise?.body_part_id || '',
      equipment_id: exercise?.equipment_id || '',
      title: exercise?.title || '',
      title_en: exercise?.title_en || '',
      description: exercise?.description || '',
      cover_url: exercise?.cover_url || '',
      media_url: exercise?.media_url || '',
      gender: exercise?.gender || 'male',
    },
    validate: zodResolver(schema),
  });

  const onSubmit = async (values: ExerciseStates) => {
    const response = await callRequest<{ body_part: IExercise }>(
      isCreateMode ? 'POST' : 'PUT',
      isCreateMode ? '/api/v1/exercises' : `/api/v1/exercises/${exercise?.id}`,
      {
        body: values,
      },
    );

    if (response.unprocessable) {
      form.setErrors(response.errors);
      showNotification({
        color: 'red',
        title: 'Exercise',
        message: 'Registration failed',
      });
    }

    if (response.success && done) {
      showNotification({
        color: 'green',
        title: 'Exercise',
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

export default useExerciseForm;
