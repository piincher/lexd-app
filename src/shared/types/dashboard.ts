/**
 * Dashboard statistics for the customer
 */
export interface DashboardStats {
  totalGoods: number;
  goodsByStatus: Record<string, number>;
  totalContainers: number;
  activeContainers: number;
  totalSpent: number;
  totalPaid: number;
  balanceDue: number;
  accountBalance?: number;
}

export interface ShippingSummary {
  totalCBM: number;
  totalKg: number;
  deliveredCBM: number;
  deliveredKg: number;
  shipmentCount: number;
  deliveredCount: number;
  currentMonthCBM: number;
  currentMonthKg: number;
  currentMonthSpend: number;
  currentMonthShipmentCount: number;
  currentMonthDeliveredCount: number;
  totalSpent: number;
  totalPaid: number;
  balanceDue: number;
  averageShipmentValue: number;
}

export interface MonthlyTrendPoint {
  month: string;
  label: string;
  cbm: number;
  kg: number;
  spend: number;
  shipments: number;
}

export interface ActiveWorkSummary {
  warehouseGoods: number;
  inTransitGoods: number;
  arrivedGoods: number;
  readyForPickupGoods: number;
  unpaidGoods: number;
  pendingPayments: number;
  pendingActions: number;
}

export interface ShipmentHealthItem {
  id: string;
  trackingType?: 'CONTAINER' | 'AIRWAY_BILL';
  reference: string;
  status: string;
  shippingMode?: string;
  goodsCount: number;
  readyGoodsCount: number;
  eta?: string | null;
  needsAttention?: boolean;
}

export interface RewardSummary {
  rewardPoints: number;
  pointValueFCFA: number;
  rewardValueFCFA: number;
}

export interface VipTier {
  id: string;
  name: string;
  description: string;
  requiredCBM: number;
  icon?: string;
  color?: string;
}

export interface VipProgress {
  currentTier: VipTier;
  nextTier: VipTier | null;
  metric: 'CBM' | 'KG';
  deliveredCBM: number;
  deliveredKg: number;
  progressPercent: number;
  remainingCBM: number;
  rewardPoints: number;
  rewardValueFCFA: number;
}

export interface NextShipmentAction {
  id: string;
  label: string;
  description?: string;
  route: string;
  priority: 'primary' | 'secondary';
}
