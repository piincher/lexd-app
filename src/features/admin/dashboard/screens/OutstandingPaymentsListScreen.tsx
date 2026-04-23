import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NotificationBell } from "@src/features/notifications";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { useOutstandingPaymentsList } from "../hooks/useOutstandingPaymentsList";

const formatCurrency = (amount: number) =>
  `${Math.round(amount).toLocaleString("fr-FR")} FCFA`;

const getStatusConfig = (status: string) => {
  if (status === "PARTIAL") {
    return { label: "Partiel", color: "#F59E0B", bg: "#FFF7ED" };
  }
  return { label: "Impayé", color: "#EF4444", bg: "#FEF2F2" };
};

export const OutstandingPaymentsListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDark } = useAppTheme();
  const {
    items,
    pagination,
    isLoading,
    isRefetching,
    search,
    status,
    handleRefresh,
    handleSearch,
    handleStatusChange,
    handleNextPage,
    handlePrevPage,
  } = useOutstandingPaymentsList();

  const [localSearch, setLocalSearch] = useState(search);

  const onSearchSubmit = () => {
    handleSearch(localSearch);
  };

  const onClearSearch = () => {
    setLocalSearch("");
    handleSearch("");
  };

  const renderItem = ({ item }: { item: any }) => {
    const statusConfig = getStatusConfig(item.paymentStatus);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.75}
        onPress={() =>
          navigation.navigate("AdminGoodsDetail", { goodsId: item._id })
        }
      >
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="cash-outline" size={22} color="#EF4444" />
          </View>
          <View style={styles.info}>
            <Text style={styles.goodsId}>{item.goodsId}</Text>
            <Text style={styles.description} numberOfLines={1}>
              {item.description || "Aucune description"}
            </Text>
            <Text style={styles.client}>{item.clientName}</Text>
            {item.phoneNumber ? (
              <Text style={styles.phone}>{item.phoneNumber}</Text>
            ) : null}
          </View>
          <View style={styles.right}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusConfig.bg },
              ]}
            >
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Theme.colors.text.muted}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Total</Text>
            <Text style={styles.metricValue}>
              {formatCurrency(item.totalCost)}
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Payé</Text>
            <Text style={styles.metricValuePaid}>
              {formatCurrency(item.amountPaid)}
            </Text>
          </View>
          <View style={[styles.metric, styles.metricHighlight]}>
            <Text style={styles.metricLabel}>Reste</Text>
            <Text style={styles.metricValueDue}>
              {formatCurrency(item.balanceDue)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Impayés</Text>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={24}
          color={Theme.colors.text.primary}
        />
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Theme.colors.text.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un client ou ID..."
            value={localSearch}
            onChangeText={setLocalSearch}
            onSubmitEditing={onSearchSubmit}
            returnKeyType="search"
          />
          {localSearch.length > 0 && (
            <TouchableOpacity onPress={onClearSearch}>
              <Ionicons name="close-circle" size={18} color={Theme.colors.text.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, !status && styles.filterChipActive]}
          onPress={() => handleStatusChange(undefined)}
        >
          <Text style={[styles.filterChipText, !status && styles.filterChipTextActive]}>
            Tous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, status === "UNPAID" && styles.filterChipActive]}
          onPress={() => handleStatusChange("UNPAID")}
        >
          <Text style={[styles.filterChipText, status === "UNPAID" && styles.filterChipTextActive]}>
            Impayés
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, status === "PARTIAL" && styles.filterChipActive]}
          onPress={() => handleStatusChange("PARTIAL")}
        >
          <Text style={[styles.filterChipText, status === "PARTIAL" && styles.filterChipTextActive]}>
            Partiels
          </Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={items}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="checkmark-circle" size={64} color="#10B981" />
            <Text style={styles.emptyText}>Aucun impayé trouvé</Text>
          </View>
        }
        ListFooterComponent={
          pagination && pagination.pages > 1 ? (
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.pageButton, pagination.page <= 1 && styles.pageButtonDisabled]}
                onPress={handlePrevPage}
                disabled={pagination.page <= 1}
              >
                <Ionicons name="chevron-back" size={18} color={pagination.page <= 1 ? "#9CA3AF" : "#1F2937"} />
              </TouchableOpacity>
              <Text style={styles.pageText}>
                Page {pagination.page} / {pagination.pages}
              </Text>
              <TouchableOpacity
                style={[
                  styles.pageButton,
                  pagination.page >= pagination.pages && styles.pageButtonDisabled,
                ]}
                onPress={handleNextPage}
                disabled={pagination.page >= pagination.pages}
              >
                <Ionicons name="chevron-forward" size={18} color={pagination.page >= pagination.pages ? "#9CA3AF" : "#1F2937"} />
              </TouchableOpacity>
            </View>
          ) : null
        }
      />

      {isLoading && !isRefetching && (
        <View style={[styles.loadingOverlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }]}>
          <ActivityIndicator size="large" color="#EF4444" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: Theme.colors.text.primary,
    flex: 1,
    textAlign: "center",
  },
  countBadge: {
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    minWidth: 28,
    alignItems: "center",
  },
  countText: {
    fontSize: 13,
    fontWeight: "700",
    color: "white",
  },
  searchRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Theme.colors.background.card,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.background.paper,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.text.primary,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Theme.colors.background.paper,
  },
  filterChipActive: {
    backgroundColor: "#1F2937",
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text.secondary,
  },
  filterChipTextActive: {
    color: "white",
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  goodsId: {
    fontSize: 15,
    fontWeight: "700",
    color: Theme.colors.text.primary,
  },
  description: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  client: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text.secondary,
    marginTop: 4,
  },
  phone: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    marginTop: 1,
  },
  right: {
    alignItems: "center",
    marginLeft: 8,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    gap: 8,
  },
  metric: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  metricHighlight: {
    backgroundColor: "#FEF2F2",
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Theme.colors.text.disabled,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: "700",
    color: Theme.colors.text.primary,
  },
  metricValuePaid: {
    fontSize: 13,
    fontWeight: "700",
    color: "#10B981",
  },
  metricValueDue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EF4444",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
  },
  emptyText: {
    fontSize: 16,
    color: Theme.colors.text.secondary,
    marginTop: 16,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 8,
    paddingBottom: 24,
  },
  pageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.background.card,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pageButtonDisabled: {
    backgroundColor: Theme.colors.background.paper,
  },
  pageText: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.text.secondary,
    minWidth: 80,
    textAlign: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OutstandingPaymentsListScreen;
