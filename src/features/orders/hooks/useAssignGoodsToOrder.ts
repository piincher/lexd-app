import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  assignGoodsToOrder,
  AssignGoodsToOrderRequest,
  AssignGoodsToOrderResponse,
} from "../api/assignGoodsToOrder";

interface UseAssignGoodsToOrderOptions {
  onSuccess?: (data: AssignGoodsToOrderResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to assign goods to an existing manual order
 * Invalidates relevant queries on success
 */
export const useAssignGoodsToOrder = (options?: UseAssignGoodsToOrderOptions) => {
  const queryClient = useQueryClient();

  return useMutation<AssignGoodsToOrderResponse, Error, AssignGoodsToOrderRequest>({
    mutationFn: assignGoodsToOrder,
    onSuccess: (data) => {
      // Invalidate manual orders list
      queryClient.invalidateQueries({ queryKey: ["manualOrders"] });
      
      // Invalidate specific order
      queryClient.invalidateQueries({ 
        queryKey: ["order", data.order._id] 
      });
      
      // Invalidate goods queries
      queryClient.invalidateQueries({ queryKey: ["goods"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("[useAssignGoodsToOrder] Error:", error);
      options?.onError?.(error);
    },
  });
};
