import { apiClient } from "@src/api/client";
import {
  CreateManualOrderRequest,
  CreateManualOrderResponse,
} from "../types/manualOrder.types";

/**
 * Create a manual order (admin only)
 * POST /order/manual
 */
export const createManualOrder = async (
  data: CreateManualOrderRequest
): Promise<CreateManualOrderResponse> => {
  const response = await apiClient.post<CreateManualOrderResponse>(
    "/order/manual",
    data
  );
  return response.data;
};
