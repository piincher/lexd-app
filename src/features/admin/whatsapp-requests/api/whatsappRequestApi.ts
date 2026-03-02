import { apiV2 } from "@src/api/client";

const api = apiV2;

// ============================================
// TYPES
// ============================================

export type WhatsAppRequestStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";
export type WhatsAppRequestType = "PACKING_LIST" | "LOADING_LIST" | "TRACKING" | "INVOICE" | "GENERAL";

export interface WhatsAppRequest {
  _id: string;
  requestId: string;
  customerPhone: string;
  customerId?: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
  };
  goodsId?: string;
  containerId?: string;
  requestType: WhatsAppRequestType;
  status: WhatsAppRequestStatus;
  customerMessage?: string;
  requestedAt: string;
  processedAt?: string;
  processedBy?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  pdfUrl?: string;
  pdfMetadata?: {
    fileName: string;
    fileSize: number;
    generatedAt: string;
    expiresAt: string;
  };
  notes?: string;
  searchResults?: {
    goodsFound: Array<{
      goodsId: string;
      description: string;
      status: string;
      containerId?: string;
    }>;
    containersFound: Array<{
      containerId: string;
      virtualContainerNumber: string;
      status: string;
      goodsCount: number;
    }>;
    searchedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateWhatsAppRequestInput {
  customerPhone: string;
  goodsId?: string;
  containerId?: string;
  requestType: WhatsAppRequestType;
  customerMessage?: string;
}

export interface UpdateNotesInput {
  notes: string;
}

export interface GeneratePdfInput {
  includeGoods?: boolean;
  includeContainer?: boolean;
  format?: "PACKING_LIST" | "LOADING_LIST";
}

export interface SearchCustomerInput {
  phoneNumber?: string;
  goodsId?: string;
  containerId?: string;
}

export interface SearchCustomerResponse {
  customerFound: boolean;
  customer?: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
  };
  goods: Array<{
    _id: string;
    goodsId: string;
    description: string;
    actualCBM: number;
    weight: number;
    status: string;
    containerId?: {
      _id: string;
      virtualContainerNumber: string;
    };
  }>;
  containers: Array<{
    _id: string;
    virtualContainerNumber: string;
    shippingLine?: string;
    status: string;
    goodsIds: string[];
  }>;
  totalGoods: number;
  totalContainers: number;
}

export interface WhatsAppRequestFilters {
  status?: WhatsAppRequestStatus;
  requestType?: WhatsAppRequestType;
  customerPhone?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface WhatsAppRequestStats {
  overview: Record<string, {
    total: number;
    byType: Record<string, {
      count: number;
      avgProcessingTimeMs: number;
    }>;
  }>;
  currentQueue: {
    pending: number;
    processing: number;
    total: number;
  };
}

// ============================================
// API FUNCTIONS
// ============================================

const API_URL = "/whatsapp-requests";

export const whatsappRequestApi = {
  /**
   * Create a new WhatsApp request
   */
  createRequest: async (data: CreateWhatsAppRequestInput): Promise<{ request: WhatsAppRequest; customerFound: boolean }> => {
    const response = await api.post<{ data: { request: WhatsAppRequest; customerFound: boolean } }>(API_URL, data);
    return response.data.data;
  },

  /**
   * Get all WhatsApp requests with filters
   */
  getRequests: async (filters?: WhatsAppRequestFilters): Promise<{ requests: WhatsAppRequest[]; pagination: any }> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.requestType) params.append("requestType", filters.requestType);
    if (filters?.customerPhone) params.append("customerPhone", filters.customerPhone);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

    const queryString = params.toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;
    const response = await api.get<{ data: { requests: WhatsAppRequest[]; pagination: any } }>(url);
    return response.data.data;
  },

  /**
   * Get WhatsApp request by ID
   */
  getRequestById: async (id: string): Promise<{ request: WhatsAppRequest; customerData?: any }> => {
    const response = await api.get<{ data: { request: WhatsAppRequest; customerData?: any } }>(`${API_URL}/${id}`);
    return response.data.data;
  },

  /**
   * Mark request as processing
   */
  markProcessing: async (id: string): Promise<WhatsAppRequest> => {
    const response = await api.patch<{ data: { request: WhatsAppRequest } }>(`${API_URL}/${id}/process`);
    return response.data.data.request;
  },

  /**
   * Mark request as completed
   */
  markCompleted: async (id: string, pdfUrl?: string, notes?: string): Promise<WhatsAppRequest> => {
    const response = await api.patch<{ data: { request: WhatsAppRequest } }>(`${API_URL}/${id}/complete`, {
      pdfUrl,
      notes,
    });
    return response.data.data.request;
  },

  /**
   * Generate PDF for packing/loading list
   */
  generatePdf: async (id: string, data?: GeneratePdfInput): Promise<{
    requestId: string;
    pdfContent: string;
    mockPdfUrl: string;
    goodsCount: number;
    containersCount: number;
  }> => {
    const response = await api.post<{ data: {
      requestId: string;
      pdfContent: string;
      mockPdfUrl: string;
      goodsCount: number;
      containersCount: number;
    } }>(`${API_URL}/${id}/generate-pdf`, data);
    return response.data.data;
  },

  /**
   * Search customer by phone/goodsId/containerId
   */
  searchCustomer: async (data: SearchCustomerInput): Promise<SearchCustomerResponse> => {
    const response = await api.post<{ data: SearchCustomerResponse }>(`${API_URL}/search-customer`, data);
    return response.data.data;
  },

  /**
   * Get WhatsApp request statistics
   */
  getStats: async (): Promise<WhatsAppRequestStats> => {
    const response = await api.get<{ data: WhatsAppRequestStats }>(`${API_URL}/stats/overview`);
    return response.data.data;
  },

  /**
   * Add notes to request
   */
  addNotes: async (id: string, notes: string): Promise<WhatsAppRequest> => {
    const response = await api.patch<{ data: { request: WhatsAppRequest } }>(`${API_URL}/${id}/notes`, { notes });
    return response.data.data.request;
  },

  /**
   * Cancel a request
   */
  cancelRequest: async (id: string, reason?: string): Promise<WhatsAppRequest> => {
    const response = await api.patch<{ data: { request: WhatsAppRequest } }>(`${API_URL}/${id}/cancel`, { reason });
    return response.data.data.request;
  },
};
