import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchFoodProgramsProps {
  page?: number | string | null;
  take?: number | string | null;
  search?: string;
}

const useFetchFoodPrograms = (
  { page, take, search }: UseFetchFoodProgramsProps = {
    page: 0,
    take: 20,
    search: undefined,
  },
) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ food_programs: IFoodProgram[]; meta: IPaginationMeta }>(
      'GET',
      '/api/v1/food-programs',
      {
        params: { page: page || 0, take: take || 20, search: search || undefined },
      },
    );
  };

  return useQuery<{ food_programs: IFoodProgram[]; meta: IPaginationMeta }>({
    queryKey: ['food-programs', page, take, search],
    queryFn: fetcher,
  });
};

export default useFetchFoodPrograms;
