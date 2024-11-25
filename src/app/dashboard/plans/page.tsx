'use client';

import { formatDate } from '@/utils';
import { Page } from '@/components/shell';
import { IconPlus } from '@tabler/icons-react';
import { Datatable } from '@/components/datatable';
import { Button, Flex, Text } from '@mantine/core';
import { PlanForm, useFetchPlans } from '@/features/plans';
import { closeAllModals, openModal } from '@mantine/modals';
import { MediaViewer, StatusBadge } from '@/components/common';
import { PlanPeriodTypeDic, PlanStatusDic } from '@/utils/dictionary';

export default function BodyPartsPage() {
  const { data, isLoading, isFetching, refetch } = useFetchPlans();

  const openDialogForm = (plan?: IPlan) => {
    openModal({
      size: 'lg',
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: plan ? 'Edit Plan' : 'Add Plan',
      children: (
        <PlanForm
          plan={plan}
          done={() => {
            refetch();
            closeAllModals();
          }}
        />
      ),
    });
  };

  return (
    <Page
      loading={isLoading}
      title='System Plans'
      rightSection={
        <Button leftSection={<IconPlus />} onClick={() => openDialogForm()}>
          Add New Plan
        </Button>
      }
    >
      <Datatable
        loading={isFetching}
        records={data?.plans}
        idAccessor='id'
        columns={[
          {
            accessor: 'cover_url',
            title: 'Cover',
            width: 124,
            render: (plan) => {
              return <MediaViewer url={plan.cover_url} height={64} width={64} />;
            },
          },
          { accessor: 'priority', title: 'Priority', width: 150 },
          { accessor: 'title', title: 'Title' },
          { accessor: 'price', title: 'Price' },
          { accessor: 'discount', title: 'Discount' },
          {
            accessor: 'period_type',
            title: 'Period',
            render: (plan) => {
              return (
                <Text size='sm'>
                  {plan.period_value} {PlanPeriodTypeDic[plan.period_type]}
                </Text>
              );
            },
          },
          {
            accessor: 'status',
            title: 'Status',
            render: (plan) => {
              return <StatusBadge status={plan.status} label={PlanStatusDic[plan.status]} />;
            },
          },
          {
            accessor: 'created_at',
            width: 200,
            title: 'Create Date',
            render: (plan) => {
              return <Text size='sm'>{formatDate(plan.created_at)}</Text>;
            },
          },
          {
            accessor: 'actions',
            width: 100,
            title: '',
            render: (plan) => {
              return (
                <Flex direction='column' align='center' gap='xs' w='100%' justify='center'>
                  <Button size='xs' onClick={() => openDialogForm(plan)}>
                    Edit
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
