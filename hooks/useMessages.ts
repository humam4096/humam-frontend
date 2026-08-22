import {useQuery} from '@tanstack/react-query';
import {messagesApi} from '@/lib/api/messages';
import type {Contact} from '@/db/schema';

export function useMessages() {
  const {data: messages = [], isLoading, error, refetch} = useQuery({
    queryKey: ['messages'],
    queryFn: messagesApi.getAll,
  });

  return {
    messages,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
}
