import { apiRequest, apiV2 } from '@src/api/client';
import type { AirwayBill } from './types';

const BASE_URL = '/airway-bills';

export const airwayBillApi = {
  getById: (id: string) =>
    apiRequest.get<{ airwayBill: AirwayBill }>(apiV2, `${BASE_URL}/${id}`),
};
