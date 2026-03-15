/**
 * Dashboard calculation utilities
 */

export const calculateDashboardStats = (
  ordersData: any,
  goodsData: any,
  containersData: any,
  smsData: any
) => ({
  activeOrders: ordersData?.pages?.[0]?.length || 0,
  totalGoods: goodsData?.data?.data?.length || goodsData?.data?.goods?.length || 0,
  pendingContainers: containersData?.data?.length || containersData?.data?.containers?.length || 0,
  smsBalance: smsData?.[2]?.availableUnits || 0,
});

export const calculateSMSBalance = (smsData: any) => {
  const totalUnits = smsData?.[2]?.availableUnits || 0;
  const usedUnits = smsData?.[2]?.usedUnits || 0;
  const percentageUsed = totalUnits > 0 ? usedUnits / (totalUnits + usedUnits) : 0;
  const status = percentageUsed < 0.3 ? "success" : percentageUsed < 0.7 ? "warning" : "danger";

  return { totalUnits, usedUnits, percentageUsed, status };
};
