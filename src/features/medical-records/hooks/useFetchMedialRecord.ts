import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface UseFetchMedialRecordProps {
  id?: string;
  userId?: string;
}
const useFetchMedialRecord = ({ id, userId }: UseFetchMedialRecordProps = {}) => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    const url = id ? `/api/v1/medical-records/${id}` : `/api/v1/medical-records/${userId}/user`;
    return callRequest<{ medical_record: IMedicalRecord }>('GET', url);
  };

  return useQuery<{ medical_record: IMedicalRecord }>({
    queryKey: ['medical-record', id, userId],
    queryFn: fetcher,
    enabled: !!id || !!userId,
  });
};

export default useFetchMedialRecord;
