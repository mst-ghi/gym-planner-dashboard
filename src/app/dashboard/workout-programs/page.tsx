'use client';

import Link from 'next/link';
import { formatDate } from '@/utils';
import { Page } from '@/components/shell';
import { IconPlus } from '@tabler/icons-react';
import { Button, Flex, Text } from '@mantine/core';
import { Datatable, useDatatable } from '@/components/datatable';
import { useFetchWorkoutPrograms } from '@/features/workout-programs';
import { StatusBadge } from '@/components/common';
import { WorkoutProgramStatusDic } from '@/utils/dictionary';

export default function WorkoutProgramsPage() {
  const { states, pageProps, takeProps, searchProps } = useDatatable();
  const { data, isLoading, isFetching, refetch } = useFetchWorkoutPrograms(states);

  return (
    <Page
      title='Workout Programs'
      loading={isLoading}
      rightSection={
        <Button
          leftSection={<IconPlus />}
          component={Link}
          href={'/dashboard/workout-programs/manage'}
        >
          New Workout Program
        </Button>
      }
    >
      <Datatable
        loading={isFetching}
        records={data?.workout_programs}
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
            render: (wp) => {
              return <Text size='sm'>{wp.user?.fullname || '--'}</Text>;
            },
          },
          {
            accessor: 'user.mobile',
            title: 'Mobile number',
            render: (wp) => {
              return <Text size='sm'>{wp.user?.mobile || '--'}</Text>;
            },
          },
          {
            accessor: 'started_at',
            title: 'Start date',
            render: (wp) => {
              return <Text size='sm'>{wp.started_at ? formatDate(wp.started_at) : '--'}</Text>;
            },
          },
          {
            accessor: 'ended_at',
            title: 'Ended Date',
            render: (wp) => {
              return <Text size='sm'>{wp.ended_at ? formatDate(wp.ended_at) : '--'}</Text>;
            },
          },
          {
            accessor: 'created_at',
            title: 'Created Date',
            render: (wp) => {
              return <Text size='sm'>{formatDate(wp.created_at)}</Text>;
            },
          },
          {
            accessor: 'status',
            title: 'Status',
            render: (wp) => {
              return <StatusBadge status={wp.status} label={WorkoutProgramStatusDic[wp.status]} />;
            },
          },
          {
            accessor: 'actions',
            title: '',
            render: (wp) => {
              return (
                <Flex direction='row' align='center' gap='xs' w='100%' justify='center'>
                  <Button
                    size='xs'
                    component={Link}
                    href={`/dashboard/workout-programs/manage?user_id=${wp.user_id}&user_plan_id=${wp.user_plan_id}&wp_id=${wp.id}`}
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
