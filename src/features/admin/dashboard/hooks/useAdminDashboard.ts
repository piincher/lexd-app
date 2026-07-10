/**
 * useAdminDashboard - Hook for admin dashboard data
 * SRP: Data fetching and business logic ONLY (<100 lines)
 */

import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@src/store/Auth";
import { useViewSmsBalance, useGetAllOrders } from "@src/shared/hooks/useOrders";
import { useGetAllGoods } from "@src/shared/hooks/useAdminGoods";
import { useGetAllContainers } from "@src/shared/hooks/useAdminContainers";
import { calculateDashboardStats, calculateSMSBalance } from "../utils/calculations";
import { getDashboardAnalytics } from "../api/dashboardAnalyticsApi";
import type { DashboardData } from "@src/shared/types/adminDashboard";

interface RecentOrder {
  id: string;
  code: string;
  clientName: string;
  status: string;
  date: string;
}

interface OrderSummary {
  _id: string;
  code: string;
  clientName: string;
  status: string;
  createdAt?: string;
  departureDate?: string;
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

  const analyticsQuery = useQuery<DashboardData>({
    queryKey: ["admin", "dashboard", "analytics"],
    queryFn: getDashboardAnalytics,
  });

  const stats = useMemo(
    () => calculateDashboardStats(ordersData, goodsData, containersData, smsData),
    [ordersData, goodsData, containersData, smsData]
  );

  const recentOrders: RecentOrder[] = useMemo(
    () =>
      (ordersData?.pages?.[0] as OrderSummary[] | undefined)?.slice(0, 5).map((order) => ({
        id: order._id,
        code: order.code,
        clientName: order.clientName,
        status: order.status,
        date: order.createdAt || order.departureDate || "",
      })) || [],
    [ordersData]
  );

  const smsBalance = useMemo(() => calculateSMSBalance(smsData), [smsData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchSms(),
      refetchOrders(),
      refetchGoods(),
      refetchContainers(),
      analyticsQuery.refetch(),
    ]);
    setRefreshing(false);
  }, [refetchSms, refetchOrders, refetchGoods, refetchContainers, analyticsQuery]);

  const isLoading = isSmsLoading || isOrdersLoading || isGoodsLoading || isContainersLoading || analyticsQuery.isLoading;

  return {
    user,
    stats,
    recentOrders,
    smsBalance,
    analytics: analyticsQuery.data,
    analyticsError: analyticsQuery.error,
    refreshing,
    onRefresh,
    isLoading,
  };
};

export default useAdminDashboard;
