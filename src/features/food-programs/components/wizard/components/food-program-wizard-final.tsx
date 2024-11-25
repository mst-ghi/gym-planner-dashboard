import { formatDate } from '@/utils';
import { IconArrowLeft } from '@tabler/icons-react';
import { useFoodProgramFormContext } from '../context';
import { useFetchUserById, UserCard } from '@/features/users';
import { Flex, Stack, Table, Text, Title } from '@mantine/core';

interface FoodProgramWizardFinalProps {
  user?: IUser;
}

const FoodProgramWizardFinal = ({ user }: FoodProgramWizardFinalProps) => {
  const form = useFoodProgramFormContext();

  const { data } = useFetchUserById({
    id: form.values.user_id,
    disabled: Boolean(user),
  });

  return (
    <Stack mb='lg'>
      <UserCard withBorder user={user || data?.user} />

      <Flex px='xl' direction='column' gap='sm'>
        <Title order={3}>{form.values.title}</Title>

        <Flex direction='row' align='center' justify='space-between'>
          <Flex direction='row' align='center' gap='xs'>
            <Text fw={600} fz={14}>
              از {formatDate(form.values.started_at!)}
            </Text>
            <IconArrowLeft color='gray' size={20} />
            <Text fw={600} fz={14}>
              تا {formatDate(form.values.ended_at!)}
            </Text>
          </Flex>
        </Flex>

        <Text fz={14} fw={400}>
          {form.values.description}
        </Text>

        <Table striped highlightOnHover withTableBorder withColumnBorders verticalSpacing='md'>
          <Table.Thead>
            <Table.Tr>
              <Table.Th miw={160}>Title/Time</Table.Th>
              <Table.Th>Food Item Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {form.values.items.map((item, idx) => {
              return (
                <Table.Tr key={item.unique}>
                  <Table.Td>{item.cause}</Table.Td>
                  <Table.Td>{item.content}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Flex>
    </Stack>
  );
};

export default FoodProgramWizardFinal;
