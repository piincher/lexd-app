/**
 * Goods Service - Business logic layer for goods management
 * Implements Service Pattern for separation of concerns
 */

import { apiClientV2, apiRequest, uploadFile } from '@src/api/client';
import { ApiResponse, PaginatedResponse } from '@src/shared/types/api';
import {
  DuplicateCandidate,
  Goods,
  ReceiveGoodsInput,
  UpdateLocationInput,
  GoodsFilters,
} from '../types';

/**
 * Extended response when backend auto-creates/assigns order
 */
interface ReceiveGoodsResponse extends Goods {
  orderAction?: 'created_new' | 'added_to_existing';
  order?: { _id: string; code: string };
}

type ReactNativeFilePart = {
  uri: string;
  name: string;
  type: string;
};

/**
 * API endpoints for goods
 */
const ENDPOINTS = {
  BASE: '/goods',
  SUMMARY: '/goods/summary',
  BY_ID: (id: string) => `/goods/${id}`,
  HARD_DELETE: (id: string) => `/goods/${id}/hard`,
  BY_CLIENT: (clientId: string) => `/goods/client/${clientId}`,
  DUPLICATE_CANDIDATES: '/goods/duplicate-candidates',
  LOCATION: (id: string) => `/goods/${id}/location`,
  PHOTO: (id: string) => `/goods/${id}/photo`,
  ASSIGN: (containerId: string) => `/containers/${containerId}/assign-goods`,
  REMOVE_FROM_CONTAINER: (containerId: string, goodsId: string) =>
    `/containers/${containerId}/goods/${goodsId}`,
  ASSIGN_CLIENT: (id: string) => `/goods/${id}/assign-client`,
  BATCH: '/goods/batch',
  RESEND_NOTIFICATION: (id: string) => `/goods/${id}/resend-notification`,
} as const;

/**
 * Aggregated totals for the current filter set — what the goods list stats
 * bottom sheet displays. Mirrors the backend's getGoodsSummary response shape.
 */
export interface GoodsStatusBucket {
  status: string;
  count: number;
  totalWeight: number;
  totalCBM: number;
}

