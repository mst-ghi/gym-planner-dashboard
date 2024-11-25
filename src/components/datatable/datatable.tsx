import { Card, Center, Loader } from '@mantine/core';
import { DataTableColumn, DataTable as MDatatable } from 'mantine-datatable';
import DatatablePagination, { DatatablePaginationProps } from './datatable-pagination';

interface DatatableProps<T> {
  loading?: boolean;
  idAccessor?: (string & {}) | keyof T | undefined;
  records?: T[];
  columns: DataTableColumn<T>[];
  paginationProps?: DatatablePaginationProps;
}

const Datatable = <T,>({
  loading,
  idAccessor = 'id',
  records,
  columns,
  paginationProps,
}: DatatableProps<T>) => {
  return (
    <Card p='sm'>
      {paginationProps && <DatatablePagination {...paginationProps} />}

      <MDatatable
        striped
        withTableBorder={false}
        withColumnBorders
        highlightOnHover
        borderRadius='lg'
        verticalAlign='center'
        idAccessor={idAccessor}
        records={records}
        columns={columns}
      />

      {loading && (
        <Center mt='md'>
          <Loader size='sm' />
        </Center>
      )}
    </Card>
  );
};

export default Datatable;
