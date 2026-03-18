import React, { useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, Button, IconButton } from "react-native-paper";
import { AuthenticatedStackScreenProps } from "@src/navigation/types";
import { COLORS } from "@src/constants/Colors";

import { Header } from "@src/components/Header";
import { useManualOrders } from "../hooks/useManualOrders";
import { useManualOrderFilters } from "../hooks/useManualOrderFilters";
import { ManualOrderCard } from "../components/ManualOrderCard";
import { ManualOrderSearchBar } from "../components/ManualOrderSearchBar";
import { ManualOrderFilterTabs } from "../components/ManualOrderFilterTabs";
import { OrderFiltersModal } from "../components/OrderFiltersModal";
import { ManualOrderActions } from "../components/ManualOrderActions";
import { CancelOrderDialog } from "../components/CancelOrderDialog";
import { useConvertPrebooking } from "../hooks/useConvertPrebooking";
import { useCancelManualOrder } from "../hooks/useCancelManualOrder";

type FilterStatus = "ALL" | "AWAITING_GOODS" | "PREBOOKING" | "LINKED";

export const SelectManualOrderScreen: React.FC<
  AuthenticatedStackScreenProps<"SelectManualOrder">
> = ({ navigation, route }) => {
  const { goodsId } = route.params || {};
  const [search, setSearch] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState<any>(null);
  const [cancelDialogVisible, setCancelDialogVisible] = useState(false);

  const {
    filters,
    updateFilter,
    clearFilters,
    activeFilterCount,
    isFilterModalVisible,
    setIsFilterModalVisible,
  } = useManualOrderFilters({
    status: "AWAITING_GOODS", // Default filter
  });

  const { data, isLoading, isRefreshing, refetch } = useManualOrders({
    status: filters.status,
    search: search || undefined,
  });

  const { mutate: convertPrebooking } = useConvertPrebooking();
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelManualOrder({
    onSuccess: () => {
      setCancelDialogVisible(false);
      setSelectedOrderForAction(null);
    },
  });

  const handleSelect = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleConfirm = () => {
    if (selectedOrderId && goodsId) {
      navigation.navigate("ConfirmGoodsAssignment", {
        orderId: selectedOrderId,
        goodsId,
      });
    }
  };

  const handleEdit = (order: any) => {
    navigation.navigate("EditManualOrder", { order });
    setSelectedOrderForAction(null);
  };

  const handleConvert = (order: any) => {
    convertPrebooking({ orderId: order._id });
    setSelectedOrderForAction(null);
  };

  const handleCancel = (order: any) => {
    setSelectedOrderForAction(order);
    setCancelDialogVisible(true);
  };

  const handleConfirmCancel = (reason: string) => {
    if (selectedOrderForAction) {
      cancelOrder({ orderId: selectedOrderForAction._id, reason });
    }
  };

  const handleAssignGoods = (order: any) => {
    setSelectedOrderId(order._id);
  };

  const orders = data?.orders || [];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Sélectionner une commande"
        showBackButton
      />

      <ManualOrderFilterTabs
        activeFilter={filters.status || "ALL"}
        onChange={(status) => updateFilter("status", status)}
      />

      <View style={styles.filterBar}>
        <ManualOrderSearchBar
          value={search}
          onChangeText={setSearch}
        />
        <IconButton
          icon="filter-variant"
          size={24}
          onPress={() => setIsFilterModalVisible(true)}
          style={styles.filterButton}
          badge={activeFilterCount > 0}
        />
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            Aucune commande trouvée
          </Text>
          <Text style={styles.emptySubtext}>
            Créez une commande manuelle d'abord
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ManualOrderCard
              order={item}
              selected={selectedOrderId === item._id}
              onPress={() => handleSelect(item._id)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refetch} />
          }
          contentContainerStyle={styles.listContent}
        />
      )}

      {selectedOrderForAction && (
        <ManualOrderActions
          order={selectedOrderForAction}
          onEdit={() => handleEdit(selectedOrderForAction)}
          onConvert={() => handleConvert(selectedOrderForAction)}
          onCancel={() => handleCancel(selectedOrderForAction)}
          onAssignGoods={() => handleAssignGoods(selectedOrderForAction)}
        />
      )}

      <CancelOrderDialog
        visible={cancelDialogVisible}
        orderCode={selectedOrderForAction?.code || ""}
        onDismiss={() => setCancelDialogVisible(false)}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
      />

      <OrderFiltersModal
        visible={isFilterModalVisible}
        filters={filters}
        onDismiss={() => setIsFilterModalVisible(false)}
        onApply={(newFilters) => {
          // Apply filters
          Object.entries(newFilters).forEach(([key, value]) => {
            updateFilter(key as any, value);
          });
        }}
        onClear={clearFilters}
      />

      {selectedOrderId && (
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            Confirmer la sélection
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 100,
  },
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    margin: 0,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  confirmButton: {
    borderRadius: 8,
  },
});
