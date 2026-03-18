import { apiClient } from "@src/api/client";
import {
  ConvertPrebookingRequest,
  ConvertPrebookingResponse,
} from "../types/manualOrder.types";

/**
 * Convert a pre-booking to a regular order
 * POST /order/{orderId}/convert-prebooking
 */
export const convertPrebooking = async ({
  orderId,
}: ConvertPrebookingRequest): Promise<ConvertPrebookingResponse> => {
  const response = await apiClient.post<ConvertPrebookingResponse>(
    `/order/${orderId}/convert-prebooking`
  );
  return response.data;
};
