import {useQuery} from '@tanstack/react-query';
import {statsApi} from '@/lib/api/stats';

export function useDashboardStats() {
  const {data: stats, isLoading, error, refetch} = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: statsApi.getDashboard,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  return {
    stats: stats || null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
}
