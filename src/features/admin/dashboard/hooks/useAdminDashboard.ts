/**
 * useAdminDashboard - Hook for admin dashboard data
 * SRP: Data fetching and business logic ONLY (<100 lines)
 */

import { useState, useCallback, useMemo } from "react";
import { useAuth } from "@src/store/Auth";
import { useViewSmsBalance } from '@src/shared/hooks/useOrders';
import { useGetAllOrders } from "@src/features/admin/orders/hooks/useOrderManagement";
import { useGetAllGoods } from "@src/features/admin/goods/hooks/useGoods";
import { useGetAllContainers } from "@src/features/admin/containers/hooks/useContainers";
import { calculateDashboardStats, calculateSMSBalance } from "../utils/calculations";

interface RecentOrder {
  id: string;
  code: string;
  clientName: string;
  status: string;
  date: string;
}

export const useAdminDashboard = () => {
  const user = useAuth((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const { data: smsData, isLoading: isSmsLoading, refetch: refetchSms } = useViewSmsBalance(true);
  const { data: ordersData, isLoading: isOrdersLoading, refetch: refetchOrders } = useGetAllOrders();
  const { data: goodsData, isLoading: isGoodsLoading, refetch: refetchGoods } = useGetAllGoods({ status: "RECEIVED_AT_WAREHOUSE" });
  const { data: containersData, isLoading: isContainersLoading, refetch: refetchContainers } = useGetAllContainers({
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

  const isLoading = isSmsLoading || isOrdersLoading || isGoodsLoading || isContainersLoading;

  return { user, stats, recentOrders, smsBalance, refreshing, onRefresh, isLoading };
};

export default useAdminDashboard;
