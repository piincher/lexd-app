import { useQuery } from "@tanstack/react-query";
import {
  getManualOrders,
  GetManualOrdersParams,
  GetManualOrdersResponse,
} from "../api/getManualOrders";

interface UseManualOrdersOptions extends GetManualOrdersParams {
  enabled?: boolean;
}

/**
 * Hook to fetch manual orders (for selection UI)
 * Query key: ["manualOrders", status, search, page, limit]
 */
export const useManualOrders = (options: UseManualOrdersOptions = {}) => {
  const { status, search, page = 1, limit = 20, enabled = true } = options;

  return useQuery<GetManualOrdersResponse, Error>({
    queryKey: ["manualOrders", status, search, page, limit],
    queryFn: () =>
      getManualOrders({
        status,
        search,
        page,
        limit,
      }),
    enabled,
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook to fetch only AWAITING_GOODS orders (for goods assignment)
 */
export const useAwaitingGoodsOrders = (search?: string) => {
  return useManualOrders({
    status: "AWAITING_GOODS",
    search,
    enabled: true,
  });
};
