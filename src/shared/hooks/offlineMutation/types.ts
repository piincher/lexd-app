import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type { QueuedActionType } from '../../lib/offlineQueue';

export interface OfflineMutationOptions<TData, TError, TVariables, TContext>
  extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'onMutate' | 'onError'> {
  mutationType: QueuedActionType;
  endpoint: string;
  onOptimisticUpdate?: (variables: TVariables, queryClient: QueryClient) => Promise<void>;
  onRollback?: (variables: TVariables, context: TContext, queryClient: QueryClient) => Promise<void>;
  queueWhenOffline?: boolean;
  queuePriority?: 'high' | 'normal' | 'low';
  metadata?: { entityType?: string; entityId?: string };
  mutationFn: (variables: TVariables) => Promise<TData>;
}

export interface OfflineMutationContext {
  offline?: boolean;
  optimisticData?: any;
  previousData?: any;
}
