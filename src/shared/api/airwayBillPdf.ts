/**
 * Shared API client for airway bill goods manifest PDF downloads.
 *
 * Kept in shared/api so both admin and customer features can download AWB
 * goods manifests without cross-feature imports. The backend filters the
 * contents based on the authenticated user's role.
 */

import { apiClientV2 } from '@src/api/client';

export const downloadAirwayBillGoodsPDF = async (airwayBillId: string): Promise<Blob> => {
  const response = await apiClientV2.get(`/airway-bills/${airwayBillId}/goods-manifest/export`, {
    responseType: 'blob',
  });
  return response.data as Blob;
};
