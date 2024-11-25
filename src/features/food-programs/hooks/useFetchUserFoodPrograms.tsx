import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const useFetchUserFoodPrograms = ({
  userId,
  userPlanId,
}: {
  userId?: string;
  userPlanId?: string;
}) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ food_programs: IFoodProgram[] }>('GET', `/api/v1/food-programs/user`, {
      params: {
        user_id: userId,
        user_plan_id: userPlanId,
      },
    });
  };

  return useQuery<{ food_programs: IFoodProgram[] }>({
    queryKey: ['user-food-programs', userId, userPlanId],
    queryFn: fetcher,
    enabled: !!userId || !!userPlanId,
  });
};

export default useFetchUserFoodPrograms;
