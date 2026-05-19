import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "@src/shared/types/order";
import { STATUS_CONFIG } from "../../lib/constants";
import { useHaptics } from "../../hooks/useHaptics";

interface OrderListProps {
  orders: productType[];
  userId: string;
}

const OrderRow: React.FC<{ order: productType }> = React.memo(({ order }) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();
  const navigation = useNavigation<NavigationProp<any>>();
  const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

  return (
    <TouchableOpacity
      onPress={() => {
        trigger("light");
        navigation.navigate("OrderDetail", { id: order._id });
      }}
      style={[styles.row, { backgroundColor: colors.background.card, borderColor: colors.neutral[200] }]}
      accessibilityRole="button"
    >
      <View style={[styles.iconCircle, { backgroundColor: `${status?.color}15` }]}>
        <Ionicons name={status?.icon as any || "cube"} size={20} color={status?.color || colors.text.disabled} />
      </View>
      <View style={styles.info}>
        <Text style={[styles.code, { color: colors.text.primary }]}>#{order.code}</Text>
        <Text style={[styles.date, { color: colors.text.secondary }]}>{date}</Text>
      </View>
      <View style={[styles.pill, { backgroundColor: `${status?.color}15` }]}>
        <Text style={[styles.pillText, { color: status?.color }]}>{status?.label || order.status}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.text.disabled} />
    </TouchableOpacity>
  );
});

OrderRow.displayName = "OrderRow";

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const { colors } = useAppTheme();

  const renderItem = useCallback(({ item }: { item: productType }) => <OrderRow order={item} />, []);
  const keyExtractor = useCallback((item: productType) => item._id || item.code || Math.random().toString(), []);

  if (orders.length === 0) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Toutes les Commandes ({orders.length})</Text>
      {orders.map((order) => (
        <OrderRow key={order._id || order.code} order={order} />
      ))}
    </View>
  );
};

const styles = {
  container: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  info: {
    flex: 1,
  },
  code: {
    fontSize: 15,
    fontWeight: "700" as const,
  },
  date: {
    fontSize: 12,
    fontWeight: "500" as const,
    marginTop: 2,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "700" as const,
  },
};
