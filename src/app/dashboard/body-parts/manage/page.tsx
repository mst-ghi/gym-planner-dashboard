'use client';

import { Page } from '@/components/shell';
import { IconPlus } from '@tabler/icons-react';
import { Button, Flex, SimpleGrid } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { BodyPartForm, BodyPartManage, useFetchBodyParts } from '@/features/body-parts';

export default function ManageBodyPartsPage() {
  const { data, isLoading, refetch } = useFetchBodyParts();

  const reload = async () => {
    await refetch();
    closeAllModals();
  };

  const openDialogForm = (bodyPart?: IBodyPart) => {
    openModal({
      size: 'lg',
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: bodyPart ? 'Edit Body Part' : 'Add Body Part',
      children: <BodyPartForm bodyPart={bodyPart} done={reload} />,
    });
  };

  return (
    <Page loading={isLoading} title='Add and View Movements and Body Parts'>
      <SimpleGrid cols={3}>
        {data &&
          data.body_parts &&
          data.body_parts.map((bodyPart) => {
            return (
              <BodyPartManage
                key={`manage-body-part-${bodyPart.id}`}
                bodyPart={bodyPart}
                reload={reload}
              />
            );
          })}
      </SimpleGrid>

      <Flex mt='md'>
        <Button variant='subtle' rightSection={<IconPlus />} onClick={() => openDialogForm()}>
          Add New Exercise Body Part
        </Button>
      </Flex>
    </Page>
  );
}
