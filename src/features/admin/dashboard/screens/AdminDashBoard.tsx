import React from "react";
import { ScrollView, RefreshControl, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { DashboardHeader } from "../components/DashboardHeader";
import { KPICards } from "../components/KPICards";
import { OutstandingPaymentsSection } from "../components/OutstandingPaymentsSection";
import { UnassignedGoodsSection } from "../components/UnassignedGoodsSection";
import { SMSBalanceCard } from "../components/SMSBalanceCard";
import { QuickActions } from "../components/QuickActions";
import { RecentOrders } from "../components/RecentOrders";
import { MenuCategories } from "../components/MenuCategories";
import { useAppTheme } from "@src/providers/ThemeProvider";

const DashboardSkeleton: React.FC<{ bg: string; block: string }> = ({ bg, block }) => (
  <View style={{ padding: 16 }}>
    <View style={[styles.skelHero, { backgroundColor: block }]} />
    <View style={[styles.skelKpiHero, { backgroundColor: block }]} />
    <View style={styles.skelRow}>
      <View style={[styles.skelKpiSmall, { backgroundColor: block }]} />
      <View style={[styles.skelKpiSmall, { backgroundColor: block }]} />
    </View>
    <View style={[styles.skelSection, { backgroundColor: block }]} />
    <View style={[styles.skelSection, { backgroundColor: block }]} />
  </View>
);

export const AdminDashBoard: React.FC = () => {
  const { user, stats, recentOrders, smsBalance, refreshing, onRefresh, isLoading } =
    useAdminDashboard();
  const { colors, isDark } = useAppTheme();

  const blockColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background.default }]}
      >
        <DashboardSkeleton bg={colors.background.default} block={blockColor} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.main}
            colors={[colors.primary.main]}
          />
        }
      >
        <DashboardHeader user={user} />
        <KPICards stats={stats} />
        <OutstandingPaymentsSection />
        <UnassignedGoodsSection />
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
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  skelHero: {
    height: 170,
    borderRadius: 24,
    marginBottom: 20,
  },
  skelKpiHero: {
    height: 120,
    borderRadius: 20,
    marginBottom: 12,
  },
  skelRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  skelKpiSmall: {
    flex: 1,
    height: 130,
    borderRadius: 18,
  },
  skelSection: {
    height: 140,
    borderRadius: 18,
    marginBottom: 16,
  },
});

export default AdminDashBoard;
