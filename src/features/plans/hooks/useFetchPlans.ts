import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const useFetchPlans = () => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ plans: IPlan[] }>('GET', '/api/v1/plans');
  };

  return useQuery<{ plans: IPlan[] }>({
    queryKey: ['plans'],
    queryFn: fetcher,
  });
};

export default useFetchPlans;
