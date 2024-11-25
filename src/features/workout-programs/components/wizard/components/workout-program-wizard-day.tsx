import { sortData, uuid } from '@/utils';
import { useEffect, useMemo } from 'react';
import { DaysDic, MovementDic } from '@/utils/dictionary';
import { IconTrash } from '@tabler/icons-react';
import { ImageStates } from '@/components/common';
import { openConfirmModal } from '@mantine/modals';
import { ExerciseSelect } from '@/features/exercises';
import { useDebouncedValue, useSetState } from '@mantine/hooks';
import { useWorkoutProgramFormContext, WorkoutProgramItemFormValues } from '../context';
import {
  ActionIcon,
  Box,
  Card,
  Flex,
  NumberInput,
  SimpleGrid,
  Switch,
  Text,
  Title,
} from '@mantine/core';

const DayCard = ({
  idx,
  item,
  onUpdate,
  onDelete,
}: {
  item: WorkoutProgramItemFormValues;
  idx: number;
  onUpdate?: (item: WorkoutProgramItemFormValues) => void;
  onDelete?: (item: WorkoutProgramItemFormValues) => void;
}) => {
  const [values, setValues] = useSetState<WorkoutProgramItemFormValues>({ ...item });
  const [debounced] = useDebouncedValue(values, 700);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(debounced);
    }
  }, [debounced]);

  return (
    <Card withBorder p='sm'>
      <Text fw={600} size='md' c='gray'>
        {MovementDic[idx]}
      </Text>

      <Flex direction='row' align='center' gap='sm' mb='xs'>
        <Box flex={1}>
          <Text fw={500} size='lg'>
            {item.exercise.title}
          </Text>
        </Box>

        {onDelete && (
          <ActionIcon
            color='red'
            onClick={() => {
              openConfirmModal({
                title: 'Delete exercise',
                children: 'Are you sure you want to delete exercise?',
                onConfirm: () => onDelete(item),
              });
            }}
          >
            <IconTrash />
          </ActionIcon>
        )}
      </Flex>

      <SimpleGrid cols={2} spacing='xs' verticalSpacing={4}>
        <NumberInput
          size='xs'
          label='Priority'
          value={values.priority}
          onChange={(val) => setValues({ priority: +val })}
        />
        <NumberInput
          size='xs'
          label='Frequency'
          value={values.frequency}
          onChange={(val) => setValues({ frequency: +val })}
        />
        <NumberInput
          size='xs'
          label='Times'
          value={values.times}
          onChange={(val) => setValues({ times: +val })}
        />

        <Switch
          size='xs'
          label='Super move'
          mt='xl'
          mr='sm'
          checked={values.is_super}
          onChange={(event) => setValues({ is_super: event.currentTarget.checked })}
        />
      </SimpleGrid>
    </Card>
  );
};

const WorkoutProgramWizardDay = ({ day }: { day: number }) => {
  const form = useWorkoutProgramFormContext();

  const dayItems = useMemo(() => {
    return sortData(form.values.items[day] || [], 'priority', 'asc');
  }, [form.values.items]);

  const onUpdate = (_item: WorkoutProgramItemFormValues) => {
    form.setFieldValue(
      `items.${day}`,
      dayItems.map((el) => (el.unique === _item.unique ? _item : el)),
    );
  };

  const onDelete = (_item: WorkoutProgramItemFormValues) => {
    form.setFieldValue(
      `items.${day}`,
      dayItems.filter((el) => el.unique !== _item.unique),
    );
  };

  return (
    <Card withBorder>
      <Card.Section p='xs'>
        <Flex direction='row' align='center' justify='space-between'>
          <Title order={4}>{DaysDic[day]}</Title>
          <ExerciseSelect
            mb={0}
            gender={form.values.gender}
            placeholder='Select and add exercise'
            onChange={(exercise) => {
              if (exercise) {
                form.setFieldValue(`items.${day}`, [
                  ...dayItems,
                  {
                    exercise,
                    unique: uuid(),
                    exercise_id: exercise.id,
                    day,
                    priority: dayItems.length + 1,
                    frequency: 3,
                    times: 10,
                    is_super: false,
                  },
                ]);
              }
            }}
          />
        </Flex>
      </Card.Section>

      {(!dayItems || !dayItems[0]) && <ImageStates name='noRecords' message='Add exercise' />}

      {dayItems && dayItems[0] && (
        <SimpleGrid cols={3} spacing='xs'>
          {dayItems.map((item, idx) => {
            return (
              <DayCard
                key={item.unique}
                item={item}
                onUpdate={onUpdate}
                onDelete={onDelete}
                idx={idx + 1}
              />
            );
          })}
        </SimpleGrid>
      )}
    </Card>
  );
};

export default WorkoutProgramWizardDay;
