import { showMessage } from 'react-native-flash-message';
import { addToQueue, type QueuedActionType } from '../../lib/offlineQueue';

export const useOfflineMutateFn = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  isOnline: boolean,
  queueWhenOffline: boolean,
  mutationType: QueuedActionType,
  endpoint: string,
  queuePriority: 'high' | 'normal' | 'low',
  metadata?: { entityType?: string; entityId?: string }
) => {
  return async (variables: TVariables): Promise<TData> => {
    if (!isOnline && queueWhenOffline) {
      await addToQueue({
        type: mutationType,
        endpoint,
        payload: variables,
        maxRetries: 3,
        priority: queuePriority,
        metadata,
      });

      showMessage({
        message: 'Mode hors ligne',
        description: 'Action enregistrée et sera synchronisée',
        type: 'warning',
        duration: 3000,
      });

      return { queued: true } as unknown as TData;
    }

    return await mutationFn(variables);
  };
};
