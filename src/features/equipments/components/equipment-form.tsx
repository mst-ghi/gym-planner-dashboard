import { Box, Button, Stack, TextInput, Textarea } from '@mantine/core';
import { useEquipmentForm } from '../hooks';
import { Uploader } from '@/features/uploader';

interface EquipmentFormProps {
  equipment?: IEquipment;
  done?: (equipment?: IEquipment) => void;
}

const EquipmentForm = ({ equipment, done }: EquipmentFormProps) => {
  const { form, loading, onSubmit } = useEquipmentForm({ equipment, done });

  return (
    <Box p='md' mt={-12}>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput withAsterisk label='Title' {...form.getInputProps('title')} />

          <TextInput withAsterisk label='Title En' {...form.getInputProps('title_en')} />

          <Textarea label='Description' rows={4} {...form.getInputProps('description')} />

          <Uploader
            height={200}
            label='Cover'
            data={{ url: form.values.media_url || undefined }}
            onUpload={(media) => {
              form.setFieldValue('media_url', media.url);
            }}
            onDelete={() => {
              form.setFieldValue('media_url', '');
            }}
          />

          <Button loading={loading} type='submit' size='lg' fullWidth disabled={!form.isValid()}>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EquipmentForm;
