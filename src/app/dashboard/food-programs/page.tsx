'use client';

import Link from 'next/link';
import { Page } from '@/components/shell';
import { Button, Flex, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Datatable, useDatatable } from '@/components/datatable';
import { useFetchFoodPrograms } from '@/features/food-programs';
import { formatDate } from '@/utils';
import { StatusBadge } from '@/components/common';
import { FoodProgramStatusDic } from '@/utils/dictionary';

export default function FoodProgramsPage() {
  const { states, pageProps, takeProps, searchProps } = useDatatable();
  const { data, isLoading, isFetching, refetch } = useFetchFoodPrograms(states);

  return (
    <Page
      title='Diet Plans'
      rightSection={
        <Button
          leftSection={<IconPlus />}
          component={Link}
          href={'/dashboard/food-programs/manage'}
        >
          Add New Program
        </Button>
      }
    >
      <Datatable
        loading={isFetching}
        records={data?.food_programs}
        paginationProps={{
          refetch,
          meta: data?.meta,
          pageProps,
          takeProps,
          searchProps,
        }}
        columns={[
          { accessor: 'title', title: 'Title' },
          {
            accessor: 'user.fullname',
            title: 'User',
            render: (fp) => {
              return <Text size='sm'>{fp.user?.fullname || '--'}</Text>;
            },
          },
          {
            accessor: 'user.mobile',
            title: 'Mobile',
            render: (fp) => {
              return <Text size='sm'>{fp.user?.mobile || '--'}</Text>;
            },
          },
          {
            accessor: 'started_at',
            title: 'Start Date',
            render: (fp) => {
              return <Text size='sm'>{fp.started_at ? formatDate(fp.started_at) : '--'}</Text>;
            },
          },
          {
            accessor: 'ended_at',
            title: 'End Date',
            render: (fp) => {
              return <Text size='sm'>{fp.ended_at ? formatDate(fp.ended_at) : '--'}</Text>;
            },
          },
          {
            accessor: 'created_at',
            title: 'Create Date',
            render: (fp) => {
              return <Text size='sm'>{formatDate(fp.created_at)}</Text>;
            },
          },
          {
            accessor: 'status',
            title: 'Status',
            render: (fp) => {
              return <StatusBadge status={fp.status} label={FoodProgramStatusDic[fp.status]} />;
            },
          },
          {
            accessor: 'actions',
            title: '',
            render: (fp) => {
              return (
                <Flex direction='row' align='center' gap='xs' w='100%' justify='center'>
                  <Button
                    size='xs'
                    component={Link}
                    href={`/dashboard/food-programs/manage?user_id=${fp.user_id}&user_plan_id=${fp.user_plan_id}&fp_id=${fp.id}`}
                  >
                    Details
                  </Button>
                </Flex>
              );
            },
          },
        ]}
      />
    </Page>
  );
}
