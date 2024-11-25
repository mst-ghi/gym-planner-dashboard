import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchUserPlanByIdProps {
  id?: string;
}

const useFetchUserPlanById = ({ id }: UseFetchUserPlanByIdProps) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ user_plan: IUserPlan }>('GET', `/api/v1/user-plans/${id}/show`);
  };

  return useQuery<{ user_plan: IUserPlan }>({
    queryKey: ['user-plan', id],
    queryFn: fetcher,
    enabled: !!id,
  });
};

export default useFetchUserPlanById;
