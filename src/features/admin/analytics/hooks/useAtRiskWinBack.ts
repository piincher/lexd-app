import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { apiClientV2 } from '@src/api/client';

const STATS_KEY = 'winback-stats';
const LOGS_KEY = 'winback-logs';

interface TriggerVariables {
  userId: string;
  triggerType: string;
}

export const useTriggerWinBack = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, TriggerVariables>({
    mutationFn: async ({ userId, triggerType }) => {
      const response = await apiClientV2.post('/admin/winback/trigger', { userId, triggerType });
      return response.data?.data ?? response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATS_KEY] });
      queryClient.invalidateQueries({ queryKey: [LOGS_KEY] });
    },
  });

  const triggerWinBack = useCallback(async (variables: TriggerVariables): Promise<boolean> => {
    try {
      await mutation.mutateAsync(variables);
      showMessage({ message: 'Relance programmée', type: 'success' });
      return true;
    } catch (error) {
      showMessage({
        message: 'Relance impossible',
        description: error instanceof Error ? error.message : 'Vérifiez la configuration Win-back.',
        type: 'danger',
      });
      return false;
    }
  }, [mutation]);

  return { triggerWinBack, isPending: mutation.isPending };
};
