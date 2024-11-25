import { useMemo } from 'react';
import { openModal } from '@mantine/modals';
import BodyPartForm from './body-part-form';
import { ExerciseForm } from '@/features/exercises';
import { IconEdit, IconEditCircle, IconPlus } from '@tabler/icons-react';
import { ActionIcon, Divider, Flex, Select, SelectProps, Text } from '@mantine/core';

interface BodyPartManageProps {
  bodyPart: IBodyPart;
  reload: () => void;
}

const BodyPartManage = ({ bodyPart, reload }: BodyPartManageProps) => {
  const data = useMemo(() => {
    const result =
      bodyPart.exercises.map((exercise) => ({ value: exercise.id, label: exercise.title })) || [];
    result.push({ value: '0', label: 'Add New Exercise' });
    return result;
  }, []);

  const openDialogForm = () => {
    openModal({
      size: 'lg',
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: 'Update body-part',
      children: <BodyPartForm bodyPart={bodyPart} done={reload} />,
    });
  };

  const openExerciseDialogForm = (exercise?: IExercise) => {
    openModal({
      size: 'lg',
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: exercise ? 'Edit Exercise Movement' : 'Add Exercise Movement',
      children: <ExerciseForm exercise={exercise} done={reload} hideBodyPartInput />,
    });
  };

  const renderSelectOption: SelectProps['renderOption'] = ({ option }) => {
    if (option.value === '0') {
      return (
        <Flex
          direction='row'
          align='center'
          justify='space-between'
          flex={1}
          onClick={() => openExerciseDialogForm()}
        >
          <Text size='xs' fw={500}>
            {option.label}
          </Text>

          <ActionIcon radius='xl' size='sm'>
            <IconPlus />
          </ActionIcon>
        </Flex>
      );
    }

    const exercise = bodyPart.exercises.find((el) => el.id === option.value);

    return (
      <Flex direction='column' gap='xs' flex={1} onClick={() => openExerciseDialogForm(exercise)}>
        <Flex direction='row' align='center' justify='space-between' flex={1}>
          <Text size='xs' fw={500}>
            {option.label}
          </Text>

          <ActionIcon variant='subtle' size='md'>
            <IconEditCircle />
          </ActionIcon>
        </Flex>
        <Divider />
      </Flex>
    );
  };

  return (
    <Select
      disabled={data.length === 1}
      label={bodyPart.title}
      rightSectionPointerEvents='all'
      renderOption={renderSelectOption}
      defaultValue={data[0].value}
      data={data}
      rightSection={
        <ActionIcon onClick={openDialogForm} style={{ zIndex: 5 }}>
          <IconEdit />
        </ActionIcon>
      }
    />
  );
};

export default BodyPartManage;
