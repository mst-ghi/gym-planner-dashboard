import { Uploader } from '@/features/uploader';
import usePostForm, { UsePostFormProps } from '../hooks/usePostForm';
import {
  Box,
  Button,
  Flex,
  SegmentedControl,
  Stack,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core';

const PostForm = ({ post, done }: UsePostFormProps) => {
  const { form, loading, onSubmit } = usePostForm({ post, done });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap='xs' mx='sm' mb='sm'>
        <TextInput withAsterisk label='Title' {...form.getInputProps('title')} />
        <Textarea withAsterisk rows={7} label='Content' {...form.getInputProps('content')} />

        <Box mt='sm'>
          <Uploader
            withAsterisk
            height={200}
            label='Post Cover'
            data={{ url: form.values.cover_url }}
            onUpload={(media) => form.setFieldValue('cover_url', media.url)}
          />
        </Box>

        <Box mt='sm'>
          <TagsInput
            withAsterisk
            label='Tags'
            placeholder='Type and press Enter'
            {...form.getInputProps('tags')}
          />
        </Box>

        <Flex direction='row' mt='lg' align='center' gap='lg' justify='space-between'>
          <SegmentedControl
            w='100%'
            data={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'suspended' },
            ]}
            {...form.getInputProps('status')}
          />

          <Button type='submit' miw={300} loading={loading} disabled={!form.isValid()}>
            Submit
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

export default PostForm;
