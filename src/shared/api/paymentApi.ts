import { apiClientV2 } from '@src/api/client';

const BASE_URL = '/payments';

export interface BalanceDueItem {
  _id: string;
  description: string;
  status: string;
  amount: number;
  paid: number;
  due: number;
}

export interface BalanceDueResponse {
  totalDue: number;
  totalDueFCFA: number;
  totalPaid: number;
  totalCost: number;
  currency: string;
  itemCount: number;
  unpaidCount: number;
  partialCount: number;
  goods: BalanceDueItem[];
}

export const getBalanceDue = async (): Promise<BalanceDueResponse> => {
  const response = await apiClientV2.get<{ data: BalanceDueResponse }>(`${BASE_URL}/balance-due`);
  return response.data.data;
};
