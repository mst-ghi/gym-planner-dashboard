import { Button, Flex, Grid, TextInput, Textarea } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useMedialRecordForm } from '../hooks';

interface MedicalRecordFormProps {
  userId?: string;
  medicalRecord?: IMedicalRecord;
  disabled?: boolean;
  done?: (medicalRecord?: IMedicalRecord) => void;
}

const MedicalRecordForm = ({ userId, medicalRecord, disabled, done }: MedicalRecordFormProps) => {
  const { form, loading, onSubmit } = useMedialRecordForm({ userId, medicalRecord, done });

  return (
    <form onSubmit={onSubmit}>
      <Grid grow>
        <Grid.Col span={6}>
          <TextInput
            disabled={disabled}
            label='Training History'
            {...form.getInputProps('practice_history')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            disabled={disabled}
            label='Sports Supplements History'
            {...form.getInputProps('taking_sports_supplements')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            disabled={disabled}
            label='Bone Fracture History'
            {...form.getInputProps('history_of_bone_fracture')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            disabled={disabled}
            label='Food Allergy'
            {...form.getInputProps('food_allergy')}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <TimeInput
            mt='xs'
            disabled={disabled}
            label='Wake-up Time'
            {...form.getInputProps('wake_up_time')}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TimeInput
            mt='xs'
            disabled={disabled}
            label='Breakfast Time'
            {...form.getInputProps('breakfast_time')}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TimeInput
            mt='xs'
            disabled={disabled}
            label='Lunch Time'
            {...form.getInputProps('lunch_time')}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TimeInput
            mt='xs'
            disabled={disabled}
            label='Dinner Time'
            {...form.getInputProps('dinner_time')}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TimeInput
            mt='xs'
            disabled={disabled}
            label='Sleep Time'
            {...form.getInputProps('sleeping_time')}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TimeInput
            mt='xs'
            disabled={disabled}
            label='Practice Time'
            {...form.getInputProps('practice_time')}
          />
        </Grid.Col>

        <Grid.Col span={8}>
          <Textarea disabled={disabled} label='User Message' {...form.getInputProps('note')} />
        </Grid.Col>

        <Grid.Col span={4}>
          <Flex justify='flex-end' align='flex-end' h='100%'>
            <Button loading={loading} type='submit' size='lg' h={57} fullWidth>
              Edit Medical Record
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default MedicalRecordForm;
