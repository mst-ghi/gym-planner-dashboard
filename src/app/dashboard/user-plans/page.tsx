'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Page } from '@/components/shell';
import { UserAvatar } from '@/features/users';
import { currency, formatDate } from '@/utils';
import { StatusBadge } from '@/components/common';
import { Button, Flex, Text } from '@mantine/core';
import { Datatable, useDatatable } from '@/components/datatable';
import { PaymentStatusDic, UserPlanStatusDic } from '@/utils/dictionary';
import { useFetchUserPlans, UserPlanStatusSelect } from '@/features/plans';

export default function UserPlansPage() {
  const [status, setStatus] = useState<string | null>();

  const { states, pageProps, takeProps, searchProps } = useDatatable();
  const { data, isLoading, isFetching, refetch } = useFetchUserPlans({ ...states, status });

  return (
    <Page title='Purchased Plans' loading={isLoading}>
      <Datatable
        loading={isFetching}
        records={data?.user_plans}
        paginationProps={{
          refetch,
          meta: data?.meta,
          pageProps,
          takeProps,
          searchProps,
          filter: <UserPlanStatusSelect value={status} onChange={setStatus} />,
        }}
        columns={[
          {
            accessor: 'user',
            title: 'User',
            render: (userPlan) => {
              return (
                <Flex direction='row' align='center' gap='sm'>
                  <UserAvatar
                    src={userPlan.user?.profile?.avatar_url}
                    alt={userPlan.user?.fullname}
                    kind={userPlan.user?.kind}
                    size={54}
                  />
                  <Text size='sm'>{userPlan.user?.fullname || userPlan.user?.mobile || '--'}</Text>
                </Flex>
              );
            },
          },

          {
            accessor: 'plan_snapshot',
            title: 'Plan',
            render: (userPlan) => {
              return <Text size='sm'>{userPlan.plan_snapshot.title}</Text>;
            },
          },

          {
            accessor: 'payment.total_price',
            title: 'Price',
            render: (userPlan) => {
              return (
                <Text size='sm'>
                  {userPlan.payment?.total_price
                    ? currency(userPlan.payment?.total_price)
                    : currency(0)}
                </Text>
              );
            },
          },

          {
            accessor: 'payment.status',
            title: 'Payment Status',
            render: (userPlan) => {
              return (
                <StatusBadge
                  status={userPlan.payment?.status || 'reserved'}
                  label={
                    userPlan.payment?.status ? PaymentStatusDic[userPlan.payment?.status] : '--'
                  }
                />
              );
            },
          },

          {
            accessor: 'status',
            title: 'Status',
            render: (userPlan) => {
              return (
                <StatusBadge status={userPlan.status} label={UserPlanStatusDic[userPlan.status]} />
              );
            },
          },

          {
            accessor: 'created_at',
            title: 'Create Date',
            render: (userPlan) => {
              return <Text size='sm'>{formatDate(userPlan.created_at)}</Text>;
            },
          },

          {
            accessor: 'expires_at',
            title: 'Expires Date',
            render: (userPlan) => {
              return <Text size='sm'>{formatDate(userPlan.expires_at)}</Text>;
            },
          },

          {
            accessor: 'actions',
            title: '',
            render: (userPlan) => {
              return (
                <Flex direction='row' align='center' gap='xs' w='100%' justify='center'>
                  <Button size='xs' component={Link} href={`/dashboard/user-plans/${userPlan.id}`}>
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
