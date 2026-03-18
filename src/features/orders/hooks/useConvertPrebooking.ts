import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertPrebooking } from "../api/convertPrebooking";
import {
  ConvertPrebookingRequest,
  ConvertPrebookingResponse,
} from "../types/manualOrder.types";

interface UseConvertPrebookingOptions {
  onSuccess?: (data: ConvertPrebookingResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to convert a pre-booking to a regular order
 * Optimistic updates: Invalidates orders list and specific order cache on success
 */
export const useConvertPrebooking = (options?: UseConvertPrebookingOptions) => {
  const queryClient = useQueryClient();

  return useMutation<ConvertPrebookingResponse, Error, ConvertPrebookingRequest>({
    mutationFn: convertPrebooking,
    onSuccess: (data) => {
      // Invalidate orders lists to refresh
      queryClient.invalidateQueries({ queryKey: ["manualOrders"] });
      // Invalidate specific order detail
      queryClient.invalidateQueries({ queryKey: ["order", data.order._id] });

      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("[useConvertPrebooking] Error:", error);
      options?.onError?.(error);
    },
  });
};
