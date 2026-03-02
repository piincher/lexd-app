/**
 * Offline-Aware Mutation Hook
 * Handles mutations with offline queue support and optimistic updates
 */


import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  QueryClient,
} from '@tanstack/react-query';
import { useNetworkStatus } from './useNetworkStatus';
import { addToQueue, QueuedActionType } from '../lib/offlineQueue';
import { showMessage } from 'react-native-flash-message';

export interface OfflineMutationOptions<TData, TError, TVariables, TContext>
  extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'onMutate' | 'onError'> {
  // Mutation type for queueing
  mutationType: QueuedActionType;
  // API endpoint
  endpoint: string;
  // Function to perform optimistic update
  onOptimisticUpdate?: (variables: TVariables, queryClient: QueryClient) => Promise<void>;
  // Function to rollback on error
  onRollback?: (variables: TVariables, context: TContext, queryClient: QueryClient) => Promise<void>;
  // Whether to queue when offline
  queueWhenOffline?: boolean;
  // Priority in queue
  queuePriority?: 'high' | 'normal' | 'low';
  // Metadata for conflict resolution
  metadata?: {
    entityType?: string;
    entityId?: string;
  };
  // Custom mutation function (for online mode)
  mutationFn: (variables: TVariables) => Promise<TData>;
}

export interface OfflineMutationContext {
  offline?: boolean;
  optimisticData?: any;
  previousData?: any;
}

/**
 * Hook for offline-aware mutations
 * Automatically queues mutations when offline
 * Supports optimistic updates with rollback
 */
export const useOfflineMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = OfflineMutationContext
>(
  options: OfflineMutationOptions<TData, TError, TVariables, TContext>,
  queryClient: QueryClient
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const { isOnline } = useNetworkStatus();
  const {
    mutationType,
    endpoint,
    onOptimisticUpdate,
    onRollback,
    queueWhenOffline = true,
    queuePriority = 'normal',
    metadata,
    mutationFn,
    ...mutationOptions
  } = options;

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    ...mutationOptions,
    mutationFn: async (variables: TVariables) => {
      if (!isOnline && queueWhenOffline) {
        // Queue the action for later
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

        // Return a placeholder result
        return { queued: true } as unknown as TData;
      }

      // Execute mutation normally
      return await mutationFn(variables);
    },
    onMutate: async (variables: TVariables) => {
      const context: OfflineMutationContext = {};

      // Perform optimistic update
      if (onOptimisticUpdate) {
        await onOptimisticUpdate(variables, queryClient);
        context.optimisticData = variables;
      }

      if (!isOnline && queueWhenOffline) {
        context.offline = true;
      }

      return context as TContext;
    },
    onError: async (error: TError, variables: TVariables, context?: TContext) => {
      const offlineContext = context as OfflineMutationContext | undefined;

      // Only rollback if not offline (offline actions will be retried later)
      if (!offlineContext?.offline && onRollback) {
        await onRollback(variables, context as TContext, queryClient);
      }

      // Show error message
      showMessage({
        message: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        type: 'danger',
        duration: 4000,
      });

      // Call original onError if provided
      if (mutationOptions.onError) {
        mutationOptions.onError(error, variables, context);
      }
    },
    onSuccess: async (data: TData, variables: TVariables, context?: TContext) => {
      const offlineContext = context as OfflineMutationContext | undefined;

      if (offlineContext?.offline) {
        showMessage({
          message: 'Enregistré',
          description: 'Synchronisation en attente',
          type: 'info',
          duration: 2000,
        });
      } else {
        showMessage({
          message: 'Succès',
          description: 'Opération réussie',
          type: 'success',
          duration: 2000,
        });
      }

      // Call original onSuccess if provided
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
    },
  });

  return mutation;
};

/**
 * Helper to create optimistic update for list items
 */
export const createListOptimisticUpdate = <T extends { id: string }>(
  queryKey: string[],
  operation: 'add' | 'update' | 'delete',
  getNewItem?: (variables: any) => T
) => {
  return async (variables: any, queryClient: QueryClient) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey });

    // Snapshot previous value
    const previousData = queryClient.getQueryData<T[]>(queryKey);

    // Optimistically update
    queryClient.setQueryData<T[]>(queryKey, (old) => {
      if (!old) return old;

      switch (operation) {
        case 'add':
          const newItem = getNewItem?.(variables);
          return newItem ? [newItem, ...old] : old;
        case 'update':
          return old.map((item) =>
            item.id === variables.id ? { ...item, ...variables } : item
          );
        case 'delete':
          return old.filter((item) => item.id !== variables.id);
        default:
          return old;
      }
    });

    return { previousData };
  };
};

/**
 * Helper to create rollback for list items
 */
export const createListRollback = <T>(queryKey: string[]) => {
  return async (_variables: any, context: { previousData?: T[] }, queryClient: QueryClient) => {
    if (context?.previousData) {
      queryClient.setQueryData(queryKey, context.previousData);
    }
  };
};

export default useOfflineMutation;
