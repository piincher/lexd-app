/**
 * Goods Service - Business logic layer for goods management
 * Implements Service Pattern for separation of concerns
 */

import { apiClientV2, apiRequest, uploadFile } from '@src/api/client';
import { ApiResponse, PaginatedResponse } from '@src/shared/types/api';
import { Goods, ReceiveGoodsInput, UpdateLocationInput, GoodsFilters } from '../types';

/**
 * Extended response when backend auto-creates/assigns order
 */
interface ReceiveGoodsResponse extends Goods {
  orderAction?: 'created_new' | 'added_to_existing';
  order?: { _id: string; code: string };
}

/**
 * API endpoints for goods
 */
const ENDPOINTS = {
  BASE: '/goods',
  BY_ID: (id: string) => `/goods/${id}`,
  BY_CLIENT: (clientId: string) => `/goods/client/${clientId}`,
  LOCATION: (id: string) => `/goods/${id}/location`,
  PHOTO: (id: string) => `/goods/${id}/photo`,
  ASSIGN: (containerId: string) => `/containers/${containerId}/assign-goods`,
} as const;

/**
 * Goods Service
 * Handles all API interactions for goods management
 */
export class GoodsService {
  private static instance: GoodsService;
  private readonly client = apiClientV2;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): GoodsService {
    if (!GoodsService.instance) {
      GoodsService.instance = new GoodsService();
    }
    return GoodsService.instance;
  }

  // ============================================
  // READ OPERATIONS
  // ============================================

  /**
   * Get all goods with optional filters
   */
  async getAll(filters?: GoodsFilters): Promise<ApiResponse<PaginatedResponse<Goods>>> {
    return apiRequest.get(this.client, ENDPOINTS.BASE, { params: filters });
  }

  /**
   * Get goods by ID
   */
  async getById(id: string): Promise<ApiResponse<Goods>> {
    return apiRequest.get(this.client, ENDPOINTS.BY_ID(id));
  }

  /**
   * Get goods by client ID
   */
  async getByClient(clientId: string): Promise<ApiResponse<Goods[]>> {
    return apiRequest.get(this.client, ENDPOINTS.BY_CLIENT(clientId));
  }

  // ============================================
  // WRITE OPERATIONS
  // ============================================

  /**
   * Receive new goods (without photo)
   */
  async receive(data: ReceiveGoodsInput): Promise<ApiResponse<ReceiveGoodsResponse>> {
    return apiRequest.post(this.client, ENDPOINTS.BASE, data);
  }

  /**
   * Receive new goods with photo upload (multiple photos supported)
   */
  async receiveWithPhoto(
    data: ReceiveGoodsInput,
    photoUris: string[],
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<ReceiveGoodsResponse>> {
    const formData = this.createGoodsFormData(data, photoUris);
    
    return uploadFile<Goods>(
      this.client,
      ENDPOINTS.BASE,
      formData,
      onProgress
    );
  }

  /**
   * Update goods location
   */
  async updateLocation(
    id: string,
    location: string
  ): Promise<ApiResponse<Goods>> {
    const data: UpdateLocationInput = { location };
    return apiRequest.patch(this.client, ENDPOINTS.LOCATION(id), data);
  }

  /**
   * Update goods photo
   */
  async updatePhoto(
    id: string,
    photoUri: string,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      name: `goods_${Date.now()}.jpg`,
      type: 'image/jpeg',
    } as any);

    return uploadFile<{ url: string }>(
      this.client,
      ENDPOINTS.PHOTO(id),
      formData,
      onProgress
    );
  }

  /**
   * Delete goods
   */
  async delete(id: string, permanent = false): Promise<ApiResponse<void>> {
    return apiRequest.delete(this.client, ENDPOINTS.BY_ID(id), {
      params: { permanent: permanent ? 'true' : undefined },
    });
  }

  // ============================================
  // CONTAINER OPERATIONS
  // ============================================

  /**
   * Assign goods to container
   */
  async assignToContainer(
    containerId: string,
    goodsIds: string[]
  ): Promise<ApiResponse<void>> {
    return apiRequest.post(this.client, ENDPOINTS.ASSIGN(containerId), {
      goodsIds,
    });
  }

  /**
   * Update goods status
   */
  async updateStatus(
    id: string,
    status: string
  ): Promise<ApiResponse<Goods>> {
    return apiRequest.patch(this.client, `${ENDPOINTS.BY_ID(id)}/status`, {
      status,
    });
  }

  // ============================================
  // PRIVATE HELPERS
  // ============================================

  /**
   * Create FormData for goods with photos
   */
  private createGoodsFormData(
    data: ReceiveGoodsInput,
    photoUris: string[]
  ): FormData {
    const formData = new FormData();

    // Add basic fields
    formData.append('clientId', data.clientId);
    formData.append('description', data.description || '');
    formData.append('shippingMode', data.shippingMode || 'SEA');
    formData.append('actualCBM', data.actualCBM?.toString() || '0');
    formData.append('weight', data.weight.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('unitPrice', data.unitPrice.toString());
    formData.append('location', data.location);

    // Add receivedByName if present
    if (data.receivedByName) {
      formData.append('receivedByName', data.receivedByName);
    }

    // Add expressTrackingNumber if present
    if (data.expressTrackingNumber) {
      formData.append('expressTrackingNumber', data.expressTrackingNumber);
    }

    // Add receivedDate if present
    if (data.receivedDate) {
      formData.append('receivedDate', data.receivedDate);
    }

    // Add dimensions if present
    if (data.dimensions) {
      formData.append('dimensions', JSON.stringify(data.dimensions));
    }

    // Add photos
    photoUris.forEach((uri, index) => {
      formData.append('photos', {
        uri,
        name: `goods_${Date.now()}_${index}.jpg`,
        type: 'image/jpeg',
      } as any);
    });

    return formData;
  }
}

// Export singleton instance
export const goodsService = GoodsService.getInstance();
