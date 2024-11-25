import { DateTimeInput } from '@/components/form';
import { useWorkoutProgramFormContext } from '../context/workout-program-context';
import {
  Card,
  Flex,
  rem,
  SimpleGrid,
  Slider,
  Stack,
  Textarea,
  TextInput,
  Text,
  Grid,
} from '@mantine/core';
import { Uploader } from '@/features/uploader';

const WorkoutProgramWizardInfo = () => {
  const form = useWorkoutProgramFormContext();

  return (
    <Card withBorder pb='lg'>
      <Grid grow>
        <Grid.Col span={5}>
          <Stack gap='sm'>
            <TextInput
              withAsterisk
              label='Title'
              maxLength={160}
              rightSection={
                <Text fz={14} fw={600} c='gray'>
                  {160 - (form.values.title?.length || 0)}
                </Text>
              }
              {...form.getInputProps('title')}
            />

            <Flex direction='row' gap='md' w='100%'>
              <DateTimeInput
                withAsterisk
                label='Start Date'
                {...form.getInputProps('started_at')}
              />
              <DateTimeInput withAsterisk label='End Date' {...form.getInputProps('ended_at')} />
            </Flex>

            <Flex direction='column'>
              <Text size='sm' fw={500}>
                Number of program days per week
              </Text>
              <Slider
                step={1}
                min={1}
                max={7}
                size='xl'
                color='gray'
                styles={{ thumb: { borderWidth: rem(2), padding: rem(4) } }}
                marks={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 4, label: '4' },
                  { value: 5, label: '5' },
                  { value: 6, label: '6' },
                  { value: 7, label: '7' },
                ]}
                {...form.getInputProps('days')}
              />
            </Flex>
          </Stack>
        </Grid.Col>

        <Grid.Col span={5}>
          <Textarea
            withAsterisk
            rightSection={
              <Text fz={14} fw={600} c='gray'>
                {350 - (form.values.description?.length || 0)}
              </Text>
            }
            rows={8}
            maxLength={350}
            label='Description'
            {...form.getInputProps('description')}
          />
        </Grid.Col>

        <Grid.Col span={2} mt='sm'>
          <Uploader
            height='186px'
            label='Coach Voice'
            accept={['audio/*']}
            data={{ url: form.values.voice_url || undefined }}
            onUpload={(media) => {
              form.setFieldValue('voice_url', media.url);
            }}
            onDelete={() => {
              form.setFieldValue('voice_url', '');
            }}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default WorkoutProgramWizardInfo;
