import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchUserByIdProps {
  id?: string | null;
  disabled?: boolean;
}

const useFetchUserById = ({ id, disabled }: UseFetchUserByIdProps = {}) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ user: IUser }>('GET', `/api/v1/users/${id}`);
  };

  return useQuery<{ user: IUser }>({
    queryKey: ['user', id],
    queryFn: fetcher,
    enabled: !!id && !disabled,
  });
};

export default useFetchUserById;
