import React, { useCallback } from "react";
import { View, Text, Pressable, TextInput, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { OrderListCard } from "../OrderListCard";
import { OrderStatusFilter } from "../OrderStatusFilter";
import { OrderListSkeleton } from "@src/shared/ui/OrderListSkeleton";
import { productType } from "../../api";
import { useCustomerOrders } from "../../hooks/useCustomerOrders";
import { styles } from "./OrdersCustomerView.styles";

interface OrdersCustomerViewProps {
	headerRight?: React.ReactNode;
}

const STATUS_FILTERS = [
	{ key: "all", label: "Tous" },
	{ key: "Inactive", label: "En attente" },
	{ key: "Active", label: "En cours" },
	{ key: "In Transit", label: "En transit" },
	{ key: "Delivered", label: "Livré" },
];

export const OrdersCustomerView: React.FC<OrdersCustomerViewProps> = ({ headerRight }) => {
	const { colors } = useAppTheme();
	const {
		filteredOrders,
		isLoading,
		refreshing,
		onRefresh,
		onScroll,
		statusFilter,
		setStatusFilter,
		searchQuery,
		setSearchQuery,
		statusCounts,
		handleOrderPress,
		currentCount,
		orderPlural,
	} = useCustomerOrders();

	const renderItem: ListRenderItem<productType> = useCallback(
		({ item }) => <OrderListCard order={item} onPress={() => handleOrderPress(item)} />,
		[handleOrderPress]
	);

	const keyExtractor = useCallback((item: productType) => item._id!, []);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background.default }]}
			edges={["top"]}
		>
			<View style={styles.header}>
				<View>
					<Text style={[styles.headerTitle, { color: colors.text.primary }]}>
						Mes Commandes
					</Text>
					<Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
						{currentCount} commande{orderPlural}
					</Text>
				</View>
				{headerRight}
			</View>

			<View
				style={[
					styles.searchContainer,
					{ backgroundColor: colors.background.card, borderColor: colors.border },
				]}
			>
				<Feather name="search" size={18} color={colors.text.secondary} style={styles.searchIcon} />
				<TextInput
					style={[styles.searchInput, { color: colors.text.primary }]}
					placeholder="Rechercher une commande..."
					placeholderTextColor={colors.text.disabled}
					value={searchQuery}
					onChangeText={setSearchQuery}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				{searchQuery.length > 0 && (
					<Pressable onPress={() => setSearchQuery("")} style={styles.clearSearch}>
						<Feather name="x" size={18} color={colors.text.secondary} />
					</Pressable>
				)}
			</View>

			<OrderStatusFilter
				filters={STATUS_FILTERS}
				activeFilter={statusFilter}
				counts={statusCounts}
				onSelect={setStatusFilter}
			/>

			{isLoading ? (
				<OrderListSkeleton />
			) : (
				<View style={styles.listWrapper}>
					<FlashList
						data={filteredOrders}
						keyExtractor={keyExtractor}
						renderItem={renderItem}
						onScroll={onScroll}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.listContent}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
								tintColor={colors.primary.main}
							/>
						}
						ListEmptyComponent={
							<View style={styles.emptyContainer}>
								<Feather name="inbox" size={48} color={colors.text.disabled} />
								<Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
									Aucune commande
								</Text>
								<Text style={[styles.emptyText, { color: colors.text.secondary }]}>
									{searchQuery.trim()
										? `Aucun résultat pour "${searchQuery}"`
										: statusFilter !== "all"
										? `Vous n'avez pas de commande "${STATUS_FILTERS.find(
												(f) => f.key === statusFilter
											)?.label.toLowerCase()}"`
										: "Vos commandes apparaîtront ici"}
								</Text>
							</View>
						}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};
