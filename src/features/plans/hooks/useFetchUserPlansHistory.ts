import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const useFetchUserPlansHistory = ({ userId }: { userId?: string }) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ user_plans: IUserPlan[] }>('GET', '/api/v1/user-plans/user-history', {
      params: { user_id: userId },
    });
  };

  return useQuery<{ user_plans: IUserPlan[] }>({
    queryKey: ['user-plans', userId],
    queryFn: fetcher,
    enabled: !!userId,
  });
};

export default useFetchUserPlansHistory;
