import React, { useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, SegmentedButtons, Text } from "react-native-paper";
import { AuthenticatedStackScreenProps } from "@src/navigation/types";
import { COLORS } from "@src/constants/Colors";

import { Header } from "@src/components/Header";
import { OrderStatsCard } from "../components/OrderStatsCard";
import { OrderChart } from "../components/OrderChart";
import { useOrderStats } from "../hooks/useOrderStats";
import { useOrderTimeline, TimelinePeriod } from "../hooks/useOrderTimeline";

export const OrdersDashboardScreen: React.FC<
  AuthenticatedStackScreenProps<"OrdersDashboard">
> = () => {
  const [period, setPeriod] = useState<TimelinePeriod>("daily");
  
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useOrderStats();
  const { data: timeline, isLoading: timelineLoading } = useOrderTimeline(period, 14);

  const isLoading = statsLoading || timelineLoading;

  const handleRefresh = () => {
    refetchStats();
  };

  if (isLoading && !stats) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Tableau de bord" showBackButton />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      </SafeAreaView>
    );
  }

  const overview = stats?.overview;
  const breakdown = stats?.manualOrderBreakdown;
  const cbmStats = stats?.cbmStats;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tableau de bord" showBackButton />
      
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.content}
      >
        {/* Overview Stats */}
        <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
        <View style={styles.statsRow}>
          <OrderStatsCard
            title="Total"
            value={overview?.totalOrders || 0}
            subtitle={`${overview?.manualOrdersPercentage || 0}% manuelles`}
          />
          <OrderStatsCard
            title="Manuelles"
            value={overview?.manualOrders || 0}
            trend="up"
            trendValue="Commandes"
          />
          <OrderStatsCard
            title="Auto"
            value={overview?.autoOrders || 0}
            subtitle="Depuis marchandises"
          />
        </View>

        {/* Manual Order Breakdown */}
        <Text style={styles.sectionTitle}>Détail commandes manuelles</Text>
        <View style={styles.statsRow}>
          <OrderStatsCard
            title="Pré-résa"
            value={breakdown?.prebooking || 0}
            subtitle="En attente"
          />
          <OrderStatsCard
            title="En attente"
            value={breakdown?.awaitingGoods || 0}
            subtitle="Goods pending"
          />
          <OrderStatsCard
            title="Liées"
            value={breakdown?.linked || 0}
            trend="up"
            trendValue="Actives"
          />
        </View>

        {/* CBM Stats */}
        <Text style={styles.sectionTitle}>Statistiques CBM</Text>
        <View style={styles.statsRow}>
          <OrderStatsCard
            title="Estimé"
            value={`${cbmStats?.totalEstimatedCbm || 0} m³`}
          />
          <OrderStatsCard
            title="Réel"
            value={`${cbmStats?.totalActualCbm || 0} m³`}
            trend={cbmStats && cbmStats.difference > 0 ? "up" : "down"}
            trendValue={`${cbmStats?.difference || 0} m³`}
          />
        </View>

        {/* Timeline Chart */}
        <Text style={styles.sectionTitle}>Évolution</Text>
        <SegmentedButtons
          value={period}
          onValueChange={(value) => setPeriod(value as TimelinePeriod)}
          buttons={[
            { value: "daily", label: "Jour" },
            { value: "weekly", label: "Semaine" },
            { value: "monthly", label: "Mois" },
          ]}
          style={styles.segmentedButtons}
        />
        
        <OrderChart data={timeline?.timeline || []} height={250} />

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Commandes récentes</Text>
        {stats?.recentManualOrders?.map((order) => (
          <View key={order._id} style={styles.recentOrder}>
            <Text style={styles.recentCode}>{order.code}</Text>
            <Text style={styles.recentClient}>{order.clientName}</Text>
            <Text style={styles.recentStatus}>{order.manualOrderStatus}</Text>
          </View>
        ))}
      </ScrollView>
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
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: COLORS.black,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  recentOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  recentCode: {
    fontWeight: "600",
    color: COLORS.blue,
  },
  recentClient: {
    flex: 1,
    marginHorizontal: 8,
    color: COLORS.darkGrey,
  },
  recentStatus: {
    fontSize: 12,
    color: COLORS.grey,
  },
});
