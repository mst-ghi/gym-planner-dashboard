import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchUserPlansProps {
  page?: number | string | null;
  take?: number | string | null;
  status?: TUserPlanStatus | string | null;
  search?: string;
}

const useFetchUserPlans = (
  { page, take, search, status }: UseFetchUserPlansProps = {
    page: 0,
    take: 20,
    search: undefined,
    status: undefined,
  },
) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ user_plans: IUserPlan[]; meta: IPaginationMeta }>(
      'GET',
      '/api/v1/user-plans',
      {
        params: {
          page: page || 0,
          take: take || 20,
          search: search || undefined,
          status: status || undefined,
        },
      },
    );
  };

  return useQuery<{ user_plans: IUserPlan[]; meta: IPaginationMeta }>({
    queryKey: ['user-plans', page, take, search, status],
    queryFn: fetcher,
  });
};

export default useFetchUserPlans;
