import { showMessage } from 'react-native-flash-message';
import type { QueryClient } from '@tanstack/react-query';
import type { OfflineMutationContext } from './types';

export const useMutationErrorHandler = <TError, TVariables, TContext>(
  queryClient: QueryClient,
  onRollback?: (variables: TVariables, context: TContext, queryClient: QueryClient) => Promise<void>,
  originalOnError?: (error: TError, variables: TVariables, context: TContext | undefined) => void
) => {
  return async (error: TError, variables: TVariables, context?: TContext) => {
    const offlineContext = context as OfflineMutationContext | undefined;

    if (!offlineContext?.offline && onRollback) {
      await onRollback(variables, context as TContext, queryClient);
    }

    showMessage({
      message: 'Erreur',
      description: error instanceof Error ? error.message : 'Une erreur est survenue',
      type: 'danger',
      duration: 4000,
    });

    originalOnError?.(error, variables, context);
  };
};
