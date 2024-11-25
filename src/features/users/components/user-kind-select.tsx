import { UserKindDic } from '@/utils/dictionary';
import { Select, SelectProps } from '@mantine/core';

interface UserKindSelectProps extends Omit<SelectProps, 'data' | 'disabled'> {}

const UserKindSelect = (props: UserKindSelectProps) => {
  return (
    <Select
      clearable
      data={[
        { value: '', label: 'All' },
        { value: 'athlete', label: UserKindDic['athlete'] },
        { value: 'assistant', label: UserKindDic['assistant'] },
        { value: 'coach', label: UserKindDic['coach'] },
      ]}
      size='xs'
      mb='lg'
      mt={0}
      placeholder='User Kind'
      {...props}
    />
  );
};

export default UserKindSelect;
