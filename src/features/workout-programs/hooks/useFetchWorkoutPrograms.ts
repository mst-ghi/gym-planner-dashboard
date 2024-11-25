import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchWorkoutProgramsProps {
  page?: number | string | null;
  take?: number | string | null;
  search?: string;
}

const useFetchWorkoutPrograms = (
  { page, take, search }: UseFetchWorkoutProgramsProps = {
    page: 0,
    take: 20,
    search: undefined,
  },
) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ workout_programs: IWorkoutProgram[]; meta: IPaginationMeta }>(
      'GET',
      '/api/v1/workout-programs',
      {
        params: { page: page || 0, take: take || 20, search: search || undefined },
      },
    );
  };

  return useQuery<{ workout_programs: IWorkoutProgram[]; meta: IPaginationMeta }>({
    queryKey: ['workout-programs', page, take, search],
    queryFn: fetcher,
  });
};

export default useFetchWorkoutPrograms;
