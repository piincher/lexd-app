import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { fetchShippingMarkConfig, updateShippingMarkConfig, type ShippingMarkConfig } from '../api/shippingMarkAdminApi';

const CONFIG_QUERY_KEY = 'shipping-mark-config';

export const useShippingMarkConfig = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [CONFIG_QUERY_KEY],
    queryFn: fetchShippingMarkConfig,
    staleTime: DEFAULT_STALE_TIME,
  });

  const mutation = useMutation({
    mutationFn: (updates: Partial<ShippingMarkConfig>) => updateShippingMarkConfig(updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [CONFIG_QUERY_KEY] }),
  });

  return {
    config: data,
    isLoading,
    isError,
    refetch,
    updateConfig: mutation.mutateAsync,
    isUpdating: mutation.isPending,
  };
};
