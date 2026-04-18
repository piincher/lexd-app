/**
 * Goods Export API
 *
 * API functions for fetching goods data specifically for PDF export
 */

import { apiClientV2 } from '@src/api/client';
import { GoodsApiResponse, PaginatedGoodsResponse } from '@src/shared/types/goods';

export interface GoodsExportFilters {
  startDate?: string;
  endDate?: string;
  status?: string;
  clientId?: string;
  limit?: number;
  page?: number;
}

export const getGoodsForExport = async (
  filters?: GoodsExportFilters
): Promise<{ goods: any[]; total: number }> => {
  const response = await apiClientV2.get<GoodsApiResponse<PaginatedGoodsResponse>>('/goods', {
    params: { ...filters, limit: filters?.limit || 10000 },
  });
  const data = response.data.data;
  return {
    goods: data?.goods || [],
    total: data?.pagination?.total || 0,
  };
};
