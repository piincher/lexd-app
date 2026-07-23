import { apiClientV2 } from '@src/shared/api/client';
import type { WarehouseAddress, WarehouseMode } from '../types';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const fetchWarehouseAddresses = async (): Promise<WarehouseAddress[]> => {
  const response = await apiClientV2.get<ApiEnvelope<WarehouseAddress[]>>('/warehouse-addresses');
  return response.data.data;
};

export const fetchSupplierSheetUrl = async (mode: WarehouseMode): Promise<string> => {
  const response = await apiClientV2.get<ApiEnvelope<{ mode: WarehouseMode; url: string }>>(
    `/warehouse-addresses/${mode}/supplier-sheet`,
    { timeout: 10000 },
  );
  const url = response.data?.data?.url;
  if (!url || typeof url !== 'string') throw new Error("Le serveur n'a pas retourné l'image fournisseur.");
  return url;
};
