import { apiV2 } from '@src/api/client';
import { AxiosResponse } from 'axios';
import { 
  OrderWithGoods, 
  OrderWithGoodsSeparated, 
  OrderTotalsBreakdown 
} from './types';

const axios = apiV2;
const BASE_URL = '/api/v1/orders';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

const isVoidGoods = (goods: { status?: string; isVoid?: boolean }): boolean => {
  return goods.status === 'void' || goods.isVoid === true;
};

export const orderApi = {
  /**
   * Get order with goods details
   * GET /api/v1/orders/:id/with-goods
   */
  getOrderWithGoods: (id: string): Promise<AxiosResponse<ApiResponse<OrderWithGoodsSeparated>>> =>
    axios.get(`${BASE_URL}/${id}/with-goods`).then((response) => {
      const { data } = response;
      
      if (data.success && data.data) {
        const { order, goods } = data.data;
        const activeGoods = goods.filter((g) => !isVoidGoods(g));
        const voidGoods = goods.filter((g) => isVoidGoods(g));
        
        return {
          ...response,
          data: {
            ...data,
            data: {
              order,
              activeGoods,
              voidGoods,
            },
          },
        };
      }
      
      return response;
    }),

  /**
   * Get order totals breakdown
   * GET /api/v1/orders/:id/totals-breakdown
   */
  getOrderTotals: (id: string): Promise<AxiosResponse<ApiResponse<OrderTotalsBreakdown>>> =>
    axios.get(`${BASE_URL}/${id}/totals-breakdown`),

  /**
   * Force recalculate order totals
   * POST /api/v1/orders/:id/recalculate
   */
  recalculateOrder: (id: string): Promise<AxiosResponse<ApiResponse<OrderTotalsBreakdown>>> =>
    axios.post(`${BASE_URL}/${id}/recalculate`),
};
