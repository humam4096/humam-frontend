import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {messagesApi} from '@/lib/api/messages';

export function useMessages() {
  const queryClient = useQueryClient();
  
  const {data: messages = [], isLoading, error, refetch} = useQuery({
    queryKey: ['messages'],
    queryFn: messagesApi.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'new' | 'read' | 'replied' }) =>
      messagesApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const updateStatus = async (id: number, status: 'new' | 'read' | 'replied') => {
    await updateStatusMutation.mutateAsync({ id, status });
  };

  return {
    messages,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
    updateStatus,
    isUpdating: updateStatusMutation.isPending,
  };
}
