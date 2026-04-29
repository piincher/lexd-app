import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import { useNetworkStatus } from '../useNetworkStatus';
import type { OfflineMutationOptions, OfflineMutationContext } from './types';
import { useOfflineMutateFn } from './useOfflineMutateFn';
import { useOptimisticMutate } from './useOptimisticMutate';
import { useMutationErrorHandler } from './useMutationErrorHandler';
import { useMutationSuccessHandler } from './useMutationSuccessHandler';

export const useOfflineMutation = <TData = unknown, TError = Error, TVariables = void, TContext = OfflineMutationContext>(
  options: OfflineMutationOptions<TData, TError, TVariables, TContext>,
  queryClient: QueryClient
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const { isOnline } = useNetworkStatus();
  const {
    mutationType, endpoint, onOptimisticUpdate, onRollback,
    queueWhenOffline = true, queuePriority = 'normal', metadata,
    mutationFn, ...mutationOptions
  } = options;

  return useMutation<TData, TError, TVariables, TContext>({
    ...mutationOptions,
    mutationFn: useOfflineMutateFn(mutationFn, isOnline, queueWhenOffline, mutationType, endpoint, queuePriority, metadata),
    onMutate: useOptimisticMutate(queryClient, onOptimisticUpdate, isOnline, queueWhenOffline),
    onError: useMutationErrorHandler(queryClient, onRollback, mutationOptions.onError),
    onSuccess: useMutationSuccessHandler(mutationOptions.onSuccess),
  });
};

export default useOfflineMutation;