export interface GoodsSummary {
  count: number;
  totalWeight: number; // kg, rounded to 2 decimals
  totalCBM: number;    // m³, rounded to 3 decimals
  /** Per-status breakdown (ignores the status filter so every bucket shows). */
  byStatus?: GoodsStatusBucket[];
}

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
   * Get aggregated totals (count / weight / CBM) for the current filter set.
   * Same filter shape as getAll — pass whatever's on screen and the backend
   * returns totals across ALL matching goods, not just the current page.
   */
  async getSummary(filters?: GoodsFilters): Promise<ApiResponse<GoodsSummary>> {
    return apiRequest.get(this.client, ENDPOINTS.SUMMARY, { params: filters });
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

  async getDuplicateCandidates(filters: {
    tracking?: string;
    clientId?: string;
    weight?: number;
    description?: string;
  }): Promise<ApiResponse<{ candidates: DuplicateCandidate[] }>> {
    return apiRequest.get(this.client, ENDPOINTS.DUPLICATE_CANDIDATES, {
      params: filters,
    });
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
    } as ReactNativeFilePart as unknown as Blob);

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
    if (permanent) {
      return apiRequest.delete(this.client, ENDPOINTS.HARD_DELETE(id));
    }

    return apiRequest.delete(this.client, ENDPOINTS.BY_ID(id), {
      params: {},
    });
  }

  /**
   * Bulk hard delete — permanently removes the goods and pulls their references from
   * containers, airway bills, cargo bags, orders, invoices, and payments. Affected orders
   * are resynced server-side. Capped at 500 IDs per call (backend enforces).
   */
  async batchHardDelete(
    goodsIds: string[],
    reason?: string,
  ): Promise<ApiResponse<{
    deletedCount: number;
    requestedCount: number;
    cleanup: {
      containers: number;
      airwayBills: number;
      cargoBags: number;
      orders: number;
      invoices: number;
      payments: number;
    };
    syncReport: unknown;
  }>> {
    return apiRequest.delete(this.client, ENDPOINTS.BATCH, {
      data: { goodsIds, reason },
    });
  }

  /**
   * Re-trigger the customer "goods received" notifications (push + WhatsApp + in-app +
   * public feed) for an existing goods. Used when the original dispatch reported FAILED.
   * Backend awaits the dispatch and returns the per-channel status so the UI can show
   * "WhatsApp envoyé" or the specific failure reason.
   */
  async resendNotification(id: string): Promise<ApiResponse<{
    goodsId: string;
    recipient: string | null;
    notification: {
      attempted: boolean;
      whatsapp?: { status: 'SENT' | 'FAILED' | 'SKIPPED'; reason?: string };
      push?: { status: 'SENT' | 'FAILED' | 'SKIPPED'; reason?: string };
      publicFeed?: { status: 'SENT' | 'FAILED' | 'SKIPPED'; reason?: string };
    };
  }>> {
    return apiRequest.post(this.client, ENDPOINTS.RESEND_NOTIFICATION(id), {});
  }

  // ============================================
  // CONTAINER OPERATIONS
  // ============================================

  /**
   * Assign goods to container
   */
  async assignToContainer(
    containerId: string,
    goodsIds: string[],
    isCorrection = false
  ): Promise<ApiResponse<void>> {
    return apiRequest.post(this.client, ENDPOINTS.ASSIGN(containerId), {
      goodsIds,
      isCorrection,
    });
  }

  /**
   * Remove a single good from its container (unassign). Works at any status.
   */
  async removeFromContainer(
    containerId: string,
    goodsId: string
  ): Promise<ApiResponse<void>> {
    return apiRequest.delete(this.client, ENDPOINTS.REMOVE_FROM_CONTAINER(containerId, goodsId));
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

  /**
   * Assign a client to previously-unidentified goods.
   * The backend updates the goods, links/creates an order, and fires the customer
   * "arrived at warehouse" notification that was skipped at intake.
   */
  async assignClient(
    id: string,
    input: { clientId: string; notes?: string },
  ): Promise<ApiResponse<Goods>> {
    return apiRequest.patch(this.client, ENDPOINTS.ASSIGN_CLIENT(id), {
      clientId: input.clientId,
      notes: input.notes,
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
    if (data.clientId) {
      formData.append('clientId', data.clientId);
    }
    formData.append('description', data.description || '');
    formData.append('shippingMode', data.shippingMode || 'SEA');
    formData.append('actualCBM', data.actualCBM?.toString() || '0');
    if (Number.isFinite(data.weight)) {
      formData.append('weight', String(data.weight));
    }
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

    if (data.condition) {
      formData.append('condition', data.condition);
    }

    if (data.exceptionReasons?.length) {
      formData.append('exceptionReasons', JSON.stringify(data.exceptionReasons));
    }

    if (data.exceptionNotes) {
      formData.append('exceptionNotes', data.exceptionNotes);
    }

    // Add dimensions if present
    if (data.dimensions) {
      formData.append('dimensions', JSON.stringify(data.dimensions));
    }

    // Idempotency key — backend short-circuits a retry within 30 min and returns the
    // already-saved goods, preventing the "same parcel registered twice" bug.
    if (data.idempotencyKey) {
      formData.append('idempotencyKey', data.idempotencyKey);
    }

    // Per-receipt WhatsApp opt-out. Only append when the operator explicitly toggled
    // it off — undefined / true means "default behavior, send the notification".
    // Multipart bodies stringify booleans; backend parses 'false' as false.
    if (data.notifyWhatsapp === false) {
      formData.append('notifyWhatsapp', 'false');
    }

    // Photo provenance for the watermark/attestation audit trail.
    if (data.source) {
      formData.append('source', data.source);
    }
    if (data.capturedAt) {
      formData.append('capturedAt', data.capturedAt);
    }

    // Add photos
    photoUris.forEach((uri, index) => {
      formData.append('photos', {
        uri,
        name: `goods_${Date.now()}_${index}.jpg`,
        type: 'image/jpeg',
      } as ReactNativeFilePart as unknown as Blob);
    });

    return formData;
  }
}

// Export singleton instance
export const goodsService = GoodsService.getInstance();
