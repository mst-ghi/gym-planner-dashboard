'use client';

import { Page } from '@/components/shell';
import { IconPlus } from '@tabler/icons-react';
import { MediaViewer } from '@/components/common';
import { formatDate, truncateText } from '@/utils';
import { Datatable } from '@/components/datatable';
import { Badge, Button, Flex, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { EquipmentForm, useFetchEquipments } from '@/features/equipments';

export default function EquipmentsPage() {
  const { data, isLoading, isFetching, refetch } = useFetchEquipments();

  const openDialogForm = (equipment?: IEquipment) => {
    openModal({
      size: 'lg',
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: equipment ? 'Edit Equipment' : 'Add Equipment',
      children: (
        <EquipmentForm
          equipment={equipment}
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
      title='Equipments'
      rightSection={
        <Button leftSection={<IconPlus />} onClick={() => openDialogForm()}>
          Add New Equipment
        </Button>
      }
    >
      <Datatable
        loading={isFetching}
        records={data?.equipments}
        idAccessor='id'
        columns={[
          {
            accessor: 'media_url',
            title: 'Cover',
            width: 124,
            render: (equipment) => {
              return <MediaViewer url={equipment.media_url} height={64} width={64} />;
            },
          },
          { accessor: 'title', title: 'Title' },
          {
            accessor: 'title_en',
            title: 'Title En',
            render: (equipment) => {
              return <Text size='sm'>{equipment.title_en || '--'}</Text>;
            },
          },
          {
            accessor: 'description',
            title: 'Description',
            render: (equipment) => {
              return <Text size='sm'>{truncateText(equipment.description, 120)}</Text>;
            },
          },
          {
            accessor: 'exercises',
            title: 'Exercises',
            render: (equipment) => {
              return <Badge size='md'>{equipment.exercises.length || 0} Exercise</Badge>;
            },
          },
          {
            accessor: 'created_at',
            width: 200,
            title: 'Create Date',
            render: (equipment) => {
              return <Text size='sm'>{formatDate(equipment.created_at)}</Text>;
            },
          },
          {
            accessor: 'actions',
            width: 100,
            title: '',
            render: (equipment) => {
              return (
                <Flex direction='column' align='center' gap='xs' w='100%' justify='center'>
                  <Button size='xs' onClick={() => openDialogForm(equipment)}>
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
