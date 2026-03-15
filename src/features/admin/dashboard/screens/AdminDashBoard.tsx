/**
 * AdminDashBoard - Admin dashboard screen
 * SRP: Layout composition ONLY (<100 lines)
 * Following Feature-Based Architecture
 */

import React from "react";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import {
  DashboardHeader,
  KPICards,
  SMSBalanceCard,
  QuickActions,
  RecentOrders,
  MenuCategories,
} from "../components";

export const AdminDashBoard: React.FC = () => {
  const { user, stats, recentOrders, smsBalance, refreshing, onRefresh } = useAdminDashboard();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <DashboardHeader user={user} />
        <KPICards stats={stats} />
        <SMSBalanceCard balance={smsBalance} />
        <QuickActions />
        <RecentOrders orders={recentOrders} />
        <MenuCategories />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollContainer: {
    padding: 16,
  },
});

export default AdminDashBoard;
