import { apiV2 } from '@src/api/client';

const axios = apiV2;
import { Goods, GoodsFilters, ApiResponse, ScanQRResponse } from './types';

const BASE_URL = '/goods';

export const goodsApi = {
  getMyGoods: (filters?: GoodsFilters) =>
    axios.get<ApiResponse<{ goods: Goods[] }>>(`${BASE_URL}/my-goods`, { params: filters }),
    
  getGoodsById: (goodsId: string) =>
    axios.get<ApiResponse<Goods>>(`${BASE_URL}/${goodsId}`),
    
  scanQR: (qrData: string) =>
    axios.post<ApiResponse<ScanQRResponse>>(`${BASE_URL}/scan`, { qrData }),
};
