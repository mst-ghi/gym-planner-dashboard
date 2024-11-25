import { useThemeStyle } from '@/hooks';
import { Select, SelectProps } from '@mantine/core';
import { UserPlanStatusDic } from '@/utils/dictionary';

interface UserPlanStatusSelectProps extends Omit<SelectProps, 'data' | 'disabled'> {}

const UserPlanStatusSelect = (props: UserPlanStatusSelectProps) => {
  const { isMobile } = useThemeStyle();

  return (
    <Select
      clearable
      data={[
        { value: 'active', label: UserPlanStatusDic['active'] },
        { value: 'reserved', label: UserPlanStatusDic['reserved'] },
        { value: 'expired', label: UserPlanStatusDic['expired'] },
        { value: 'canceled', label: UserPlanStatusDic['canceled'] },
      ]}
      size='xs'
      mb='lg'
      mt={0}
      w={isMobile ? '100%' : '16%'}
      placeholder='Select Status'
      {...props}
    />
  );
};

export default UserPlanStatusSelect;
