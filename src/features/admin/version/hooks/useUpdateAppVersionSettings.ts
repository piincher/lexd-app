import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { updateAppVersionSettings } from '../api/versionApi';
import { appVersionQueryKeys } from './useAppVersionSettings';

export const useUpdateAppVersionSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppVersionSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appVersionQueryKeys.settings });
      showMessage({
        message: 'Paramètres de version mis à jour',
        type: 'success',
      });
    },
    onError: (error: Error) => {
      showMessage({
        message: error.message || "Impossible de mettre à jour les paramètres de version",
        type: 'danger',
      });
    },
  });
};
