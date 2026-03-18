/**
 * Container Service - Business logic layer for container management
 * Phase 3: Container System with Route Integration
 */

import { apiClientV2, apiRequest } from '@src/api/client';
import { ApiResponse, PaginatedResponse } from '@src/api/types';
import { 
  Container, 
  CreateContainerInput, 
  UpdateContainerStatusInput,
  AssignGoodsInput,
  ContainerFilters,
  PackingList,
  Route,
  RouteFilters,
} from '../types';

const BASE_URL = '/containers';
const ROUTES_URL = '/routes';

/**
 * Container Service
 * Handles all API interactions for container management and routes
 */
export class ContainerService {
  private static instance: ContainerService;
  private readonly client = apiClientV2;

  private constructor() {}

  static getInstance(): ContainerService {
    if (!ContainerService.instance) {
      ContainerService.instance = new ContainerService();
    }
    return ContainerService.instance;
  }

  // ============================================
  // ROUTE OPERATIONS (Phase 3)
  // ============================================

  /**
   * Get active routes filtered by shipping mode
   */
  async getActiveRoutesByMode(mode: string): Promise<ApiResponse<Route[]>> {
    return apiRequest.get(this.client, ROUTES_URL, { 
      params: { 
        shippingMode: mode,
        isActive: true 
      } 
    });
  }

  /**
   * Get all active routes
   */
  async getActiveRoutes(filters?: RouteFilters): Promise<ApiResponse<Route[]>> {
    return apiRequest.get(this.client, ROUTES_URL, { 
      params: { 
        isActive: true,
        ...filters 
      } 
    });
  }

  // ============================================
  // READ OPERATIONS
  // ============================================

  async getAll(filters?: ContainerFilters): Promise<ApiResponse<Container[]>> {
    return apiRequest.get(this.client, BASE_URL, { params: filters });
  }

  async getById(id: string): Promise<ApiResponse<Container>> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}`);
  }

  async getByStatus(status: string): Promise<ApiResponse<Container[]>> {
    return apiRequest.get(this.client, `${BASE_URL}/status/${status}`);
  }

  async getReadyForDeparture(): Promise<ApiResponse<Container[]>> {
    return apiRequest.get(this.client, `${BASE_URL}/ready-for-departure`);
  }

  // ============================================
  // WRITE OPERATIONS
  // ============================================

  async create(data: CreateContainerInput): Promise<ApiResponse<Container>> {
    return apiRequest.post(this.client, BASE_URL, data);
  }

  async updateStatus(
    id: string, 
    data: UpdateContainerStatusInput
  ): Promise<ApiResponse<Container>> {
    return apiRequest.patch(this.client, `${BASE_URL}/${id}/status`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}`);
  }

  // ============================================
  // GOODS ASSIGNMENT
  // ============================================

  async assignGoods(
    containerId: string, 
    data: AssignGoodsInput
  ): Promise<ApiResponse<Container>> {
    return apiRequest.post(
      this.client, 
      `${BASE_URL}/${containerId}/assign-goods`, 
      data
    );
  }

  async removeGoods(
    containerId: string, 
    goodsId: string
  ): Promise<ApiResponse<Container>> {
    return apiRequest.delete(
      this.client, 
      `${BASE_URL}/${containerId}/goods/${goodsId}`
    );
  }

  // ============================================
  // PICKUP WORKFLOW (Phase 3)
  // ============================================

  async markReadyForPickup(containerId: string): Promise<ApiResponse<Container>> {
    return apiRequest.post(this.client, `${BASE_URL}/${containerId}/ready-for-pickup`, {});
  }

  async markGoodsDelivered(goodsId: string): Promise<ApiResponse<void>> {
    return apiRequest.post(this.client, `/goods/${goodsId}/deliver`, {});
  }

  // ============================================
  // PACKING LIST
  // ============================================

  async generatePackingList(containerId: string): Promise<ApiResponse<PackingList>> {
    return apiRequest.get(this.client, `${BASE_URL}/${containerId}/packing-list/admin`);
  }

  async downloadPackingListPDF(containerId: string): Promise<Blob> {
    const response = await this.client.get(
      `${BASE_URL}/${containerId}/packing-list/pdf`,
      { responseType: 'blob' }
    );
    return response.data;
  }

  // ============================================
  // UNASSIGNED GOODS (for assignment UI)
  // ============================================

  async getUnassignedGoods(): Promise<ApiResponse<any[]>> {
    return apiRequest.get(this.client, '/goods/unassigned');
  }
}

export const containerService = ContainerService.getInstance();
