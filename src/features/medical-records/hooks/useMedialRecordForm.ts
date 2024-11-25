import { useRequest } from '@/hooks';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface MedialRecordFormStates extends Omit<IMedicalRecord, 'id' | 'created_at' | 'updated_at'> {}

interface UseMedialRecordFormProps {
  userId?: string;
  medicalRecord?: IMedicalRecord;
  done?: (medicalRecord?: IMedicalRecord) => void;
}

const useMedialRecordForm = ({ userId, medicalRecord, done }: UseMedialRecordFormProps = {}) => {
  const { calling, callRequest } = useRequest();

  const form = useForm<MedialRecordFormStates>({
    initialValues: {
      user_id: userId || medicalRecord?.user_id || '',
      practice_history: medicalRecord?.practice_history || '',
      taking_sports_supplements: medicalRecord?.taking_sports_supplements || '',
      history_of_bone_fracture: medicalRecord?.history_of_bone_fracture || '',
      food_allergy: medicalRecord?.food_allergy || '',
      wake_up_time: medicalRecord?.wake_up_time || '',
      breakfast_time: medicalRecord?.breakfast_time || '',
      lunch_time: medicalRecord?.lunch_time || '',
      dinner_time: medicalRecord?.dinner_time || '',
      sleeping_time: medicalRecord?.sleeping_time || '',
      practice_time: medicalRecord?.practice_time || '',
      note: medicalRecord?.note || '',
      front_media_url: medicalRecord?.front_media_url || '',
      right_media_url: medicalRecord?.right_media_url || '',
      left_media_url: medicalRecord?.left_media_url || '',
      back_media_url: medicalRecord?.back_media_url || '',
      front_arm_media_url: medicalRecord?.front_arm_media_url || '',
      back_arm_media_url: medicalRecord?.back_arm_media_url || '',
    },
  });

  const onSubmit = async (values: MedialRecordFormStates) => {
    const response = await callRequest<{ medical_record: IMedicalRecord }>(
      'PUT',
      '/api/v1/medical-records',
      { body: values },
    );

    if (response.unprocessable) {
      form.setErrors(response.errors);
      showNotification({
        color: 'red',
        title: 'Edit Medical Record',
        message: 'Edit encountered an error',
      });
    }

    if (response.success && done) {
      showNotification({
        color: 'green',
        title: 'Edit Medical Record',
        message: 'Edit successful',
      });
      done(response.medical_record);
    }
  };

  return {
    form,
    loading: calling,
    onSubmit: form.onSubmit(onSubmit),
  };
};

export default useMedialRecordForm;
