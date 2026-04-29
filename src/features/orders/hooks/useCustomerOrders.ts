import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@src/store/Auth";
import { useHideTabBarOnScroll } from "@src/shared/lib";
import { getOrdersBasedOnUserId, productType } from "../api";

export const useCustomerOrders = () => {
	const navigation = useNavigation();
	const { onScroll } = useHideTabBarOnScroll();
	const userId = useAuth((state) => state.user._id);

	const { data: orders, isLoading, refetch } = useQuery({
		queryKey: ["order", userId],
		queryFn: () => getOrdersBasedOnUserId(userId),
		enabled: !!userId,
	});

	const [statusFilter, setStatusFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [refreshing, setRefreshing] = useState(false);

	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch])
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, [refetch]);

	const filteredOrders = useMemo(() => {
		if (!orders || !Array.isArray(orders)) return [];
		const sorted = [...orders].sort((a, b) => {
			const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
			const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
			return dateB - dateA;
		});
		let result = sorted;
		if (statusFilter !== "all") {
			result = result.filter((o) => o.status === statusFilter);
		}
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase().trim();
			result = result.filter(
				(o) =>
					o._id?.toLowerCase().includes(q) ||
					o.clientName?.toLowerCase().includes(q) ||
					o.status?.toLowerCase().includes(q)
			);
		}
		return result;
	}, [orders, statusFilter, searchQuery]);

	const statusCounts = useMemo(() => {
		if (!orders || !Array.isArray(orders))
			return { all: 0, Inactive: 0, Active: 0, "In Transit": 0, Delivered: 0 };
		return {
			all: orders.length,
			Inactive: orders.filter((o) => o.status === "Inactive").length,
			Active: orders.filter((o) => o.status === "Active").length,
			"In Transit": orders.filter((o) => o.status === "In Transit").length,
			Delivered: orders.filter((o) => o.status === "Delivered").length,
		};
	}, [orders]);

	const handleOrderPress = useCallback(
		(order: productType) => {
			(navigation as any).navigate("OrderDetail", { id: order._id });
		},
		[navigation]
	);

	const currentCount = statusCounts[statusFilter as keyof typeof statusCounts] ?? 0;
	const orderPlural = currentCount !== 1 ? "s" : "";

	return {
		orders,
		isLoading,
		refreshing,
		onRefresh,
		onScroll,
		statusFilter,
		setStatusFilter,
		searchQuery,
		setSearchQuery,
		filteredOrders,
		statusCounts,
		handleOrderPress,
		currentCount,
		orderPlural,
	};
};
