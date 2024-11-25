import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const useFetchUserFoodProgramById = ({ id }: { id?: string }) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ food_program: IFoodProgram }>('GET', `/api/v1/food-programs/${id}/show`);
  };

  return useQuery<{ food_program: IFoodProgram }>({
    queryKey: ['food-program', id],
    queryFn: fetcher,
    enabled: !!id,
  });
};

export default useFetchUserFoodProgramById;
