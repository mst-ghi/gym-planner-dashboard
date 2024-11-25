import { formatDate } from '@/utils';
import { DaysDic } from '@/utils/dictionary';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import { useWorkoutProgramFormContext } from '../context';
import { useFetchUserById, UserCard } from '@/features/users';
import {
  BackgroundImage,
  Badge,
  Card,
  Divider,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';

interface WorkoutProgramWizardFinalProps {
  user?: IUser;
}

const WorkoutProgramWizardFinal = ({ user }: WorkoutProgramWizardFinalProps) => {
  const form = useWorkoutProgramFormContext();

  const { data } = useFetchUserById({
    id: form.values.user_id,
    disabled: Boolean(user),
  });

  return (
    <Stack mb='lg'>
      <UserCard withBorder user={user || data?.user} />

      <Flex px='xl' direction='column' gap='sm'>
        <Title order={3}>{form.values.title}</Title>

        <Flex direction='row' align='center' justify='space-between'>
          <Text fz={14} fw={600}>
            {form.values.days} days per week
          </Text>

          <Flex direction='row' align='center' gap='xs'>
            <Text fw={600} fz={14}>
              From {formatDate(form.values.started_at!)}
            </Text>
            <IconArrowLeft color='gray' size={20} />
            <Text fw={600} fz={14}>
              To {formatDate(form.values.ended_at!)}
            </Text>
          </Flex>
        </Flex>

        <Text fz={14} fw={400}>
          {form.values.description}
        </Text>

        {[...Array.from(Array(form.values.days).keys())].map((day, idx) => {
          return (
            <Card p={0} key={`day-preview-${day}-${idx}`}>
              <Divider flex={1} label={<Title order={4}>{DaysDic[day + 1]}</Title>} mt='lg' />

              <SimpleGrid cols={4} mt='sm' spacing='sm'>
                {form.values.items[day + 1].map((item) => {
                  return (
                    <Card withBorder p='xs' key={`item-preview-${item.unique}`}>
                      <Flex direction='row' align='center' gap='sm'>
                        <BackgroundImage
                          src={item.exercise.media_url || '/no-image.jpg'}
                          style={{
                            borderRadius: 'var(--mantine-radius-lg)',
                            height: 64,
                            width: 64,
                            border: '1px solid var(--mantine-color-gray-3)',
                          }}
                        />

                        <Flex direction='column' gap='xs'>
                          <Text fw={600} fz={14}>
                            {item.exercise.title}
                          </Text>

                          <Flex direction='row' align='center' gap='xs'>
                            <Badge size='md' color='dark' variant='light'>
                              {item.priority || 0}#
                            </Badge>

                            {item.is_super && (
                              <Badge size='md' color='orange' variant='light'>
                                Super
                              </Badge>
                            )}
                          </Flex>
                        </Flex>
                      </Flex>

                      <Flex
                        direction='row'
                        align='center'
                        justify='center'
                        gap='xs'
                        mt={6}
                        py={6}
                        bg='gray.1'
                        style={{
                          borderRadius: 'var(--mantine-radius-lg)',
                        }}
                      >
                        <Text fz={22} fw={600}>
                          {item.times || 1}
                        </Text>
                        <IconX />
                        <Text fz={22} fw={600}>
                          {item.frequency || 1}
                        </Text>
                      </Flex>
                    </Card>
                  );
                })}
              </SimpleGrid>
            </Card>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default WorkoutProgramWizardFinal;
