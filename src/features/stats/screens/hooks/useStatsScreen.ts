import { useGetCurrentUser, useGetOrderOfUserById } from "@src/shared/hooks";
import { productType } from "@src/api/order";
import { COLORS } from "@src/constants/Colors";

export interface Order {
  id: string;
  code?: string;
  status: "Active" | "In Transit" | "Delivered" | "Inactive" | string;
  createdAt: string;
}

export interface User {
  _id: string;
  id?: string;
  firstName: string;
  phoneNumber?: string;
  role?: string;
}

export const STATUS_LABELS = ["Active", "In Transit", "Delivered"] as const;
export type StatusKey = (typeof STATUS_LABELS)[number];

export const INITIAL_COUNTS: Record<StatusKey, number> = {
  Active: 0,
  "In Transit": 0,
  Delivered: 0,
};

const useOrderStatusCounts = (orders: productType[] | undefined): Record<StatusKey, number> => {
  if (!orders?.length) return INITIAL_COUNTS;

  const counts = { ...INITIAL_COUNTS };
  orders.forEach((order) => {
    if (order.status && order.status in counts) {
      counts[order.status as StatusKey] += 1;
    }
  });
  return counts;
};

const getLastShipments = (orders: Order[] | undefined, n = 3): Order[] => {
  if (!orders?.length) return [];
  return [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, n);
};

export interface UseStatsScreenReturn {
  user: User | undefined;
  orders: productType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  statusCounts: Record<StatusKey, number>;
  totalShipments: number;
  lastShipments: Order[];
  hasChartData: boolean;
  chartData: Array<{ value: number; label: string; frontColor: string }>;
}

export const useStatsScreen = (): UseStatsScreenReturn => {
  const { data: user } = useGetCurrentUser();
  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isOrderError,
    refetch: refetchOrders,
  } = useGetOrderOfUserById(user?._id ?? "");

  const statusCounts = useOrderStatusCounts(orders);
  const totalShipments = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
  const lastShipments = getLastShipments(orders);
  const hasChartData = totalShipments > 0;

  const chartData = STATUS_LABELS.map((status) => ({
    value: statusCounts[status],
    label: status,
    frontColor:
      status === "Active" ? COLORS.orange : status === "In Transit" ? COLORS.green : COLORS.redShade,
  }));

  return {
    user: user as User | undefined,
    orders,
    isLoading: isLoadingOrders,
    isError: isOrderError,
    refetch: refetchOrders,
    statusCounts,
    totalShipments,
    lastShipments,
    hasChartData,
    chartData,
  };
};
