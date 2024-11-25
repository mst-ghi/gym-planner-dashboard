import { urlQueryString } from '@/utils';
import { useRouter, usePathname } from 'next/navigation';

const useUpdateUrl = () => {
  const router = useRouter();
  const pathname = usePathname();

  const updateAllQueries = (params: object) => {
    router.replace(`${pathname}?${urlQueryString(params)}`);
  };

  return {
    updateAllQueries,
  };
};

export default useUpdateUrl;
