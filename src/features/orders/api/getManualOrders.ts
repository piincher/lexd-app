import { apiClient } from "@src/api/client";

export interface GetManualOrdersParams {
  status?: "PREBOOKING" | "AWAITING_GOODS" | "LINKED" | "CONVERTED";
  search?: string;
  page?: number;
  limit?: number;
  startDate?: string; // ISO date string
  endDate?: string;
  minCbm?: number;
  maxCbm?: number;
  clientId?: string;
  sortBy?: "createdAt" | "clientName" | "estimatedCbm" | "calculatedCBM";
  sortOrder?: "asc" | "desc";
}

export interface GetManualOrdersResponse {
  orders: Array<{
    _id: string;
    code: string;
    clientName: string;
    clientPhone?: string;
    status: string;
    manualOrderStatus: "PREBOOKING" | "AWAITING_GOODS" | "LINKED";
    estimatedCbm: number;
    shippingMode: "air" | "sea";
    createdAt: string;
    calculatedCBM: number;
    calculatedTotal: number;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/**
 * Get manual orders (for selection UI)
 * GET /order/manual?status=&search=&page=&limit=
 */
export const getManualOrders = async (
  params: GetManualOrdersParams = {}
): Promise<GetManualOrdersResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.status) queryParams.append("status", params.status);
  if (params.search) queryParams.append("search", params.search);
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.startDate) queryParams.append("startDate", params.startDate);
  if (params.endDate) queryParams.append("endDate", params.endDate);
  if (params.minCbm !== undefined) queryParams.append("minCbm", params.minCbm.toString());
  if (params.maxCbm !== undefined) queryParams.append("maxCbm", params.maxCbm.toString());
  if (params.clientId) queryParams.append("clientId", params.clientId);
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

  const queryString = queryParams.toString();
  const url = `/order/manual${queryString ? `?${queryString}` : ""}`;

  const response = await apiClient.get<GetManualOrdersResponse>(url);
  return response.data;
};
