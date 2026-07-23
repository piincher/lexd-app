import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { hapticError, hapticSuccess } from '@src/shared/lib/haptics';
import { shareShippingMark } from '@src/shared/lib/shippingMarkShare';
import type { SupplierShippingMarkShareRequest } from '@src/shared/types/shippingMark';
import { fetchClientShippingMark } from '../api/shippingMarkAdminApi';

export const useSupplierShippingMarkShare = () => {
  const mutation = useMutation({
    mutationFn: async (client: SupplierShippingMarkShareRequest) => {
      const mark = await fetchClientShippingMark(client.userId);
      const result = await shareShippingMark(mark.shippingMarkImageUrl, mark.clientId, {
        clientName: client.clientName,
        supplierInstructions: true,
      });
      return { result, clientId: mark.clientId };
    },
    onSuccess: ({ result, clientId }) => {
      if (result === 'shared') {
        hapticSuccess();
        showMessage({
          message: 'Marque partagée',
          description: `${clientId} est prête pour le fournisseur.`,
          type: 'success',
        });
      }
    },
    onError: (error) => {
      hapticError();
      showMessage({
        message: 'Partage impossible',
        description: error instanceof Error ? error.message : 'Impossible de préparer la marque.',
        type: 'danger',
      });
    },
  });

  const shareWithSupplier = useCallback(async (client: SupplierShippingMarkShareRequest) => {
    try {
      await mutation.mutateAsync(client);
    } catch {
      // The mutation displays the recoverable error state.
    }
  }, [mutation]);

  return {
    shareWithSupplier,
    sharingClientId: mutation.isPending ? mutation.variables?.userId : undefined,
  };
};
