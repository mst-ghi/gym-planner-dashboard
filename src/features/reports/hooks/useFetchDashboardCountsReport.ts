import { useRequest } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

interface IDashboardCountsReport {
  users_count: number;
  posts_count: number;
  equipments_count: number;
  body_parts_count: number;
  exercises_count: number;
  workout_programs_count: number;
  user_plans_count: number;
  ready_user_plans_count: number;
}

const useFetchDashboardCountsReport = () => {
  const { callRequest } = useRequest();

  const fetcher = async () => {
    return callRequest<{ reports: IDashboardCountsReport }>(
      'GET',
      '/api/v1/reports/dashboard-cards-count',
    );
  };

  return useQuery<{ reports: IDashboardCountsReport }>({
    queryKey: ['dashboard', 'card-counts'],
    queryFn: fetcher,
  });
};

export default useFetchDashboardCountsReport;
