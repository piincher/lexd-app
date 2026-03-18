import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createManualOrder } from "../api/createManualOrder";
import { 
  CreateManualOrderRequest, 
  CreateManualOrderResponse 
} from "../types/manualOrder.types";

interface UseCreateManualOrderOptions {
  onSuccess?: (data: CreateManualOrderResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to create a manual order
 * Optimistic updates: Invalidates orders list cache on success
 */
export const useCreateManualOrder = (options?: UseCreateManualOrderOptions) => {
  const queryClient = useQueryClient();

  return useMutation<CreateManualOrderResponse, Error, CreateManualOrderRequest>({
    mutationFn: createManualOrder,
    onSuccess: (data) => {
      // Invalidate orders list to refresh
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["manualOrders"] });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("[useCreateManualOrder] Error:", error);
      options?.onError?.(error);
    },
  });
};
