import { useFetchBodyParts } from '../hooks';
import { Select, SelectProps } from '@mantine/core';

interface BodyPartSelectProps extends Omit<SelectProps, 'data' | 'disabled'> {}

const BodyPartSelect = (props: BodyPartSelectProps) => {
  const { data, isFetching } = useFetchBodyParts();

  return (
    <Select
      clearable
      disabled={isFetching}
      data={data?.body_parts.map((bp) => ({ value: bp.id, label: bp.title }))}
      size='xs'
      mb='lg'
      mt={0}
      placeholder='Select Body-part'
      {...props}
    />
  );
};

export default BodyPartSelect;
