'use client';

import { useState } from 'react';
import { Page } from '@/components/shell';
import { IconPlus } from '@tabler/icons-react';
import { MediaViewer } from '@/components/common';
import { UserGenderDic } from '@/utils/dictionary';
import { formatDate, truncateText } from '@/utils';
import { Button, Flex, Text } from '@mantine/core';
import { BodyPartSelect } from '@/features/body-parts';
import { EquipmentSelect } from '@/features/equipments';
import { closeAllModals, openModal } from '@mantine/modals';
import { Datatable, useDatatable } from '@/components/datatable';
import { ExerciseForm, useFetchExercises } from '@/features/exercises';
import Link from 'next/link';

export default function ExercisesPage() {
  const [bodyPartId, setBodyPartId] = useState<string | null>();
  const [equipmentId, setEquipmentId] = useState<string | null>();

  const { states, pageProps, takeProps, searchProps } = useDatatable();
  const { data, isLoading, isFetching, refetch } = useFetchExercises({
    ...states,
    bodyPartId,
    equipmentId,
  });

  const openDialogForm = (exercise?: IExercise) => {
    openModal({
      size: 'lg',
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: exercise ? 'Edit Exercise' : 'Add Exercise',
      children: (
        <ExerciseForm
          exercise={exercise}
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
      title='Exercises'
      loading={isLoading}
      rightSection={
        <Flex direction='row' align='center' gap='sm'>
          <Button h={34} leftSection={<IconPlus />} onClick={() => openDialogForm()}>
            New Exercise
          </Button>

          <Button h={34} component={Link} href='/dashboard/exercises/card-view'>
            Card View
          </Button>
        </Flex>
      }
    >
      <Datatable
        loading={isFetching}
        records={data?.exercises}
        paginationProps={{
          refetch,
          meta: data?.meta,
          pageProps,
          takeProps,
          searchProps,
          filter: (
            <Flex direction='row' align='center' gap='md' w='100%'>
              <BodyPartSelect value={bodyPartId} onChange={setBodyPartId} />
              <EquipmentSelect value={equipmentId} onChange={setEquipmentId} />
            </Flex>
          ),
        }}
        columns={[
          {
            accessor: 'media_url',
            title: 'Cover',
            width: 124,
            render: (exercise) => {
              return <MediaViewer url={exercise.cover_url} height={64} width={64} />;
            },
          },
          { accessor: 'title', title: 'Title' },
          { accessor: 'title_en', title: 'Title EN' },
          {
            accessor: 'description',
            title: 'Description',
            render: (exercise) => {
              return <Text size='sm'>{truncateText(exercise.description, 80)}</Text>;
            },
          },
          {
            accessor: 'bodyPart',
            title: 'Body Part',
            render: (exercise) => {
              return <Text size='sm'>{exercise.bodyPart?.title || '--'}</Text>;
            },
          },
          {
            accessor: 'equipment',
            title: 'Equipment',
            render: (exercise) => {
              return <Text size='sm'>{exercise.equipment?.title || '--'}</Text>;
            },
          },
          {
            accessor: 'gender',
            title: 'Gender',
            render: (exercise) => {
              return (
                <Text size='sm'>{exercise.gender ? UserGenderDic[exercise.gender] : '--'}</Text>
              );
            },
          },
          {
            accessor: 'created_at',
            title: 'Created Date',
            render: (exercise) => {
              return <Text size='sm'>{formatDate(exercise.created_at)}</Text>;
            },
          },

          {
            accessor: 'actions',
            title: '',
            render: (exercise) => {
              return (
                <Flex direction='row' align='center' gap='xs' w='100%' justify='center'>
                  <Button size='xs' onClick={() => openDialogForm(exercise)}>
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
