import { showMessage } from 'react-native-flash-message';
import type { OfflineMutationContext } from './types';

export const useMutationSuccessHandler = <TData, TVariables, TContext>(
  originalOnSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => void
) => {
  return async (data: TData, variables: TVariables, context?: TContext) => {
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

    originalOnSuccess?.(data, variables, context);
  };
};
