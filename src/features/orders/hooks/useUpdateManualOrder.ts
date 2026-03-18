import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@src/api/client";

interface UpdateManualOrderRequest {
  orderId: string;
  updates: {
    clientName?: string;
    clientPhone?: string;
    destinationCountry?: string;
    shippingMode?: "air" | "sea";
    shipmentLine?: string;
    estimatedCbm?: number;
    note?: string;
  };
}

interface UpdateManualOrderResponse {
  message: string;
  order: {
    _id: string;
    code: string;
    clientName: string;
    clientPhone?: string;
    estimatedCbm: number;
    shippingMode: "air" | "sea";
  };
}

const updateManualOrder = async ({
  orderId,
  updates,
}: UpdateManualOrderRequest): Promise<UpdateManualOrderResponse> => {
  const response = await apiClient.put<UpdateManualOrderResponse>(
    `/order/${orderId}/manual`,
    updates
  );
  return response.data;
};

interface UseUpdateManualOrderOptions {
  onSuccess?: (data: UpdateManualOrderResponse) => void;
  onError?: (error: Error) => void;
}

export const useUpdateManualOrder = (options?: UseUpdateManualOrderOptions) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateManualOrderResponse, Error, UpdateManualOrderRequest>({
    mutationFn: updateManualOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["manualOrders"] });
      queryClient.invalidateQueries({ queryKey: ["order", data.order._id] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("[useUpdateManualOrder] Error:", error);
      options?.onError?.(error);
    },
  });
};
