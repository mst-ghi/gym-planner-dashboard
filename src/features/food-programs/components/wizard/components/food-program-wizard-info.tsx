import { DateTimeInput } from '@/components/form';
import { useFoodProgramFormContext } from '../context/food-program-context';
import { Card, Flex, SimpleGrid, Stack, Textarea, TextInput, Text } from '@mantine/core';

const FoodProgramWizardInfo = () => {
  const form = useFoodProgramFormContext();

  return (
    <Card withBorder pb='lg'>
      <SimpleGrid cols={2}>
        <Stack gap='sm'>
          <TextInput
            withAsterisk
            label='Title/Time of Program'
            maxLength={160}
            rightSection={
              <Text fz={14} fw={600} c='gray'>
                {160 - (form.values.title?.length || 0)}
              </Text>
            }
            {...form.getInputProps('title')}
          />

          <Flex direction='row' gap='md' w='100%'>
            <DateTimeInput withAsterisk label='Start Date' {...form.getInputProps('started_at')} />
            <DateTimeInput withAsterisk label='End Date' {...form.getInputProps('ended_at')} />
          </Flex>
        </Stack>

        <Textarea
          withAsterisk
          rightSection={
            <Text fz={14} fw={600} c='gray'>
              {350 - (form.values.description?.length || 0)}
            </Text>
          }
          rows={5}
          maxLength={350}
          label='Program Description'
          {...form.getInputProps('description')}
        />
      </SimpleGrid>
    </Card>
  );
};

export default FoodProgramWizardInfo;
