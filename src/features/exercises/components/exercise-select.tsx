import { Select, SelectProps } from '@mantine/core';
import { useFetchExercises } from '../hooks';
import { useThemeStyle } from '@/hooks';

interface ExerciseSelectProps extends Omit<SelectProps, 'data' | 'disabled' | 'onChange'> {
  gender?: string | null;
  onChange?: (exercise?: IExercise) => void;
}

const ExerciseSelect = ({ gender, onChange, ...props }: ExerciseSelectProps) => {
  const { isMobile } = useThemeStyle();
  const { data, isFetching } = useFetchExercises({ page: 0, take: 999, gender });

  const onChangeValue = (value: string | null) => {
    if (onChange && value) {
      onChange(data?.exercises.find((el) => el.id === value));
    }
  };

  return (
    <Select
      clearable
      disabled={isFetching}
      data={data?.exercises.map((ex) => ({ value: ex.id, label: ex.title }))}
      size='xs'
      mb='lg'
      mt={0}
      w={isMobile ? '100%' : '16%'}
      placeholder='Select Exercise'
      onChange={onChangeValue}
      {...props}
    />
  );
};

export default ExerciseSelect;
