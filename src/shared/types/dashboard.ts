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
}
