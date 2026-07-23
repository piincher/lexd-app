import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import type { WarehouseMode } from '@src/features/warehouse-address/types';
import { WAREHOUSE_ADDRESSES_QUERY_KEY } from '@src/features/warehouse-address/hooks/useWarehouseAddresses';
import {
  fetchAdminWarehouseAddresses,
  updateWarehouseAddress,
  type WarehouseAddressUpdate,
} from '../api/warehouseAddressAdminApi';

const ADMIN_QUERY_KEY = 'admin-warehouse-addresses';

export const useWarehouseAddressAdmin = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [ADMIN_QUERY_KEY],
    queryFn: fetchAdminWarehouseAddresses,
    staleTime: 30 * 1000,
  });

  const mutation = useMutation({
    mutationFn: ({ mode, payload }: { mode: WarehouseMode; payload: WarehouseAddressUpdate }) =>
      updateWarehouseAddress(mode, payload),
    onSuccess: (_data, variables) => {
      showMessage({
        message: 'Adresse enregistrée',
        description: `Adresse ${variables.mode === 'AIR' ? 'aérienne' : 'maritime'} mise à jour.`,
        type: 'success',
      });
      void queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEY] });
      // Refresh the client-facing copy too.
      void queryClient.invalidateQueries({ queryKey: [WAREHOUSE_ADDRESSES_QUERY_KEY] });
    },
    onError: (error) => {
      showMessage({
        message: 'Enregistrement impossible',
        description: error instanceof Error ? error.message : 'Réessayez dans quelques instants.',
        type: 'danger',
      });
    },
  });

  return {
    addresses: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    save: mutation.mutateAsync,
    isSaving: mutation.isPending,
    savingMode: mutation.isPending ? mutation.variables?.mode : undefined,
  };
};
