/**
 * Container Utilization Analytics Types
 */

export interface ContainerCapacity {
  maxCBM: number;
  maxWeight: number;
  usedCBM: number;
  usedWeight: number;
}

export interface ContainerUtilization {
  cbmPercentage: number;
  weightPercentage: number;
}

export interface ContainerMetrics {
  goodsCount: number;
  revenue: number;
  revenueFCFA: number;
}

export interface ContainerUtilizationItem {
  containerId: string;
  containerNumber: string;
  shippingMode: 'SEA' | 'AIR';
  shippingLine?: string;
  status: string;
  capacity: ContainerCapacity;
  utilization: ContainerUtilization;
  metrics: ContainerMetrics;
  timeline?: {
    bookedAt?: string;
    departedAt?: string;
    arrivedAt?: string;
  };
}

export interface ShippingLineStats {
  containers: number;
  avgFillRate: number;
  totalRevenue: number;
  totalRevenueFCFA: number;
}

export interface ContainerUtilizationData {
  summary: {
    totalContainers: number;
    avgFillRate: number;
    totalRevenue: number;
    totalRevenueFCFA: number;
  };
  byShippingLine: Record<string, ShippingLineStats>;
  containers: ContainerUtilizationItem[];
}
