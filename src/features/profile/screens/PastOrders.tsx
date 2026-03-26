import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  Pressable,
} from "react-native";
import { Text, Chip, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import { Fonts } from "@src/constants/Fonts";
import { COLORS } from "@src/constants/Colors";
import { LIMIT } from "@src/constants/Dimensions";
import { getActiveOrders, productType } from "@src/api/order";
import { ListItemOrders } from "@src/components/ListItemOrders";

const ORDERKEY = "past-orders";

type ShippingMode = "all" | "air" | "sea";

interface FilterOption {
  value: ShippingMode;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "Tous", icon: "filter-variant" },
  { value: "sea", label: "Maritime", icon: "ferry" },
  { value: "air", label: "Aérien", icon: "airplane" },
];

const fetchPastOrders = async (
  page: number,
  shippingMethod: ShippingMode
): Promise<productType[]> => {
  // Fetch both air and sea if "all", otherwise fetch specific method
  if (shippingMethod === "all") {
    const [airOrders, seaOrders] = await Promise.all([
      getActiveOrders(page, "Inactive", "air"),
      getActiveOrders(page, "Inactive", "sea"),
    ]);
    return [...airOrders, ...seaOrders];
  }
  return getActiveOrders(page, "Inactive", shippingMethod);
};

const PastOrders: React.FC = () => {
  const navigation = useNavigation();
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

  const renderFilterChips = () => (
    <View style={styles.filtersContainer}>
      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map((option) => {
          const isSelected = shippingMode === option.value;
          return (
            <Chip
              key={option.value}
              selected={isSelected}
              onPress={() => setShippingMode(option.value)}
              style={[
                styles.filterChip,
                isSelected && { backgroundColor: COLORS.Crimson },
              ]}
              textStyle={{
                color: isSelected ? COLORS.white : COLORS.DimGray,
                fontFamily: isSelected ? Fonts.bold : Fonts.meduim,
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name={option.icon}
                  size={16}
                  color={isSelected ? COLORS.white : COLORS.DimGray}
                />
              )}
            >
              {option.label}
            </Chip>
          );
        })}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="package-variant-closed"
        size={80}
        color={COLORS.SlateGray}
      />
      <Text style={styles.emptyTitle}>Aucune commande terminée</Text>
      <Text style={styles.emptyText}>
        {shippingMode !== "all"
          ? `Vous n'avez pas de commandes ${
              FILTER_OPTIONS.find((f) => f.value === shippingMode)?.label.toLowerCase()
            } terminées.`
          : "Vous n'avez pas encore de commandes terminées.\nElles apparaîtront ici une fois livrées."}
      </Text>
      <Pressable
        style={styles.browseButton}
        onPress={() => navigation.navigate("AddOrder" as never)}
      >
        <Text style={styles.browseButtonText}>Créer une commande</Text>
      </Pressable>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.DarkGrey} />
          </Pressable>
          <Text style={styles.headerTitle}>Commandes Terminées</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.Crimson} />
          <Text style={styles.loadingText}>Chargement de vos commandes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.DarkGrey} />
        </Pressable>
        <Text style={styles.headerTitle}>Commandes Terminées</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filters */}
      {renderFilterChips()}

      {/* Order Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {orders.length} commande{orders.length > 1 ? "s" : ""} terminée
          {orders.length > 1 ? "s" : ""}
        </Text>
      </View>

      {/* Orders List */}
      {orders.length === 0 ? (
        renderEmptyState()
      ) : (
        <View style={styles.listContainer}>
          <ListItemOrders
            data={orders}
            loadMore={loadMore}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Silver,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.DarkGrey,
  },
  placeholder: {
    width: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: COLORS.DimGray,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Silver,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
  },
  filterChip: {
    borderRadius: 20,
    height: 36,
    backgroundColor: COLORS.lightBackground,
  },
  countContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.lightBackground,
  },
  countText: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DimGray,
  },
  listContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 20,
  },
  browseButton: {
    backgroundColor: COLORS.Crimson,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: COLORS.white,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});

export default PastOrders;
