import { useState } from 'react';
import { useThemeStyle } from '@/hooks';
import { ImageStates } from '@/components/common';
import { useDebouncedValue } from '@mantine/hooks';
import { useWorkoutProgramFormContext } from '../context';
import { useFetchUsers, UserAvatar, UserCard } from '@/features/users';
import { IconCircle, IconCircleCheck, IconSearch } from '@tabler/icons-react';
import {
  Center,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  TextInput,
  Text,
  Card,
  Flex,
} from '@mantine/core';

const WorkoutProgramWizardUser = ({ user }: { user?: IUser }) => {
  const { isLightTheme } = useThemeStyle();
  const [searchValue, setSearchValue] = useState<string>('');
  const [search] = useDebouncedValue(searchValue, 700);
  const { data, isFetching } = useFetchUsers({
    search,
    take: 16,
    userId: user?.id,
    disabled: Boolean(user),
  });

  const form = useWorkoutProgramFormContext();

  if (user && user.id) {
    return <UserCard user={user} />;
  }

  return (
    <Card withBorder>
      <Stack>
        <Flex>
          <TextInput
            rightSection={<IconSearch />}
            description="Enter the user's name or mobile number and select it from the list"
            placeholder='Search and select user'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Flex>

        {isFetching && (
          <Center h={200}>
            <Loader />
          </Center>
        )}

        {!isFetching && (!data?.users || !data.users[0]) && (
          <Center h={200}>
            <ImageStates name='emptyBox' />
          </Center>
        )}

        {!isFetching && data && data.users[0] && (
          <SimpleGrid cols={4} mih={200} mx={0}>
            {data.users.map((user) => {
              const isSelected = user.id === form.values.user_id;
              return (
                <Card
                  m={0}
                  h={84}
                  withBorder
                  p='xs'
                  key={`user-${user.id}`}
                  bg={isSelected ? (isLightTheme ? 'gray.1' : 'dark.7') : undefined}
                  shadow={isSelected ? 'md' : undefined}
                  style={{ cursor: 'pointer', transition: 'box-shadow 0.3s', marginInline: 0 }}
                  onClick={() => {
                    form.setFieldValue('user_id', user.id);
                    form.setFieldValue('gender', user?.profile?.gender);
                  }}
                >
                  <Group gap='sm'>
                    <UserAvatar
                      src={user.profile?.avatar_url}
                      kind={user.kind}
                      size={56}
                      radius='xl'
                    />
                    <Flex direction='column' gap={4} flex={1}>
                      <Text size='md'>{user.fullname || 'No Name'}</Text>
                      <Text size='sm' opacity={0.8}>
                        {user.mobile}
                      </Text>
                    </Flex>
                    {isSelected ? (
                      <IconCircleCheck stroke={1.5} size={36} color='orange' />
                    ) : (
                      <IconCircle stroke={1.5} size={36} color='gray' />
                    )}
                  </Group>
                </Card>
              );
            })}
          </SimpleGrid>
        )}
      </Stack>
    </Card>
  );
};

export default WorkoutProgramWizardUser;
