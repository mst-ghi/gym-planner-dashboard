import { uuid } from '@/utils';
import { useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { ImageStates } from '@/components/common';
import { openConfirmModal } from '@mantine/modals';
import { useDebouncedValue, useSetState } from '@mantine/hooks';
import { useFoodProgramFormContext, FoodProgramItemFormValues } from '../context';
import { Box, Button, Card, Flex, SimpleGrid, Textarea, TextInput, Text } from '@mantine/core';

const ItemCard = ({
  item,
  onUpdate,
  onDelete,
}: {
  item: FoodProgramItemFormValues;
  onUpdate?: (item: FoodProgramItemFormValues) => void;
  onDelete?: (item: FoodProgramItemFormValues) => void;
}) => {
  const [values, setValues] = useSetState<FoodProgramItemFormValues>({ ...item });
  const [debounced] = useDebouncedValue(values, 700);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(debounced);
    }
  }, [debounced]);

  return (
    <Card withBorder p='sm'>
      <Flex direction='column'>
        <TextInput
          withAsterisk
          maxLength={160}
          size='xs'
          label='item title'
          value={values.cause}
          rightSection={
            <Text fz={12} fw={600} c='gray'>
              {160 - (values.cause?.length || 0)}
            </Text>
          }
          onChange={(e) => setValues({ cause: e.target.value })}
        />
        <Textarea
          withAsterisk
          size='xs'
          label='item text'
          rows={8}
          value={values.content}
          onChange={(e) => setValues({ content: e.target.value })}
        />
      </Flex>

      {onDelete && (
        <Box mt='sm'>
          <Button
            size='xs'
            color='red'
            leftSection={<IconTrash />}
            onClick={() => {
              openConfirmModal({
                title: 'Delete food item',
                children: 'Are you sure you want to delete food item?',
                onConfirm: () => onDelete(item),
              });
            }}
          >
            Delete item
          </Button>
        </Box>
      )}
    </Card>
  );
};

const FoodProgramWizardDay = () => {
  const form = useFoodProgramFormContext();

  const onUpdate = (_item: FoodProgramItemFormValues) => {
    form.setFieldValue(
      `items`,
      form.values.items.map((el) => (el.unique === _item.unique ? _item : el)),
    );
  };

  const onDelete = (_item: FoodProgramItemFormValues) => {
    form.setFieldValue(
      `items`,
      form.values.items.filter((el) => el.unique !== _item.unique),
    );
  };

  return (
    <Card withBorder>
      <Card.Section p='xs'>
        <Flex direction='row' align='center' justify='space-between'>
          <Button
            onClick={() => {
              form.setFieldValue(`items`, [
                ...form.values.items,
                {
                  unique: uuid(),
                  cause: '',
                  content: '',
                },
              ]);
            }}
          >
            افزودن آیتم غذایی
          </Button>
        </Flex>
      </Card.Section>

      {(!form.values.items || !form.values.items[0]) && (
        <ImageStates name='noRecords' message='آیتم غذایی اضافه کنید' />
      )}

      {form.values.items && form.values.items[0] && (
        <SimpleGrid cols={2} spacing='md'>
          {form.values.items.map((item) => {
            return (
              <ItemCard key={item.unique} item={item} onUpdate={onUpdate} onDelete={onDelete} />
            );
          })}
        </SimpleGrid>
      )}
    </Card>
  );
};

export default FoodProgramWizardDay;
