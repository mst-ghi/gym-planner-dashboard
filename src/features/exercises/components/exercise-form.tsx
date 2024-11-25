import { Box, Button, Flex, SegmentedControl, Stack, TextInput, Textarea } from '@mantine/core';
import { useExerciseForm } from '../hooks';
import { Uploader } from '@/features/uploader';
import { BodyPartSelect } from '@/features/body-parts';
import { EquipmentSelect } from '@/features/equipments';
import { UserGenderDic } from '@/utils/dictionary';

interface ExerciseFormProps {
  exercise?: IExercise;
  hideBodyPartInput?: boolean;
  done?: (exercise?: IExercise) => void;
}

const ExerciseForm = ({ exercise, hideBodyPartInput = false, done }: ExerciseFormProps) => {
  const { form, loading, onSubmit } = useExerciseForm({ exercise, done });

  return (
    <Box p='md' mt={-12}>
      <form onSubmit={onSubmit}>
        <Stack>
          {!hideBodyPartInput && (
            <BodyPartSelect
              withAsterisk
              mb={0}
              w='100%'
              size='sm'
              label='Body Part'
              {...form.getInputProps('body_part_id')}
            />
          )}

          <EquipmentSelect
            mb={0}
            w='100%'
            size='sm'
            label='Equipment'
            {...form.getInputProps('equipment_id')}
          />

          <TextInput withAsterisk label='Title' {...form.getInputProps('title')} />

          <TextInput withAsterisk label='English Title' {...form.getInputProps('title_en')} />

          <Textarea withAsterisk label='Description' {...form.getInputProps('description')} />

          <Uploader
            height={200}
            label='Cover'
            data={{ url: form.values.cover_url || undefined }}
            onUpload={(media) => {
              form.setFieldValue('cover_url', media.url);
            }}
            onDelete={() => {
              form.setFieldValue('cover_url', '');
            }}
          />

          <Uploader
            height={200}
            label='Media/Video'
            data={{ url: form.values.media_url || undefined }}
            onUpload={(media) => {
              form.setFieldValue('media_url', media.url);
            }}
            onDelete={() => {
              form.setFieldValue('media_url', '');
            }}
          />

          <Flex direction='row' align='center' gap='sm'>
            <Button loading={loading} type='submit' size='lg' fullWidth disabled={!form.isValid()}>
              Submit
            </Button>

            <SegmentedControl
              w='100%'
              size='lg'
              data={[
                { label: UserGenderDic['male'], value: 'male' },
                { label: UserGenderDic['female'], value: 'female' },
              ]}
              {...form.getInputProps('gender')}
            />
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default ExerciseForm;
