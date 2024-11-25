import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const useFetchUserWorkoutProgramById = ({ id }: { id?: string }) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ workout_program: IWorkoutProgram }>(
      'GET',
      `/api/v1/workout-programs/${id}/show`,
    );
  };

  return useQuery<{ workout_program: IWorkoutProgram }>({
    queryKey: ['workout-program', id],
    queryFn: fetcher,
    enabled: !!id,
  });
};

export default useFetchUserWorkoutProgramById;
