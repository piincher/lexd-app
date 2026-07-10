/**
 * DashboardAnalyticsSections - Mission control data sections for the admin home screen
 * Composes KPI overview, revenue trend, recent payments, top customers, and warehouse snapshot.
 */

import React from "react";
import { View } from "react-native";
import type { DashboardData } from "@src/shared/types/adminDashboard";
import { DashboardCollapsibleSection } from "./DashboardCollapsibleSection";
import { DashboardKPIOverview } from "./DashboardKPIOverview";
import { DashboardRevenueTrend } from "./DashboardRevenueTrend";
import { DashboardRecentPayments } from "./DashboardRecentPayments";
import { DashboardTopCustomers } from "./DashboardTopCustomers";
import { DashboardWarehouseSnapshot } from "./DashboardWarehouseSnapshot";

export interface DashboardAnalyticsSectionsProps {
  analytics?: DashboardData;
  totalGoods: number;
  pendingContainers: number;
}

export const DashboardAnalyticsSections: React.FC<DashboardAnalyticsSectionsProps> = ({
  analytics,
  totalGoods,
  pendingContainers,
}) => {
  if (!analytics) {
    return null;
  }

  const { kpis, revenue, recentPayments, topCustomers } = analytics;

  return (
    <View>
      <DashboardCollapsibleSection title="Vue d'ensemble" icon="stats-chart" defaultExpanded>
        <DashboardKPIOverview kpis={kpis} outstanding={analytics.outstanding} />
      </DashboardCollapsibleSection>

      <DashboardCollapsibleSection title="Tendance des revenus" icon="trending-up" defaultExpanded>
        <DashboardRevenueTrend revenue={revenue} />
      </DashboardCollapsibleSection>

      <DashboardCollapsibleSection title="Paiements récents" icon="cash-outline" defaultExpanded>
        <DashboardRecentPayments payments={recentPayments} />
      </DashboardCollapsibleSection>

      <DashboardCollapsibleSection title="Top clients" icon="people-outline" defaultExpanded>
        <DashboardTopCustomers customers={topCustomers} />
      </DashboardCollapsibleSection>

      <DashboardCollapsibleSection title="Aperçu entrepôt" icon="cube-outline" defaultExpanded>
        <DashboardWarehouseSnapshot
          totalGoods={totalGoods}
          pendingContainers={pendingContainers}
          activeContainers={kpis.activeContainers}
          goodsInTransit={kpis.goodsInTransit}
          pendingPayments={kpis.pendingPayments}
        />
      </DashboardCollapsibleSection>
    </View>
  );
};

export default DashboardAnalyticsSections;
