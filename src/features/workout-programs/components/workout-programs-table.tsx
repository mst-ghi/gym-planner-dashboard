import Link from 'next/link';
import { truncateText } from '@/utils';
import { useFetchUserWorkoutPrograms } from '../hooks';
import { Button, Card, Flex, Table, Title } from '@mantine/core';

const WorkoutProgramsTable = ({ userId, userPlanId }: { userId?: string; userPlanId?: string }) => {
  const { data } = useFetchUserWorkoutPrograms({ userId, userPlanId });

  return (
    <Card>
      <Card.Section p='sm'>
        <Flex direction='row' align='center' justify='space-between'>
          <Title order={5}>Workout Program History</Title>
          <Button
            component={Link}
            href={`/dashboard/workout-programs/manage?user_id=${userId}${userPlanId ? `&user_plan_id=${userPlanId}` : ''}`}
          >
            Add New Program
          </Button>
        </Flex>
      </Card.Section>

      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.workout_programs.map((program) => (
            <Table.Tr key={program.id}>
              <Table.Td>{program.title}</Table.Td>
              <Table.Td>{truncateText(program.description || '', 160)}</Table.Td>
              <Table.Td>
                <Button
                  size='xs'
                  component={Link}
                  href={`/dashboard/workout-programs/manage?user_id=${program.user_id}&user_plan_id=${program.user_plan_id}&wp_id=${program.id}`}
                >
                  Details
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
};

export default WorkoutProgramsTable;
