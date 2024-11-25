'use client';

import Link from 'next/link';
import { Page } from '@/components/shell';
import { useFetchUsers, UserKindSelect } from '@/features/users';
import { StatusBadge } from '@/components/common';
import { dateDifference, formatDate } from '@/utils';
import { Avatar, Button, Flex, Select, Text } from '@mantine/core';
import { Datatable, useDatatable } from '@/components/datatable';
import { UserGenderDic, UserKindDic, UserStatusDic } from '@/utils/dictionary';
import { useState } from 'react';

export default function UsersPage() {
  const [kind, setKind] = useState<string | null>();

  const { states, pageProps, takeProps, searchProps } = useDatatable();
  const { data, isLoading, isFetching, refetch } = useFetchUsers({ ...states, kind });

  return (
    <Page title='Users' loading={isLoading}>
      <Datatable
        loading={isFetching}
        records={data?.users}
        paginationProps={{
          refetch,
          meta: data?.meta,
          pageProps,
          takeProps,
          searchProps,
          filter: <UserKindSelect value={kind} onChange={setKind} />,
        }}
        columns={[
          {
            accessor: 'avatar_url',
            title: 'Avatar',
            width: 85,
            render: (user) => {
              return (
                <Avatar src={user.profile?.avatar_url || '/avatar.webp'} alt={user.fullname} />
              );
            },
          },
          { accessor: 'fullname', title: 'Full Name' },
          { accessor: 'mobile', title: 'Mobile' },
          { accessor: 'email', title: 'Email' },
          {
            accessor: 'kind',
            title: 'Kind',
            render: (user) => {
              return <Text size='sm'>{UserKindDic[user.kind]}</Text>;
            },
          },
          {
            accessor: 'birth_day',
            title: 'Age',
            render: (user) => {
              return <Text size='sm'>{dateDifference(user.profile?.birth_day)}</Text>;
            },
          },
          {
            accessor: 'gender',
            title: 'Gender',
            render: (user) => {
              return (
                <Text size='sm'>
                  {user.profile ? UserGenderDic[user.profile?.gender] : 'Not Provided'}
                </Text>
              );
            },
          },
          {
            accessor: 'status',
            title: 'Status',
            render: (user) => {
              return <StatusBadge status={user.status} label={UserStatusDic[user.status]} />;
            },
          },
          {
            accessor: 'created_at',
            title: 'Join Date',
            render: (user) => {
              return <Text size='sm'>{formatDate(user.created_at)}</Text>;
            },
          },
          {
            accessor: 'actions',
            title: '',
            render: (user) => {
              return (
                <Flex direction='row' align='center' gap='xs' w='100%' justify='center'>
                  <Button size='xs' component={Link} href={`/dashboard/users/${user.id}`}>
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
