/**
 * Dashboard calculation utilities
 */

export const calculateDashboardStats = (
  ordersData: any,
  goodsData: any,
  containersData: any,
  smsData: any
) => ({
  totalGoods: goodsData?.data?.data?.length || goodsData?.data?.goods?.length || 0,
  pendingContainers: containersData?.data?.length || containersData?.data?.containers?.length || 0,
  smsBalance: smsData?.reduce((sum: number, sub: any) => sum + (sub.availableUnits || 0), 0) || 0,
});

export interface SMSBalanceSummary {
  totalUnits: number;
  status: "success" | "warning" | "danger";
  daysRemaining: number;
  expirationDateShort: string | null;
  hasExpired: boolean;
  hasExpiringSoon: boolean;
}

export const calculateSMSBalance = (smsData: any): SMSBalanceSummary => {
  const totalUnits = smsData?.reduce((sum: number, sub: any) => sum + (sub.availableUnits || 0), 0) || 0;
  const hasExpired = smsData?.some((sub: any) => sub.isExpired) || false;
  const hasExpiringSoon = smsData?.some((sub: any) => sub.isExpiringSoon) || false;

  // Determine status based on urgency
  const status: SMSBalanceSummary["status"] = hasExpired ? "danger" : hasExpiringSoon ? "warning" : totalUnits > 100 ? "success" : totalUnits > 20 ? "warning" : "danger";

  // Find the most critical subscription for display
  const criticalSub = smsData?.find((sub: any) => sub.isExpired || sub.isExpiringSoon) || smsData?.[0];
  const daysRemaining = criticalSub?.daysRemaining || 0;
  const expirationDateShort = criticalSub?.expirationDateShort || null;

  return { totalUnits, status, daysRemaining, expirationDateShort, hasExpired, hasExpiringSoon };
};
