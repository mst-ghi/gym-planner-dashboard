import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchExercisesProps {
  page?: number;
  take?: number | string | null;
  search?: string;
  bodyPartId?: string | null;
  equipmentId?: string | null;
  gender?: string | null;
}

const useFetchExercises = ({
  page,
  take,
  search,
  bodyPartId,
  equipmentId,
  gender,
}: UseFetchExercisesProps = {}) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return await callRequest<{ exercises: IExercise[]; meta: IPaginationMeta }>(
      'GET',
      '/api/v1/exercises',
      {
        params: {
          page: page || 0,
          take: take || 20,
          search: search || undefined,
          body_part_id: bodyPartId || undefined,
          equipment_id: equipmentId || undefined,
          gender: gender || undefined,
        },
      },
    );
  };

  return useQuery<{ exercises: IExercise[]; meta: IPaginationMeta }>({
    queryKey: ['exercises', page, take, search, bodyPartId, equipmentId],
    queryFn: fetcher,
  });
};

export default useFetchExercises;
