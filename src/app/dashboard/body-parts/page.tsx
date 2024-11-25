'use client';

import { Page } from '@/components/shell';
import { IconPlus } from '@tabler/icons-react';
import { MediaViewer } from '@/components/common';
import { Datatable } from '@/components/datatable';
import { formatDate, truncateText } from '@/utils';
import { BodyPartLevelDic } from '@/utils/dictionary';
import { Badge, Button, Flex, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { BodyPartForm, useFetchBodyParts } from '@/features/body-parts';
import Link from 'next/link';

export default function BodyPartsPage() {
  const { data, isLoading, isFetching, refetch } = useFetchBodyParts();

  const openDialogForm = (bodyPart?: IBodyPart) => {
    openModal({
      size: 'lg',
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: bodyPart ? 'Edit Body Part' : 'Add Body Part',
      children: (
        <BodyPartForm
          bodyPart={bodyPart}
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
      title='Body-part'
      rightSection={
        <Flex direction='row' align='center' gap='sm'>
          <Button h={34} leftSection={<IconPlus />} onClick={() => openDialogForm()}>
            New Body-part
          </Button>

          <Button h={34} component={Link} href='/dashboard/body-parts/manage'>
            Manage
          </Button>
        </Flex>
      }
    >
      <Datatable
        loading={isFetching}
        records={data?.body_parts}
        idAccessor='id'
        columns={[
          {
            accessor: 'media_url',
            title: 'Cover',
            width: 124,
            render: (bodyPart) => {
              return <MediaViewer url={bodyPart.media_url} height={64} width={64} />;
            },
          },
          { accessor: 'title', title: 'Title' },
          {
            accessor: 'description',
            title: 'Description',
            render: (bodyPart) => {
              return <Text size='sm'>{truncateText(bodyPart.description, 120)}</Text>;
            },
          },
          {
            accessor: 'level',
            title: 'Level',
            render: (bodyPart) => {
              return (
                <Text size='sm'>
                  {bodyPart.level ? BodyPartLevelDic[bodyPart.level] : 'Not Recorded'}
                </Text>
              );
            },
          },
          {
            accessor: 'exercises',
            title: 'Number of Exercises',
            render: (bodyPart) => {
              return <Badge size='md'>{bodyPart.exercises.length || 0} exercises</Badge>;
            },
          },
          {
            accessor: 'created_at',
            width: 200,
            title: 'Created Date',
            render: (bodyPart) => {
              return <Text size='sm'>{formatDate(bodyPart.created_at)}</Text>;
            },
          },
          {
            accessor: 'actions',
            width: 100,
            title: '',
            render: (bodyPart) => {
              return (
                <Flex direction='column' align='center' gap='xs' w='100%' justify='center'>
                  <Button size='xs' onClick={() => openDialogForm(bodyPart)}>
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
