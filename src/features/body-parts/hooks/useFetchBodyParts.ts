import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const useFetchBodyParts = () => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return await callRequest<{ body_parts: IBodyPart[] }>('GET', '/api/v1/body-parts');
  };

  return useQuery<{ body_parts: IBodyPart[] }>({
    queryKey: ['body-parts'],
    queryFn: fetcher,
  });
};

export default useFetchBodyParts;
