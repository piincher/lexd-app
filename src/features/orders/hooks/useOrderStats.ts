import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@src/api/client";

export interface OrderStatsFilters {
  startDate?: string;
  endDate?: string;
  shippingMode?: "air" | "sea" | "all";
}

export interface OrderStats {
  overview: {
    totalOrders: number;
    manualOrders: number;
    autoOrders: number;
    manualOrdersPercentage: number;
  };
  manualOrderBreakdown: {
    prebooking: number;
    awaitingGoods: number;
    linked: number;
    cancelled: number;
  };
  cbmStats: {
    totalEstimatedCbm: number;
    totalActualCbm: number;
    difference: number;
  };
  recentManualOrders: Array<{
    _id: string;
    code: string;
    clientName: string;
    manualOrderStatus: string;
    createdAt: string;
  }>;
}

const getOrderStats = async (filters: OrderStatsFilters): Promise<OrderStats> => {
  const params = new URLSearchParams();
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.shippingMode && filters.shippingMode !== "all") {
    params.append("shippingMode", filters.shippingMode);
  }

  const queryString = params.toString();
  const url = `/order/stats${queryString ? `?${queryString}` : ""}`;

  const response = await apiClient.get<OrderStats>(url);
  return response.data;
};

export const useOrderStats = (filters: OrderStatsFilters = {}) => {
  return useQuery<OrderStats, Error>({
    queryKey: ["orderStats", filters],
    queryFn: () => getOrderStats(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
