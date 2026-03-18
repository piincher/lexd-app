import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@src/api/client";

interface CancelManualOrderRequest {
  orderId: string;
  reason?: string;
}

interface CancelManualOrderResponse {
  message: string;
  order: {
    _id: string;
    code: string;
    status: string;
    manualOrderStatus: string;
  };
}

const cancelManualOrder = async ({
  orderId,
  reason,
}: CancelManualOrderRequest): Promise<CancelManualOrderResponse> => {
  const response = await apiClient.post<CancelManualOrderResponse>(
    `/order/${orderId}/cancel`,
    { reason }
  );
  return response.data;
};

interface UseCancelManualOrderOptions {
  onSuccess?: (data: CancelManualOrderResponse) => void;
  onError?: (error: Error) => void;
}

export const useCancelManualOrder = (options?: UseCancelManualOrderOptions) => {
  const queryClient = useQueryClient();

  return useMutation<CancelManualOrderResponse, Error, CancelManualOrderRequest>({
    mutationFn: cancelManualOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["manualOrders"] });
      queryClient.invalidateQueries({ queryKey: ["order", data.order._id] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("[useCancelManualOrder] Error:", error);
      options?.onError?.(error);
    },
  });
};
