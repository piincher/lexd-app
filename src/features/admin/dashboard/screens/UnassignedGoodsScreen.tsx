import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "@src/constants/Theme";
import { NotificationBell } from "@src/features/notifications";

import { useUnassignedGoods } from "../hooks/useUnassignedGoods";
import { ClientInfo } from "@src/features/admin/goods/types";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
};

const getBadgeColor = (days: number) => {
  if (days >= 8) return "#EF4444";
  if (days >= 4) return "#F59E0B";
  return "#10B981";
};

const getClientInfo = (clientId: string | ClientInfo | undefined) => {
  if (!clientId || typeof clientId === "string") return { name: "Inconnu", phone: "" };
  return {
    name: `${clientId.firstName} ${clientId.lastName}`,
    phone: clientId.phoneNumber || "",
  };
};

export const UnassignedGoodsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { sortedGoods, isLoading, handleRefresh } = useUnassignedGoods();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Marchandises Non Assignées</Text>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={24}
          color="#1F2937"
        />
      </View>

      <FlashList
        data={sortedGoods}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => {
          const { name, phone } = getClientInfo(item.clientId);
          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.75}
              onPress={() => navigation.navigate("GoodsDetail", { goodsId: item._id })}
            >
              <View style={styles.row}>
                <View style={styles.iconContainer}>
                  <Ionicons name="cube" size={22} color="#1a5f2a" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.goodsId}>{item.goodsId}</Text>
                  <Text style={styles.description} numberOfLines={1}>
                    {item.description || "Aucune description"}
                  </Text>
                  <Text style={styles.client}>{name}</Text>
                  {phone ? <Text style={styles.phone}>{phone}</Text> : null}
                </View>
                <View style={styles.right}>
                  <View style={[styles.badge, { borderColor: getBadgeColor(item.daysWaiting) }]}>
                    <Text style={[styles.daysText, { color: getBadgeColor(item.daysWaiting) }]}>
                      {item.daysWaiting}j
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" style={{ marginTop: 8 }} />
                </View>
              </View>
              <View style={styles.footer}>
                <Ionicons name="time-outline" size={13} color="#9CA3AF" />
                <Text style={styles.date}>
                  {"  "}Reçu: {formatDate(item.receivedAt)}
                </Text>
                <View style={styles.modeBadge}>
                  <Text style={styles.modeText}>{(item as any).shippingMode || "—"}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="checkmark-circle" size={64} color="#10B981" />
            <Text style={styles.emptyText}>Aucune marchandise en attente</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
  },
  count: {
    fontSize: 13,
    fontWeight: "700",
    color: "white",
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: "hidden",
    minWidth: 24,
    textAlign: "center",
  },
  list: {
    padding: 16,
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
    backgroundColor: "#F0FDF4",
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
    color: "#1F2937",
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  client: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginTop: 4,
  },
  phone: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 1,
  },
  right: {
    alignItems: "center",
    marginLeft: 8,
  },
  badge: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  daysText: {
    fontSize: 12,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
    flex: 1,
  },
  modeBadge: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  modeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#3B82F6",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 16,
  },
});

export default UnassignedGoodsScreen;
