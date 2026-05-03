/**
 * useAutoAssignToOrder - Hook for auto-assigning goods to an existing or new order
 * Finds a recent active order (< 7 days) or creates a new one, then assigns goods.
 */

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getOrdersBasedOnUserId, placeOrder } from '@src/api/order';
import { assignGoodsToOrder } from '@src/features/admin/shared/api';
import { productType } from '@src/shared/types/order';
import { queryKey } from '@src/constants/queryKey';

const RECENT_ORDER_DAYS = 7;

const PARTNER_BY_SHIPMENT_LINE: Record<string, string> = {
  AIR_ML_STANDARD: 'Air Mali Standard',
  SEA_ML_DAKAR: 'Sea Mali Dakar',
  SEA_ML_ABIDJAN: 'Sea Mali Abidjan',
  SEA_ML_LAGOS: 'Sea Mali Lagos',
  SEA_ML_TEMA: 'Sea Mali Tema',
};

const getPartnerFromShipmentLine = (shipmentLine: string): string =>
  PARTNER_BY_SHIPMENT_LINE[shipmentLine] || shipmentLine.replace(/_/g, ' ');

const isRecentOrder = (order: productType, days: number): boolean => {
  const createdAt = order.createdAt || order.departureDate;
  if (!createdAt) return false;
  const orderDate = new Date(createdAt);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return orderDate >= cutoff;
};

interface AutoAssignGoodsData {
  weight: number;
  quantity: number;
  unitPrice: number;
  shippingMode?: string;
  actualCBM?: number;
  description?: string;
}

interface AutoAssignResult {
  action: 'created_new' | 'added_to_existing';
  code: string;
}

export const useAutoAssignToOrder = () => {
  const queryClient = useQueryClient();

  const autoAssignToOrder = useCallback(async (
    goodsId: string,
    client: { _id: string; firstName: string; lastName: string; phoneNumber?: string },
    goodsData: AutoAssignGoodsData,
  ): Promise<AutoAssignResult | null> => {
    try {
      console.log('[AutoAssign] Fetching orders for client:', client._id);
      let orders: productType[] = [];
      try {
        orders = await getOrdersBasedOnUserId(client._id) || [];
      } catch (e) {
        console.log('[AutoAssign] No existing orders found, will create new');
      }
      console.log('[AutoAssign] Found', orders.length, 'orders for client');

      const activeOrder = orders.find(
        (o) => o.status === 'Active' && isRecentOrder(o, RECENT_ORDER_DAYS)
      );

      let orderId: string;
      let orderCode: string;
      let action: 'created_new' | 'added_to_existing';

      if (activeOrder && activeOrder._id) {
        console.log('[AutoAssign] Found recent active order:', activeOrder.code);
        orderId = activeOrder._id;
        orderCode = activeOrder.code || orderId;
        action = 'added_to_existing';
      } else {
        console.log('[AutoAssign] No recent active order, creating new order...');
        const shippingMode = (goodsData.shippingMode || 'SEA').toLowerCase() as 'air' | 'sea';
        const totalPrice = goodsData.unitPrice * (shippingMode === 'air' ? goodsData.weight : (goodsData.actualCBM || 0));
        const shipmentLine = shippingMode === 'air' ? 'AIR_ML_STANDARD' : 'SEA_ML_DAKAR';
        const partenaire = getPartnerFromShipmentLine(shipmentLine);
        const newOrderData = {
          clientName: `${client.firstName} ${client.lastName}`.trim(), clientPhone: client.phoneNumber || '',
          packageWeight: goodsData.weight, quantity: goodsData.quantity, unitPrice: goodsData.unitPrice,
          shippingMode, packageCBM: (goodsData.actualCBM || 0).toString(), userId: client._id,
          status: 'Active', images: [], partenaire, shipmentLine,
          destinationCountry: 'ML', departureDate: new Date().toISOString(), priceTotal: totalPrice,
        } as unknown as productType;
        console.log('[AutoAssign] Creating order with data:', JSON.stringify(newOrderData));

        const orderResult = await placeOrder(newOrderData);
        const createdOrder = orderResult?.data;
        console.log('[AutoAssign] Order created:', JSON.stringify(createdOrder));

        orderId = createdOrder?._id || '';
        orderCode = createdOrder?.code || orderId;
        action = 'created_new';

        if (!orderId) {
          console.error('[AutoAssign] Order created but no _id returned');
          return null;
        }
      }

      console.log('[AutoAssign] Assigning goods', goodsId, 'to order', orderId);
      try {
        await assignGoodsToOrder({ orderId, goodsId });
        console.log('[AutoAssign] Goods assigned successfully');
      } catch (assignError: any) {
        console.error('[AutoAssign] Failed to assign goods:', assignError?.response?.data || assignError?.message);
      }

      queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      return { action, code: orderCode };
    } catch (error: any) {
      console.error('[AutoAssign] Error details:', JSON.stringify({ status: error?.response?.status, data: error?.response?.data, message: error?.message }));
      return null;
    }
  }, [queryClient]);

  return { autoAssignToOrder };
};
