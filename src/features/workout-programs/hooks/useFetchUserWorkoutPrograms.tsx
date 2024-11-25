import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const useFetchUserWorkoutPrograms = ({
  userId,
  userPlanId,
}: {
  userId?: string;
  userPlanId?: string;
}) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ workout_programs: IWorkoutProgram[] }>(
      'GET',
      `/api/v1/workout-programs/user`,
      {
        params: {
          user_id: userId,
          user_plan_id: userPlanId,
        },
      },
    );
  };

  return useQuery<{ workout_programs: IWorkoutProgram[] }>({
    queryKey: ['user-workout-programs', userId, userPlanId],
    queryFn: fetcher,
    enabled: !!userId || !!userPlanId,
  });
};

export default useFetchUserWorkoutPrograms;
