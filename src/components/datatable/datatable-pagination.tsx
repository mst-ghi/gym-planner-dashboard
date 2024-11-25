import { useThemeStyle } from '@/hooks';
import { IconRefresh, IconSearch } from '@tabler/icons-react';
import {
  ActionIcon,
  Flex,
  Group,
  Pagination,
  PaginationProps,
  Select,
  TextInput,
} from '@mantine/core';

export type DatatablePaginationProps = Omit<PaginationProps, 'total'> & {
  refetch?: () => void;
  meta?: IPaginationMeta;
  pageProps?: IPaginationPageProps;
  takeProps?: IPaginationTakeProps;
  searchProps?: IPaginationSearchProps;
  filter?: React.ReactNode;
};

const DatatablePagination = ({
  refetch,
  meta,
  pageProps,
  takeProps,
  searchProps,
  filter,
  size = 'md',
  ...props
}: DatatablePaginationProps) => {
  const { isDesktop } = useThemeStyle();

  return (
    <Flex direction={isDesktop ? 'row' : 'column'} align='center' justify='space-between'>
      <Flex direction='row' align='center' justify='flex-start' gap='md' flex={1}>
        {searchProps && (
          <TextInput
            leftSection={<IconSearch size={16} />}
            value={searchProps.search}
            onChange={(e) => searchProps.setSearch(e.target.value)}
            size='xs'
            mb='lg'
            mt={0}
            placeholder='Search...'
          />
        )}

        {filter}
      </Flex>

      <Group justify='end' align='center'>
        {takeProps && meta?.total_pages && (
          <Select
            ref={null}
            searchable={false}
            w={70}
            mt={0}
            mb='lg'
            size='xs'
            value={takeProps.take}
            onChange={takeProps.setTake}
            styles={{
              section: {
                display: 'none',
                visibility: 'hidden',
              },
              input: {
                padding: 0,
                textAlign: 'center',
              },
            }}
            data={['20', '40', '60'].map((el) => ({
              value: el,
              label: el,
            }))}
          />
        )}

        <Pagination
          {...props}
          mb='lg'
          mt={-2}
          size={size}
          h={30}
          value={(meta?.page || 0) + 1}
          total={meta?.total_pages || 0}
          onChange={pageProps?.setPage}
        />

        {refetch && (
          <ActionIcon variant='filled' mb='lg' mt={0} size={30} onClick={() => refetch()}>
            <IconRefresh size={18} />
          </ActionIcon>
        )}
      </Group>
    </Flex>
  );
};

export default DatatablePagination;
