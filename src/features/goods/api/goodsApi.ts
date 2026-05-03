import { apiV2 } from '@src/api/client';

const axios = apiV2;
import { Goods, GoodsFilters, ApiResponse, ScanQRResponse, UpdateGoodsInput } from './types';

const BASE_URL = '/goods';

export const goodsApi = {
  getMyGoods: (filters?: GoodsFilters) =>
    axios.get<ApiResponse<{ goods: Goods[] }>>(`${BASE_URL}/my-goods`, { params: filters }),
    
  getGoodsById: (goodsId: string) =>
    axios.get<ApiResponse<{ goods: Goods }>>(`${BASE_URL}/${goodsId}`),
    
  scanQR: (qrData: string) =>
    axios.post<ApiResponse<ScanQRResponse>>(`${BASE_URL}/scan`, { qrData }),

  updateGoods: (goodsId: string, data: UpdateGoodsInput) => {
    // If new photos are provided, send as multipart/form-data
    if (data.newPhotoUris && data.newPhotoUris.length > 0) {
      const formData = new FormData();
      
      // Append regular fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'newPhotoUris') return;
        if (key === 'photosToKeep' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
          return;
        }
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      // Append new photo files
      data.newPhotoUris.forEach((uri, index) => {
        const filename = uri.split('/').pop() || `photo_${index}.jpg`;
        formData.append('photos', {
          uri,
          name: filename,
          type: 'image/jpeg',
        } as any);
      });
      
      return axios.patch<ApiResponse<Goods>>(`${BASE_URL}/${goodsId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    
    // Regular JSON update (no new photos)
    return axios.patch<ApiResponse<Goods>>(`${BASE_URL}/${goodsId}`, data);
  },
};
