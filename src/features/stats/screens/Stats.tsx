// Stats Screen - User Statistics Dashboard
// Refactored: Composition pattern with extracted components

import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeTabScreenProps } from "@src/navigations/type";
import { COLORS } from "@src/constants/Colors";
import withProtectedRoute from "@src/hoc/protected";

import { useStatsScreen } from "./hooks";
import { styles } from "./Stats.styles";
import {
  UserInfoCard,
  QuickStats,
  ShipmentChart,
  RecentShipments,
} from "./components";

const Stats: React.FC<HomeTabScreenProps<"Stats">> = () => {
  const {
    user,
    isLoading,
    isError,
    refetch,
    statusCounts,
    totalShipments,
    lastShipments,
    hasChartData,
    chartData,
  } = useStatsScreen();

  // Loading State
  if (isLoading) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: COLORS.white }]}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );
  }

  // Error State
  if (isError) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: COLORS.white }]}>
        <Text style={[styles.errorText, { color: COLORS.redShade }]}>
          Failed to load user data.
        </Text>
        <Pressable onPress={refetch} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: COLORS.redShade }]}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <UserInfoCard
          firstName={user?.firstName}
          phoneNumber={user?.phoneNumber}
          role={user?.role}
        />

        <QuickStats
          totalShipments={totalShipments}
          statusCounts={statusCounts}
        />

        <ShipmentChart
          hasChartData={hasChartData}
          chartData={chartData}
        />

        <RecentShipments shipments={lastShipments} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default withProtectedRoute(Stats);
