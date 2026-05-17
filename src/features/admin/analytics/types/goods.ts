/**
 * Goods Volume Analytics Types
 */

export interface VolumeByStatus {
  status: string;
  count: number;
  totalCBM: number;
  totalWeight: number;
  totalValue: number;
  totalValueFCFA: number;
}

export interface VolumeByShippingMode {
  shippingMode: string;
  count: number;
  totalCBM: number;
  totalValue: number;
  totalValueFCFA: number;
}

export interface VolumeByPaymentStatus {
  paymentStatus: string;
  count: number;
  totalValue: number;
  totalValueFCFA: number;
  totalPaid: number;
  totalPaidFCFA: number;
  balanceDue: number;
  balanceDueFCFA: number;
}

export interface DailyVolumePoint {
  date: string;
  count: number;
  totalCBM: number;
  totalValue: number;
  totalValueFCFA: number;
}

export interface GoodsVolumeData {
  period: string;
  summary: {
    totalGoods: number;
    totalCBM: number;
    totalValue: number;
    totalValueFCFA: number;
  };
  byStatus: VolumeByStatus[];
  byShippingMode: VolumeByShippingMode[];
  byPaymentStatus: VolumeByPaymentStatus[];
  dailyTrend: DailyVolumePoint[];
}
