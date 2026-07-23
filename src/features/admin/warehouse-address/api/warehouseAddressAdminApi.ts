import { apiClientV2 } from '@src/shared/api/client';
import type { WarehouseAddress, WarehouseMode } from '@src/features/warehouse-address/types';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type WarehouseAddressUpdate = Partial<Omit<WarehouseAddress, 'mode' | 'updatedAt'>>;

export const fetchAdminWarehouseAddresses = async (): Promise<WarehouseAddress[]> => {
  const response = await apiClientV2.get<ApiEnvelope<WarehouseAddress[]>>('/admin/warehouse-addresses');
  return response.data.data;
};

export const updateWarehouseAddress = async (
  mode: WarehouseMode,
  payload: WarehouseAddressUpdate,
): Promise<WarehouseAddress> => {
  const response = await apiClientV2.put<ApiEnvelope<WarehouseAddress>>(
    `/admin/warehouse-addresses/${mode}`,
    payload,
  );
  return response.data.data;
};
