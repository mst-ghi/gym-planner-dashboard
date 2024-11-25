import Link from 'next/link';
import { formatDate } from '@/utils';
import UserAvatar from './user-avatar';
import { UserCardInfo } from './user-card';
import { UserMaritalStatusDic } from '@/utils/dictionary';
import { IconCalendar, IconLink } from '@tabler/icons-react';
import { ActionIcon, Card, Flex, SimpleGrid, Text } from '@mantine/core';

interface UserCardVerticalProps {
  user?: IUser;
}

const UserCardVertical = ({ user }: UserCardVerticalProps) => {
  if (!user) {
    return null;
  }

  return (
    <Card pos='relative'>
      <ActionIcon
        color='orange'
        variant='light'
        pos='absolute'
        left={20}
        top={20}
        component={Link}
        href={`/dashboard/users/${user.id}`}
      >
        <IconLink />
      </ActionIcon>

      <Flex direction='column' gap='md' justify='center' align='center'>
        <UserAvatar src={user.profile?.avatar_url} kind={user.kind} />

        <Flex direction='column' gap={4} justify='center' align='center'>
          <Text fz={26} fw={600}>
            {user.fullname}
          </Text>

          <Text>{user.email}</Text>

          <Text>{user.mobile}</Text>

          {user.profile?.birth_day && (
            <Flex direction='row' align='center' gap='xs'>
              <IconCalendar color='gray' size={18} />

              <Text fz={14}>{formatDate(user.profile?.birth_day)}</Text>
            </Flex>
          )}
        </Flex>
      </Flex>

      <SimpleGrid cols={{ base: 2, sm: 2, md: 2 }} mt='lg'>
        <UserCardInfo title='Weight' value={user.profile?.weight} />
        <UserCardInfo title='Height' value={user.profile?.height} />
        <UserCardInfo title='Blood Type' value={user.profile?.blood_type} />
        <UserCardInfo
          title='Marital status'
          value={
            user.profile?.marital_status ? UserMaritalStatusDic[user.profile?.marital_status] : '-'
          }
        />
        <UserCardInfo title='Job' value={user.profile?.job} />
        <UserCardInfo title='Education' value={user.profile?.education} />
      </SimpleGrid>
    </Card>
  );
};

export default UserCardVertical;
