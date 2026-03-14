import { apiV2 } from '@src/api/client';
import { ReceiveGoodsInput, UpdateLocationInput, Goods } from './types';
// Import from local types to avoid cross-feature import (prevents circular dependency)
import { GoodsFilters } from './types';
import { AxiosResponse } from 'axios';

const axios = apiV2;
const BASE_URL = '/goods';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const adminGoodsApi = {
  getAll: (filters?: GoodsFilters): Promise<AxiosResponse<ApiResponse<Goods[]>>> =>
    axios.get(BASE_URL, { params: filters }),
    
  getById: (id: string): Promise<AxiosResponse<ApiResponse<Goods>>> =>
    axios.get(`${BASE_URL}/${id}`),
    
  getByClient: (clientId: string): Promise<AxiosResponse<ApiResponse<Goods[]>>> =>
    axios.get(`${BASE_URL}/client/${clientId}`),
    
  receive: (data: ReceiveGoodsInput): Promise<AxiosResponse<ApiResponse<Goods>>> =>
    axios.post(BASE_URL, data),
    
  receiveWithPhoto: (data: FormData): Promise<AxiosResponse<ApiResponse<Goods>>> =>
    axios.post(BASE_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    
  updateLocation: (id: string, data: UpdateLocationInput): Promise<AxiosResponse<ApiResponse<Goods>>> =>
    axios.patch(`${BASE_URL}/${id}/location`, data),
    
  updatePhoto: (id: string, photoUrl: string): Promise<AxiosResponse<ApiResponse<{url: string}>>> =>
    axios.patch(`${BASE_URL}/${id}/photo`, { photoUrl }),
    
  delete: (id: string): Promise<AxiosResponse<ApiResponse<void>>> =>
    axios.delete(`${BASE_URL}/${id}`),
    
  assignToContainer: (containerId: string, goodsIds: string[]): Promise<AxiosResponse<ApiResponse<void>>> =>
    axios.post(`/containers/${containerId}/assign-goods`, { goodsIds }),
};
