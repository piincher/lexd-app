import { useCallback } from 'react';
import { getOrdersBasedOnUserId, placeOrder } from '@src/api/order';
import { productType } from '@src/shared/types/order';
import {
  RECENT_ORDER_DAYS,
  getPartnerFromShipmentLine,
  isRecentOrder,
  buildNewOrderData,
  AutoAssignGoodsData,
  OrderMatchResult,
} from './autoAssignHelpers';

export const useOrderMatching = () => {
  const matchOrder = useCallback(async (
    client: { _id: string; firstName: string; lastName: string; phoneNumber?: string },
    goodsData: AutoAssignGoodsData,
  ): Promise<OrderMatchResult | null> => {
    try {
      let orders: productType[] = [];
      try {
        orders = await getOrdersBasedOnUserId(client._id) || [];
      } catch {
        console.log('[AutoAssign] No existing orders found, will create new');
      }

      const activeOrder = orders.find(
        (o) => o.status === 'Active' && isRecentOrder(o, RECENT_ORDER_DAYS)
      );

      if (activeOrder && activeOrder._id) {
        return {
          action: 'added_to_existing',
          orderId: activeOrder._id,
          code: activeOrder.code || activeOrder._id,
        };
      }

      const shippingMode = (goodsData.shippingMode || 'SEA').toLowerCase() as 'air' | 'sea';
      const totalPrice = goodsData.unitPrice * (shippingMode === 'air' ? goodsData.weight : (goodsData.actualCBM || 0));
      const shipmentLine = shippingMode === 'air' ? 'AIR_ML_STANDARD' : 'SEA_ML_DAKAR';
      const partenaire = getPartnerFromShipmentLine(shipmentLine);

      const newOrderData = buildNewOrderData(client, goodsData, totalPrice, shippingMode, shipmentLine, partenaire);
      const orderResult = await placeOrder(newOrderData);
      const createdOrder = orderResult?.data;

      const orderId = createdOrder?._id || '';
      if (!orderId) {
        console.error('[AutoAssign] Order created but no _id returned');
        return null;
      }

      return {
        action: 'created_new',
        orderId,
        code: createdOrder?.code || orderId,
      };
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error('[AutoAssign] Order matching error:', err.message);
      return null;
    }
  }, []);

  return { matchOrder };
};
