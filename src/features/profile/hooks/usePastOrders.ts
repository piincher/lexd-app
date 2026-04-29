import React from "react";
import { useState, useMemo, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getActiveOrders } from "@src/api/order";
import { productType } from "@src/shared/types/order";
import { LIMIT } from "@src/constants/Dimensions";

export type ShippingMode = "all" | "air" | "sea";

export interface FilterOption {
  value: ShippingMode;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export const FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "Tous", icon: "filter-variant" },
  { value: "sea", label: "Maritime", icon: "ferry" },
  { value: "air", label: "Aérien", icon: "airplane" },
];

const ORDERKEY = "past-orders";

const fetchPastOrders = async (
  page: number,
  shippingMethod: ShippingMode
): Promise<productType[]> => {
  if (shippingMethod === "all") {
    const [airOrders, seaOrders] = await Promise.all([
      getActiveOrders(page, "Inactive", "air"),
      getActiveOrders(page, "Inactive", "sea"),
    ]);
    return [...airOrders, ...seaOrders];
  }
  return getActiveOrders(page, "Inactive", shippingMethod);
};

export const usePastOrders = () => {
  const [shippingMode, setShippingMode] = useState<ShippingMode>("all");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [ORDERKEY, shippingMode],
    queryFn: ({ pageParam = 1 }) => fetchPastOrders(pageParam, shippingMode),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length === LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

  const orders = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page);
  }, [data]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    shippingMode,
    setShippingMode,
    orders,
    isLoading,
    isRefetching,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
  };
};
