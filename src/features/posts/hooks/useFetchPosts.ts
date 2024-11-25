import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchPostsProps {
  page?: number | string | null;
  take?: number | string | null;
  search?: string;
  recent?: boolean;
  none?: boolean;
}

const useFetchPosts = (
  { page, take, search, recent, none }: UseFetchPostsProps = {
    page: 0,
    take: 20,
    search: undefined,
    recent: undefined,
    none: undefined,
  },
) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ posts: IPost[]; meta: IPaginationMeta }>('GET', '/api/v1/posts', {
      params: { page: page || 0, take: take || 20, search: search || undefined, recent, none },
    });
  };

  return useQuery<{ posts: IPost[]; meta: IPaginationMeta }>({
    queryKey: ['posts', page, take, search, recent, none],
    queryFn: fetcher,
  });
};

export default useFetchPosts;
