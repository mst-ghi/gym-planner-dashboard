import Link from 'next/link';
import { formatDate } from '@/utils';
import { StatusBadge } from '@/components/common';
import { useFetchUserPlansHistory } from '../hooks';
import { UserPlanStatusDic } from '@/utils/dictionary';
import { Button, Card, Center, Flex, Loader, Table, Title } from '@mantine/core';

interface UserPlansHistoryProps {
  userId?: string;
}

const UserPlansHistory = ({ userId }: UserPlansHistoryProps) => {
  const { data, isFetching } = useFetchUserPlansHistory({ userId });

  return (
    <Card>
      <Card.Section p='sm'>
        <Flex direction='row' align='center' justify='space-between'>
          <Title order={4}>History of Purchased Plans</Title>
        </Flex>
      </Card.Section>

      {isFetching && (
        <Center w='100%' h='100%'>
          <Loader />
        </Center>
      )}

      {!isFetching && (
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Plan</Table.Th>
              <Table.Th>Purchase Date</Table.Th>
              <Table.Th>Expiration Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Details</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.user_plans.map((userPlan) => (
              <Table.Tr key={userPlan.id}>
                <Table.Td>{userPlan.plan_snapshot.title}</Table.Td>
                <Table.Td>{formatDate(userPlan.created_at)}</Table.Td>
                <Table.Td>{formatDate(userPlan.expires_at)}</Table.Td>
                <Table.Td>
                  <StatusBadge
                    status={userPlan.status}
                    label={UserPlanStatusDic[userPlan.status]}
                  />
                </Table.Td>
                <Table.Td>
                  <Button size='xs' component={Link} href={`/dashboard/user-plans/${userPlan.id}`}>
                    Details
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Card>
  );
};

export default UserPlansHistory;
