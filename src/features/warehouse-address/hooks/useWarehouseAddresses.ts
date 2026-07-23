import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { fetchWarehouseAddresses } from '../api/warehouseAddressApi';

export const WAREHOUSE_ADDRESSES_QUERY_KEY = 'warehouse-addresses';

export const useWarehouseAddresses = () =>
  useQuery({
    queryKey: [WAREHOUSE_ADDRESSES_QUERY_KEY],
    queryFn: fetchWarehouseAddresses,
    staleTime: DEFAULT_STALE_TIME,
  });
