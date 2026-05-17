/**
 * Real-time Analytics Types
 */

export interface RealtimeMetric {
  todayRevenue: number;
  todayRevenueFCFA: number;
  activeContainers: number;
  pendingPayments: number;
  goodsInTransit: number;
  readyForPickup: number;
}

export interface RecentActivity {
  type: 'payment' | 'delivery' | 'arrival';
  amount?: number;
  amountFCFA?: number;
  customer?: string;
  timestamp: string;
}

export interface RealtimeData {
  timestamp: string;
  metrics: RealtimeMetric;
  recentActivity: RecentActivity[];
}
