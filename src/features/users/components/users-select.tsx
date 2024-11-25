import { useState } from 'react';
import UserAvatar from './user-avatar';
import { useFetchUsers } from '../hooks';
import { useDebouncedValue } from '@mantine/hooks';
import { SelectProps, Group, Select, Text } from '@mantine/core';

interface UsersSelectProps extends Omit<SelectProps, 'data' | 'disabled'> {}

const UsersSelect = (props: UsersSelectProps) => {
  const [search, setSearch] = useState<string>();
  const [debounced] = useDebouncedValue(search, 700);

  const { data } = useFetchUsers({ search: debounced, page: 0, take: 32 });

  const renderOption: SelectProps['renderOption'] = ({ option }) => {
    const user = data?.users.find((el) => el.id === option.value);

    if (!user) {
      return null;
    }

    return (
      <Group gap='sm'>
        <UserAvatar src={user.profile?.avatar_url} size={40} radius='xl' />
        <div>
          <Text size='sm'>{user.fullname || '--'}</Text>
          <Text size='xs' opacity={0.5}>
            {user.mobile}
          </Text>
        </div>
      </Group>
    );
  };

  return (
    <Select
      {...props}
      placeholder='Select User'
      renderOption={renderOption}
      maxDropdownHeight={300}
      data={
        data?.users.map((user) => ({ value: user.id, label: user.fullname || user.mobile })) || []
      }
      searchable
      onSearchChange={setSearch}
    />
  );
};

export default UsersSelect;
