import { productType } from '@src/shared/types/order';

export const RECENT_ORDER_DAYS = 7;

export const PARTNER_BY_SHIPMENT_LINE: Record<string, string> = {
  AIR_ML_STANDARD: 'Air Mali Standard',
  SEA_ML_DAKAR: 'Sea Mali Dakar',
  SEA_ML_ABIDJAN: 'Sea Mali Abidjan',
  SEA_ML_LAGOS: 'Sea Mali Lagos',
  SEA_ML_TEMA: 'Sea Mali Tema',
};

export const getPartnerFromShipmentLine = (shipmentLine: string): string =>
  PARTNER_BY_SHIPMENT_LINE[shipmentLine] || shipmentLine.replace(/_/g, ' ');

export const isRecentOrder = (order: productType, days: number): boolean => {
  const createdAt = order.createdAt || order.departureDate;
  if (!createdAt) return false;
  const orderDate = new Date(createdAt);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return orderDate >= cutoff;
};

export interface AutoAssignGoodsData {
  weight: number;
  quantity: number;
  unitPrice: number;
  shippingMode?: string;
  actualCBM?: number;
  description?: string;
}

export interface AutoAssignResult {
  action: 'created_new' | 'added_to_existing';
  code: string;
}

export interface OrderMatchResult extends AutoAssignResult {
  orderId: string;
}

export const buildNewOrderData = (
  client: { _id: string; firstName: string; lastName: string; phoneNumber?: string },
  goodsData: AutoAssignGoodsData,
  totalPrice: number,
  shippingMode: 'air' | 'sea',
  shipmentLine: string,
  partenaire: string,
): productType => {
  return {
    clientName: `${client.firstName} ${client.lastName}`.trim(),
    clientPhone: client.phoneNumber || '',
    packageWeight: goodsData.weight,
    quantity: goodsData.quantity,
    unitPrice: goodsData.unitPrice,
    shippingMode,
    packageCBM: (goodsData.actualCBM || 0).toString(),
    userId: client._id,
    status: 'Active',
    images: [],
    partenaire,
    shipmentLine,
    destinationCountry: 'ML',
    departureDate: new Date().toISOString(),
    priceTotal: totalPrice,
  } as unknown as productType;
};
