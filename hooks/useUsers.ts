import {useQuery} from '@tanstack/react-query';
import {usersApi} from '@/lib/api/users';
import type {User} from '@/lib/api/users';

export function useUsers() {
  const {data: users = [], isLoading, error, refetch} = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getAll,
  });

  return {
    users,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
}
