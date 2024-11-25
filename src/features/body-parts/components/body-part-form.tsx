import { Box, Button, SegmentedControl, Stack, TextInput, Textarea } from '@mantine/core';
import { useBodyPartForm } from '../hooks';
import { Uploader } from '@/features/uploader';
import { BodyPartLevelDic } from '@/utils/dictionary';

interface BodyPartFormProps {
  bodyPart?: IBodyPart;
  done?: (bodyPart?: IBodyPart) => void;
}

const BodyPartForm = ({ bodyPart, done }: BodyPartFormProps) => {
  const { form, loading, onSubmit } = useBodyPartForm({ bodyPart, done });

  return (
    <Box p='md' mt={-12}>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput withAsterisk label='Title' {...form.getInputProps('title')} />

          <Textarea label='Description' rows={4} {...form.getInputProps('description')} />

          <Uploader
            h={200}
            label='Cover'
            data={{ url: bodyPart?.media_url || undefined }}
            onUpload={(media) => {
              form.setFieldValue('media_url', media.url);
            }}
            onDelete={() => {
              form.setFieldValue('media_url', '');
            }}
          />

          <SegmentedControl
            w='100%'
            data={[
              { label: BodyPartLevelDic['beginner'], value: 'beginner' },
              { label: BodyPartLevelDic['intermediate'], value: 'intermediate' },
              { label: BodyPartLevelDic['advanced'], value: 'advanced' },
            ]}
            {...form.getInputProps('level')}
          />

          <Button loading={loading} type='submit' size='lg' fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BodyPartForm;
