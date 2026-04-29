import React from "react";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { DashboardHeader } from "../components/DashboardHeader";
import { KPICards } from "../components/KPICards";
import { OutstandingPaymentsSection } from "../components/OutstandingPaymentsSection";
import { UnassignedGoodsSection } from "../components/UnassignedGoodsSection";
import { QuickActions } from "../components/QuickActions";
import { RecentOrders } from "../components/RecentOrders";
import { MenuCategories } from "../components/MenuCategories";
import { SMSBalanceCard } from "../components/SMSBalanceCard";
import { DashboardLayout } from "../components/DashboardLayout";

export const AdminDashBoard: React.FC = () => {
  const { user, stats, recentOrders, smsBalance, refreshing, onRefresh, isLoading } =
    useAdminDashboard();

  return (
    <DashboardLayout isLoading={isLoading} refreshing={refreshing} onRefresh={onRefresh}>
      <DashboardHeader user={user} />
      {stats.smsBalance !== undefined && (
        <SMSBalanceCard balance={smsBalance} />
      )}
      <KPICards stats={stats} />
      <OutstandingPaymentsSection />
      <UnassignedGoodsSection />
      <QuickActions />
      <RecentOrders orders={recentOrders} />
      <MenuCategories />
    </DashboardLayout>
  );
};

export default AdminDashBoard;
