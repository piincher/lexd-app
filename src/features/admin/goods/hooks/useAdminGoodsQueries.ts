import { useQuery } from '@tanstack/react-query';
import { adminGoodsApi } from '../api';
import { GoodsFilters } from '../api';

const QUERY_KEYS = {
  adminGoods: 'admin-goods',
  adminGoodsDetail: (id: string) => ['admin-goods', id],
} as const;

export const useGetAllGoods = (filters?: GoodsFilters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.adminGoods, filters],
    queryFn: () => adminGoodsApi.getAll(filters),
  });
};

export const useGetGoodsById = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.adminGoodsDetail(id),
    queryFn: () => adminGoodsApi.getById(id),
    enabled: !!id,
  });
};

export const useGetGoodsByClient = (clientId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.adminGoods, 'client', clientId],
    queryFn: () => adminGoodsApi.getByClient(clientId),
    enabled: !!clientId,
  });
};
