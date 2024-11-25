import { useFetchEquipments } from '../hooks';
import { Select, SelectProps } from '@mantine/core';

interface EquipmentSelectProps extends Omit<SelectProps, 'data' | 'disabled'> {}

const EquipmentSelect = (props: EquipmentSelectProps) => {
  const { data, isFetching } = useFetchEquipments();

  return (
    <Select
      clearable
      disabled={isFetching}
      data={data?.equipments.map((eq) => ({ value: eq.id, label: eq.title }))}
      size='xs'
      mb='lg'
      mt={0}
      placeholder='Select Equipment'
      {...props}
    />
  );
};

export default EquipmentSelect;
