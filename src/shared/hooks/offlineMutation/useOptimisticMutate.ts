import type { QueryClient } from '@tanstack/react-query';
import type { OfflineMutationContext } from './types';

export const useOptimisticMutate = <TVariables, TContext>(
  queryClient: QueryClient,
  onOptimisticUpdate?: (variables: TVariables, queryClient: QueryClient) => Promise<void>,
  isOnline: boolean = true,
  queueWhenOffline: boolean = true
) => {
  return async (variables: TVariables): Promise<TContext> => {
    const context: OfflineMutationContext = {};

    if (onOptimisticUpdate) {
      await onOptimisticUpdate(variables, queryClient);
      context.optimisticData = variables;
    }

    if (!isOnline && queueWhenOffline) {
      context.offline = true;
    }

    return context as TContext;
  };
};
