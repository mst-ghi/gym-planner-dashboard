import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const useFetchEquipments = () => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return await callRequest<{ equipments: IEquipment[] }>('GET', '/api/v1/equipments');
  };

  return useQuery<{ equipments: IEquipment[] }>({
    queryKey: ['equipments'],
    queryFn: fetcher,
  });
};

export default useFetchEquipments;
