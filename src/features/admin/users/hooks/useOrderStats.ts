import { useMemo } from "react";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "@src/shared/types/order";
import { INITIAL_COUNTS, STATUS_LABELS } from "../lib/constants";

interface OrderStats {
  counts: typeof INITIAL_COUNTS;
  total: number;
  totalCBM: number;
  totalPrice: number;
}

export const useOrderStats = (orders: productType[] | undefined): OrderStats => {
  return useMemo(() => {
    if (!orders?.length) {
      return { counts: INITIAL_COUNTS, total: 0, totalCBM: 0, totalPrice: 0 };
    }

    const counts = { ...INITIAL_COUNTS };
    let totalCBM = 0;
    let totalPrice = 0;

    orders.forEach((order) => {
      if (order.status in counts) {
        counts[order.status as keyof typeof counts] += 1;
      }
      totalCBM += parseFloat(order.packageCBM || "0") || 0;
      totalPrice += parseFloat(order.priceTotal?.toString() || "0") || 0;
    });

    return {
      counts,
      total: orders.length,
      totalCBM,
      totalPrice,
    };
  }, [orders]);
};

export const useChartData = (counts: typeof INITIAL_COUNTS) => {
  const { colors } = useAppTheme();
  return useMemo(() => {
    const { STATUS_CONFIG } = require("../lib/constants");
    return STATUS_LABELS.map((status) => ({
      value: counts[status as keyof typeof counts],
      label: STATUS_CONFIG[status]?.label || status,
      frontColor: STATUS_CONFIG[status]?.color || colors.text.secondary,
    }));
  }, [counts, colors]);
};

export const useLastShipments = (orders: productType[] | undefined, n = 3) => {
  return useMemo(() => {
    if (!orders?.length) return [];
    return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, n);
  }, [orders, n]);
};
