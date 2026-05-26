import { useState, useMemo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { RootStackParamList } from "@src/navigations/type";
import { getActiveOrders } from "@src/api/order";
import { productType } from "@src/shared/types/order";
import { LIMIT } from "@src/constants/Dimensions";
import type { ShippingMode } from "./pastOrdersConstants";
import {
  filterPastOrdersBySearch,
  getPastOrdersSummary,
} from "./pastOrdersTransforms";

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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [shippingMode, setShippingMode] = useState<ShippingMode>("all");
  const [searchQuery, setSearchQuery] = useState("");

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
    const seen = new Map<string, productType>();
    data.pages.flatMap((page) => page).forEach((order) => {
      const id = order._id || order.code || order.orderId;
      if (id && !seen.has(id)) {
        seen.set(id, order);
      }
    });
    return Array.from(seen.values());
  }, [data]);

  const visibleOrders = useMemo(
    () => filterPastOrdersBySearch(orders, searchQuery),
    [orders, searchQuery],
  );

  const summary = useMemo(() => getPastOrdersSummary(orders), [orders]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleOrderPress = useCallback((order: productType) => {
    if (order._id) {
      navigation.navigate("OrderDetail", { id: order._id });
    }
  }, [navigation]);

  return {
    shippingMode,
    setShippingMode,
    searchQuery,
    setSearchQuery,
    orders,
    visibleOrders,
    summary,
    isLoading,
    isRefetching,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
    handleOrderPress,
  };
};
