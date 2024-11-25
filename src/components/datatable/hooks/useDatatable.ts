import { useDebouncedState, useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';

const useDatatable = () => {
  const [page, setPage] = useState(0);
  const [take, setTake] = useState<string | null>('20');

  const [search, setSearch] = useState<string | undefined>('');
  const [debouncedSearch] = useDebouncedValue(search, 700);

  return {
    states: { page, take, search: debouncedSearch },
    pageProps: { page, setPage },
    takeProps: { take, setTake },
    searchProps: { search, setSearch },
  };
};

export default useDatatable;
