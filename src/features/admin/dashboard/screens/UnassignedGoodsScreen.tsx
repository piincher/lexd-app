import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useUnassignedGoods } from "../hooks";
import { UnassignedGoodsItem } from "../types";

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

export const UnassignedGoodsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { data, isLoading, refetch } = useUnassignedGoods();

  const renderItem = ({ item }: { item: UnassignedGoodsItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("GoodsDetail", { goodsId: item.goodsId })}
    >
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="cube" size={24} color="#1a5f2a" />
        </View>
        <View style={styles.info}>
          <Text style={styles.goodsId}>{item.goodsId}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {item.description || "No description"}
          </Text>
          <Text style={styles.client}>{item.clientName}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={[styles.daysText, { color: getBadgeColor(item.daysWaiting) }]}>
            {item.daysWaiting}j
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.date}>Reçu: {formatDate(item.receivedAt)}</Text>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Marchandises Non Assignées</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={data?.oldestGoods || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.goodsId}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
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
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
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
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  client: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  daysText: {
    fontSize: 13,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  date: {
    fontSize: 13,
    color: "#9CA3AF",
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
