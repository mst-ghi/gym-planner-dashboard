import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchUsersProps {
  page?: number | string | null;
  take?: number | string | null;
  userId?: number | string | null;
  kind?: string | TUserKind | null;
  search?: string | null;
  short?: boolean;
  disabled?: boolean;
}

const useFetchUsers = (
  { page, take, userId, kind, search, short, disabled }: UseFetchUsersProps = {
    page: 0,
    take: 20,
    search: undefined,
    short: undefined,
    disabled: false,
  },
) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ users: IUser[]; meta: IPaginationMeta }>('GET', '/api/v1/users', {
      params: {
        page: page || 0,
        take,
        user_id: userId || undefined,
        search: search || undefined,
        kind: kind || undefined,
        short,
      },
    });
  };

  return useQuery<{ users: IUser[]; meta: IPaginationMeta }>({
    queryKey: ['users', page, take, userId, kind, search, short],
    queryFn: fetcher,
    enabled: !disabled,
  });
};

export default useFetchUsers;
