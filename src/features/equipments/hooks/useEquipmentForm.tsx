import { useRequest } from '@/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useMemo } from 'react';
import { z } from 'zod';

interface UseEquipmentFormProps {
  equipment?: IEquipment;
  done?: (equipment?: IEquipment) => void;
}

interface EquipmentStates {
  title: string;
  title_en: string;
  description: string;
  media_url: string;
}

const schema = z.object({
  title: z.string().min(1).max(100),
  title_en: z.string().min(1).max(100),
});

const useEquipmentForm = ({ equipment, done }: UseEquipmentFormProps = {}) => {
  const { callRequest, calling } = useRequest();

  const isCreateMode = useMemo(() => {
    return !Boolean(equipment && equipment.id);
  }, [equipment]);

  const form = useForm<EquipmentStates>({
    initialValues: {
      title: equipment?.title || '',
      title_en: equipment?.title_en || '',
      description: equipment?.description || '',
      media_url: equipment?.media_url || '',
    },
    validate: zodResolver(schema),
  });

  const onSubmit = async (values: EquipmentStates) => {
    const response = await callRequest<{ body_part: IEquipment }>(
      isCreateMode ? 'POST' : 'PUT',
      isCreateMode ? '/api/v1/equipments' : `/api/v1/equipments/${equipment?.id}`,
      {
        body: values,
      },
    );

    if (response.unprocessable) {
      form.setErrors(response.errors);
      showNotification({
        color: 'red',
        title: 'Equipment',
        message: 'Submit encountered an error',
      });
    }

    if (response.success && done) {
      showNotification({
        color: 'green',
        title: 'Equipment',
        message: 'Equipment successfully submitted',
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

export default useEquipmentForm;
