import { apiClient } from "@src/api/client";

export interface AssignGoodsToOrderRequest {
  orderId: string;
  goodsId: string;
}

export interface AssignGoodsToOrderResponse {
  message: string;
  order: {
    _id: string;
    code: string;
    clientName: string;
    status: string;
    manualOrderStatus: string;
    isGoodsLinked: boolean;
    calculatedCBM: number;
    calculatedTotal: number;
    goodsCount: number;
  };
}

/**
 * Assign goods to an existing manual order
 * POST /order/:orderId/assign-goods
 */
export const assignGoodsToOrder = async ({
  orderId,
  goodsId,
}: AssignGoodsToOrderRequest): Promise<AssignGoodsToOrderResponse> => {
  const response = await apiClient.post<AssignGoodsToOrderResponse>(
    `/order/${orderId}/assign-goods`,
    { goodsId }
  );
  return response.data;
};
