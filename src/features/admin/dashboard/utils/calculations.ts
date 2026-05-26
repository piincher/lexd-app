/**
 * Dashboard calculation utilities
 */

export const calculateDashboardStats = (
  ordersData: any,
  goodsData: any,
  containersData: any,
  smsData: any
) => {
  const smsBalance = smsData?.reduce((sum: number, sub: any) => sum + (sub.availableUnits || 0), 0) || 0;
  const totalRequested = smsData?.reduce((sum: number, sub: any) => sum + (sub.requestedUnits || 0), 0) || 0;
  const smsBalancePct = totalRequested > 0
    ? Math.min(100, Math.max(0, (smsBalance / totalRequested) * 100))
    : Math.min(100, Math.max(0, (smsBalance / 500) * 100));

  return {
    totalGoods: goodsData?.data?.data?.length || goodsData?.data?.goods?.length || 0,
    pendingContainers: containersData?.data?.length || containersData?.data?.containers?.length || 0,
    smsBalance,
    smsBalancePct,
  };
};

export interface SMSBalanceSummary {
  totalUnits: number;
  totalRequestedUnits?: number;
  status: "success" | "warning" | "danger";
  daysRemaining: number;
  expirationDateShort: string | null;
  hasExpired: boolean;
  hasExpiringSoon: boolean;
  expiredCount?: number;
}

export const calculateSMSBalance = (smsData: any): SMSBalanceSummary => {
  const totalUnits = smsData?.reduce((sum: number, sub: any) => sum + (sub.availableUnits || 0), 0) || 0;
  const totalRequestedUnits = smsData?.reduce((sum: number, sub: any) => sum + (sub.requestedUnits || 0), 0) || 0;
  const hasExpired = smsData?.some((sub: any) => sub.isExpired) || false;
  const hasExpiringSoon = smsData?.some((sub: any) => sub.isExpiringSoon) || false;
  const expiredCount = smsData?.filter((sub: any) => sub.isExpired).length || 0;

  // Determine status based on urgency
  const status: SMSBalanceSummary["status"] = hasExpired ? "danger" : hasExpiringSoon ? "warning" : totalUnits > 100 ? "success" : totalUnits > 20 ? "warning" : "danger";

  // Find the most critical subscription for display
  const criticalSub = smsData?.find((sub: any) => sub.isExpired || sub.isExpiringSoon) || smsData?.[0];
  const daysRemaining = criticalSub?.daysRemaining || 0;
  const expirationDateShort = criticalSub?.expirationDateShort || null;

  return { totalUnits, totalRequestedUnits, status, daysRemaining, expirationDateShort, hasExpired, hasExpiringSoon, expiredCount };
};
