import { useThemeStyle } from '@/hooks';
import { currency, formatDate } from '@/utils';
import { StatusBadge } from '@/components/common';
import { IconArrowLeft } from '@tabler/icons-react';
import { PaymentStatusDic } from '@/utils/dictionary';
import { BackgroundImage, Badge, Card, Flex, Grid, Group, Table, Text, Title } from '@mantine/core';

interface UserPlanCardProps {
  userPlan: IUserPlan;
}

const UserPlanCard = ({ userPlan }: UserPlanCardProps) => {
  const { isDesktop } = useThemeStyle();

  return (
    <Card>
      <Grid grow>
        <Grid.Col span={isDesktop ? 3 : 12}>
          <BackgroundImage
            src={userPlan.plan_snapshot.cover_url || '/no-image.jpg'}
            w='100%'
            h={isDesktop ? '100%' : 200}
            style={{
              borderRadius: 'var(--mantine-radius-lg)',
            }}
          />
        </Grid.Col>

        <Grid.Col span={isDesktop ? 9 : 12}>
          <Flex direction='column' gap='sm'>
            <Title order={4}>{userPlan.plan_snapshot.title}</Title>

            <Text fz={14}>{userPlan.plan_snapshot.description}</Text>

            <Group align='center'>
              <Badge color='gray'>
                <Text fz={14} fw={600}>
                  {formatDate(userPlan.created_at)}
                </Text>
              </Badge>

              <IconArrowLeft color='gray' />

              <Text c='red' fw={600} fz={14}>
                تا تاریخ {formatDate(userPlan.expires_at)} اعتبار دارد.
              </Text>
            </Group>
          </Flex>
        </Grid.Col>
      </Grid>

      {userPlan.payment && (
        <Card withBorder mt='xl' mx={0}>
          <Flex direction='column' gap='md'>
            <Table striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Amount Paid</Table.Th>
                  <Table.Th>Amount Discounted</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>{currency(userPlan.payment?.total_price)}</Table.Td>
                  <Table.Td>{currency(userPlan.payment?.discount_price)}</Table.Td>
                  <Table.Td>
                    <StatusBadge
                      status={userPlan.payment.status}
                      label={PaymentStatusDic[userPlan.payment.status]}
                    />
                  </Table.Td>
                  <Table.Td>{formatDate(userPlan.updated_at)}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Flex>
        </Card>
      )}
    </Card>
  );
};

export default UserPlanCard;
