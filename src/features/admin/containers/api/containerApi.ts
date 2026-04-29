/**
 * Admin Container API
 * API endpoints for admin container management
 */

import { apiV2 } from '@src/api/client';
import { AxiosResponse } from 'axios';
import {
  Container,
  CreateContainerInput,
  UpdateContainerStatusInput,
  AssignGoodsInput,
  ContainerFilters,
  Route,
  PackingList,
} from './types';

const axios = apiV2;
const BASE_URL = '/containers';
const ROUTES_URL = '/routes';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * Admin Container API client
 */
export const containerApi = {
  // ============================================
  // ROUTE OPERATIONS
  // ============================================
  getActiveRoutesByMode: (mode: string): Promise<AxiosResponse<ApiResponse<{ routes: Route[] }>>> =>
    axios.get(ROUTES_URL, { params: { shippingMode: mode, isActive: true } }),

  getActiveRoutes: (filters?: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<{ routes: Route[] }>>> =>
    axios.get(ROUTES_URL, { params: { isActive: true, ...filters } }),

  // ============================================
  // READ OPERATIONS
  // ============================================
  getAll: (filters?: ContainerFilters): Promise<AxiosResponse<ApiResponse<Container[]>>> =>
    axios.get(BASE_URL, { params: filters }),

  getById: (id: string): Promise<AxiosResponse<ApiResponse<Container>>> =>
    axios.get(`${BASE_URL}/${id}`),

  getByStatus: (status: string): Promise<AxiosResponse<ApiResponse<Container[]>>> =>
    axios.get(`${BASE_URL}/status/${status}`),

  getReadyForDeparture: (): Promise<AxiosResponse<ApiResponse<Container[]>>> =>
    axios.get(`${BASE_URL}/ready-for-departure`),

  // ============================================
  // WRITE OPERATIONS
  // ============================================
  create: (data: CreateContainerInput): Promise<AxiosResponse<ApiResponse<Container>>> =>
    axios.post(BASE_URL, data),

  updateStatus: (id: string, data: UpdateContainerStatusInput): Promise<AxiosResponse<ApiResponse<Container>>> =>
    axios.patch(`${BASE_URL}/${id}/status`, data),

  delete: (id: string): Promise<AxiosResponse<ApiResponse<void>>> =>
    axios.delete(`${BASE_URL}/${id}`),

  // ============================================
  // GOODS ASSIGNMENT
  // ============================================
  assignGoods: (containerId: string, data: AssignGoodsInput): Promise<AxiosResponse<ApiResponse<Container>>> =>
    axios.post(`${BASE_URL}/${containerId}/assign-goods`, data),

  removeGoods: (containerId: string, goodsId: string): Promise<AxiosResponse<ApiResponse<Container>>> =>
    axios.delete(`${BASE_URL}/${containerId}/goods/${goodsId}`),

  // ============================================
  // PICKUP WORKFLOW
  // ============================================
  markReadyForPickup: (containerId: string): Promise<AxiosResponse<ApiResponse<Container>>> =>
    axios.post(`${BASE_URL}/${containerId}/ready-for-pickup`, {}),

  markGoodsDelivered: (goodsId: string): Promise<AxiosResponse<ApiResponse<void>>> =>
    axios.post(`/goods/${goodsId}/deliver`, {}),

  // ============================================
  // PACKING LIST
  // ============================================
  generatePackingList: (containerId: string): Promise<AxiosResponse<ApiResponse<PackingList>>> =>
    axios.get(`${BASE_URL}/${containerId}/packing-list/admin`),

  downloadPackingListPDF: (containerId: string): Promise<AxiosResponse<Blob>> =>
    axios.get(`${BASE_URL}/${containerId}/packing-list/pdf`, { responseType: 'blob' }),

  // ============================================
  // UNASSIGNED GOODS
  // ============================================
  getUnassignedGoods: (shippingMode?: string): Promise<AxiosResponse<ApiResponse<any[]>>> =>
    axios.get(`/goods/unassigned${shippingMode ? `?shippingMode=${shippingMode}` : ''}`),

  // ============================================
  // RECONCILIATION
  // ============================================
  reconcileContainer: (containerId: string, agentCBM: number, agentUnitCost?: number): Promise<AxiosResponse<ApiResponse<any>>> =>
    axios.post(`${BASE_URL}/${containerId}/reconcile`, {
      agentCBM,
      ...(agentUnitCost ? { agentUnitCost } : {}),
    }),

  getClientAllocations: (containerId: string): Promise<AxiosResponse<ApiResponse<any>>> =>
    axios.get(`${BASE_URL}/${containerId}/client-allocations`),
};
