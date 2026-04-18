/**
 * Search API - API functions for global search and filtering
 */

import { apiClientV2 } from "@src/api/client";

// Types
export interface SearchFilters {
  status?: string | string[];
  paymentStatus?: string | string[];
  dateFrom?: string;
  dateTo?: string;
  clientId?: string;
  containerId?: string;
  minCBM?: number;
  maxCBM?: number;
  warehouseLocation?: string;
  shippingMode?: string;
  shippingLine?: string;
  routeId?: string;
  consigneeId?: string;
  hasAvailableSpace?: boolean;
  role?: string | string[];
  isActive?: boolean;
  hasBalance?: boolean;
  staffType?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  stats?: Record<string, any>;
  meta: {
    query: string | null;
    filters: SearchFilters;
    timestamp: string;
  };
}

export interface GlobalSearchResult {
  query: string;
  results: {
    goods: Array<any & { _matches: Array<{ field: string; value: string }> }>;
    containers: Array<any & { _matches: Array<{ field: string; value: string }> }>;
    clients: Array<any & { _matches: Array<{ field: string; value: string }> }>;
    consignees: Array<any & { _matches: Array<{ field: string; value: string }> }>;
  };
  totals: {
    goods: number;
    containers: number;
    clients: number;
    consignees: number;
    all: number;
  };
}

export interface SearchSuggestion {
  id: string;
  title: string;
  subtitle: string;
  status?: string;
  role?: string;
  type: "goods" | "container" | "client";
}

export interface SuggestionsResponse {
  query: string;
  suggestions: {
    goods: SearchSuggestion[];
    containers: SearchSuggestion[];
    clients: SearchSuggestion[];
  };
}

export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  entity: "goods" | "containers" | "clients";
  filters: SearchFilters;
  icon: string;
}

// API Functions

/**
 * Search goods with filters
 */
export const searchGoods = async (
  query: string,
  filters: SearchFilters = {},
  pagination: PaginationParams = {}
): Promise<SearchResponse<any>> => {
  const params = new URLSearchParams();
  
  if (query) params.append("q", query);
  if (filters.status) {
    const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
    params.append("status", statuses.join(","));
  }
  if (filters.paymentStatus) {
    const statuses = Array.isArray(filters.paymentStatus) ? filters.paymentStatus : [filters.paymentStatus];
    params.append("paymentStatus", statuses.join(","));
  }
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (filters.clientId) params.append("clientId", filters.clientId);
  if (filters.containerId) params.append("containerId", filters.containerId);
  if (filters.minCBM) params.append("minCBM", filters.minCBM.toString());
  if (filters.maxCBM) params.append("maxCBM", filters.maxCBM.toString());
  if (filters.warehouseLocation) params.append("warehouseLocation", filters.warehouseLocation);
  if (pagination.page) params.append("page", pagination.page.toString());
  if (pagination.limit) params.append("limit", pagination.limit.toString());
  if (pagination.sortBy) params.append("sortBy", pagination.sortBy);
  if (pagination.sortOrder) params.append("sortOrder", pagination.sortOrder);

  const response = await apiClientV2.get(`/search/goods?${params.toString()}`);
  return response.data;
};

/**
 * Search containers with filters
 */
export const searchContainers = async (
  query: string,
  filters: SearchFilters = {},
  pagination: PaginationParams = {}
): Promise<SearchResponse<any>> => {
  const params = new URLSearchParams();
  
  if (query) params.append("q", query);
  if (filters.status) {
    const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
    params.append("status", statuses.join(","));
  }
  if (filters.shippingMode) params.append("shippingMode", filters.shippingMode);
  if (filters.shippingLine) params.append("shippingLine", filters.shippingLine);
  if (filters.routeId) params.append("routeId", filters.routeId);
  if (filters.consigneeId) params.append("consigneeId", filters.consigneeId);
  if (filters.hasAvailableSpace) params.append("hasAvailableSpace", "true");
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (pagination.page) params.append("page", pagination.page.toString());
  if (pagination.limit) params.append("limit", pagination.limit.toString());
  if (pagination.sortBy) params.append("sortBy", pagination.sortBy);
  if (pagination.sortOrder) params.append("sortOrder", pagination.sortOrder);

  const response = await apiClientV2.get(`/search/containers?${params.toString()}`);
  return response.data;
};

/**
 * Search clients with filters
 */
export const searchClients = async (
  query: string,
  filters: SearchFilters = {},
  pagination: PaginationParams = {}
): Promise<SearchResponse<any>> => {
  const params = new URLSearchParams();
  
  if (query) params.append("q", query);
  if (filters.role) {
    const roles = Array.isArray(filters.role) ? filters.role : [filters.role];
    params.append("role", roles.join(","));
  }
  if (filters.isActive !== undefined) params.append("isActive", filters.isActive.toString());
  if (filters.hasBalance) params.append("hasBalance", "true");
  if (filters.staffType) params.append("staffType", filters.staffType);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (pagination.page) params.append("page", pagination.page.toString());
  if (pagination.limit) params.append("limit", pagination.limit.toString());
  if (pagination.sortBy) params.append("sortBy", pagination.sortBy);
  if (pagination.sortOrder) params.append("sortOrder", pagination.sortOrder);

  const response = await apiClientV2.get(`/search/clients?${params.toString()}`);
  return response.data;
};

/**
 * Global search across all entities
 */
export const globalSearch = async (
  query: string,
  limit: number = 10
): Promise<GlobalSearchResult> => {
  const params = new URLSearchParams();
  params.append("q", query);
  params.append("limit", limit.toString());

  const response = await apiClientV2.get(`/search/global?${params.toString()}`);
  return response.data;
};

/**
 * Get search suggestions for autocomplete
 */
export const getSearchSuggestions = async (
  query: string,
  limit: number = 5
): Promise<SuggestionsResponse> => {
  const params = new URLSearchParams();
  params.append("q", query);
  params.append("limit", limit.toString());

  const response = await apiClientV2.get(`/search/suggestions?${params.toString()}`);
  return response.data;
};

/**
 * Get filter presets
 */
export const getFilterPresets = async (): Promise<FilterPreset[]> => {
  const response = await apiClientV2.get("/search/presets");
  return response.data.data;
};

/**
 * Get search stats/analytics
 */
export const getSearchStats = async (days: number = 30): Promise<any> => {
  const params = new URLSearchParams();
  params.append("days", days.toString());

  const response = await apiClientV2.get(`/search/stats?${params.toString()}`);
  return response.data.data;
};
