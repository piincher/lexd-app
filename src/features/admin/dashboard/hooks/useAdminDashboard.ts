/**
 * useAdminDashboard - Hook for admin dashboard data
 * SRP: Data fetching and business logic ONLY (<100 lines)
 */

import { useState, useCallback, useMemo } from "react";
import { useAuth } from "@src/store/Auth";
import { useViewSmsBalance } from "@src/shared/hooks";
import { useGetActiveOrdersAdmin } from "@src/features/admin/orders/hooks/useOrderManagement";
import { useGetAllGoods } from "@src/features/admin/goods/hooks";
import { useGetAllContainers } from "@src/features/admin/containers/hooks";
import { calculateDashboardStats, calculateSMSBalance } from "../utils/calculations";

interface RecentOrder {
  id: string;
  code: string;
  clientName: string;
  status: string;
  date: string;
}

export const useAdminDashboard = () => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const { data: smsData, refetch: refetchSms } = useViewSmsBalance(true);
  const { data: ordersData, refetch: refetchOrders } = useGetActiveOrdersAdmin("Active", new Date(), "sea");
  const { data: goodsData, refetch: refetchGoods } = useGetAllGoods({ status: "RECEIVED_AT_WAREHOUSE" });
  const { data: containersData, refetch: refetchContainers } = useGetAllContainers({
    status: ["BOOKED", "LOADING"],
  });

  const stats = useMemo(
    () => calculateDashboardStats(ordersData, goodsData, containersData, smsData),
    [ordersData, goodsData, containersData, smsData]
  );

  const recentOrders: RecentOrder[] = useMemo(
    () =>
      ordersData?.pages?.[0]?.slice(0, 5).map((order: any) => ({
        id: order._id,
        code: order.code,
        clientName: order.clientName,
        status: order.status,
        date: order.createdAt || order.departureDate,
      })) || [],
    [ordersData]
  );

  const smsBalance = useMemo(() => calculateSMSBalance(smsData), [smsData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchSms(), refetchOrders(), refetchGoods(), refetchContainers()]);
    setRefreshing(false);
  }, [refetchSms, refetchOrders, refetchGoods, refetchContainers]);

  return { user, stats, recentOrders, smsBalance, refreshing, onRefresh };
};

export default useAdminDashboard;
