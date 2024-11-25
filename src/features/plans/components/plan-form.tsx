import { Uploader } from '@/features/uploader';
import usePlanForm, { UsePlanFormProps } from '../hooks/usePlanForm';
import {
  Box,
  Button,
  Flex,
  NumberInput,
  SegmentedControl,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';

const PlanForm = ({ plan, done }: UsePlanFormProps) => {
  const { form, loading, onSubmit } = usePlanForm({ plan, done });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap='xs' mx='sm' mb='sm'>
        <TextInput withAsterisk label='Title' {...form.getInputProps('title')} />
        <Textarea withAsterisk label='Description' {...form.getInputProps('description')} />

        <SimpleGrid cols={2}>
          <NumberInput withAsterisk label='Price' {...form.getInputProps('price')} />
          <NumberInput
            withAsterisk
            label='Discount Amount (Percentage)'
            min={0}
            max={100}
            {...form.getInputProps('discount')}
          />
        </SimpleGrid>

        <SimpleGrid cols={2}>
          <Select
            mt={0}
            withAsterisk
            label='Course Type'
            data={[
              { value: 'day', label: 'day' },
              { value: 'week', label: 'week' },
              { value: 'month', label: 'month' },
              { value: 'year', label: 'year' },
            ]}
            {...form.getInputProps('period_type')}
          />
          <NumberInput
            withAsterisk
            label='period type'
            min={1}
            {...form.getInputProps('period_value')}
          />
        </SimpleGrid>

        <Box mt='sm'>
          <Uploader
            height={200}
            label='cover plan'
            data={{ url: form.values.cover_url }}
            onUpload={(media) => form.setFieldValue('cover_url', media.url)}
          />
        </Box>

        <Box mt='sm'>
          <Text size='sm' fw={500}>
            Display priority
          </Text>
          <Slider
            min={0}
            max={1000}
            size='lg'
            step={10}
            showLabelOnHover
            {...form.getInputProps('priority')}
          />
        </Box>

        <Flex direction='row' mt='lg' align='center' gap='lg' justify='space-between'>
          <Button type='submit' miw={300} loading={loading} disabled={!form.isValid()}>
            registration
          </Button>

          <SegmentedControl
            w='100%'
            data={[
              { label: 'active', value: 'active' },
              { label: 'inactive', value: 'suspended' },
            ]}
            {...form.getInputProps('status')}
          />
        </Flex>
      </Stack>
    </form>
  );
};

export default PlanForm;
