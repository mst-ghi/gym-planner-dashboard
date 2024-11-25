import { formatDate } from '@/utils';
import UserAvatar from './user-avatar';
import { useThemeStyle } from '@/hooks';
import UserEditButton from './user-edit-button';
import { UserMaritalStatusDic } from '@/utils/dictionary';
import { Box, Card, CardProps, Flex, Grid, SimpleGrid, Text } from '@mantine/core';

export const UserCardInfo = ({ title, value }: { title: string; value?: string | number }) => {
  const { isLightTheme } = useThemeStyle();

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      gap='md'
      bg={isLightTheme ? 'gray.1' : 'dark.5'}
      p='sm'
      style={{ borderRadius: 8 }}
    >
      <Text c='gray' fz={14}>
        {title}
      </Text>
      <Text fz={18} fw={700}>
        {value || '-'}
      </Text>
    </Flex>
  );
};

interface UserCardProps extends CardProps {
  user?: IUser;
  grid?: number;
  showEditButton?: boolean;
}

const UserCard = ({ user, grid = 6, showEditButton = false, ...props }: UserCardProps) => {
  if (!user) {
    return null;
  }

  return (
    <Card {...props}>
      <Grid grow>
        <Grid.Col span={3}>
          <Flex direction='row' gap='md'>
            <Box>
              <UserAvatar
                size={72}
                src={user.profile?.avatar_url || '/avatar.webp'}
                kind={user.kind}
              />
            </Box>

            <Flex direction='column' gap={4}>
              <Text fz={26} fw={600}>
                {user.fullname}
              </Text>

              <Text fw={600} fz={16}>
                {user.email}
              </Text>

              <Text fw={600} fz={16}>
                {user.mobile}
              </Text>

              {user.profile?.birth_day && (
                <Text fw={600} fz={16}>
                  {formatDate(user.profile?.birth_day, 'normal')}
                </Text>
              )}
            </Flex>
          </Flex>
        </Grid.Col>

        <Grid.Col span={9}>
          <SimpleGrid cols={{ base: 2, sm: 2, md: grid }}>
            <UserCardInfo title='Weight' value={user.profile?.weight} />
            <UserCardInfo title='Height' value={user.profile?.height} />
            <UserCardInfo title='Blood Type' value={user.profile?.blood_type} />
            <UserCardInfo
              title='Marital Status'
              value={
                user.profile?.marital_status
                  ? UserMaritalStatusDic[user.profile?.marital_status]
                  : '-'
              }
            />
            <UserCardInfo title='Job' value={user.profile?.job} />
            <UserCardInfo title='Education' value={user.profile?.education} />
          </SimpleGrid>
        </Grid.Col>
      </Grid>

      <Flex direction='row' align='center' justify='space-between'>
        <Flex direction='row' gap='sm' mt='lg'>
          <Text c='gray' fz={14}>
            Residence:
          </Text>
          <Text>{user.profile?.address || 'Not provided'}</Text>
        </Flex>

        {showEditButton && <UserEditButton />}
      </Flex>
    </Card>
  );
};

export default UserCard;
