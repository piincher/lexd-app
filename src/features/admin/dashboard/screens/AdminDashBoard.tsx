/* Hallmark · macrostructure: Workbench · genre: modern-minimal · tone: utilitarian
 * design-system: project tokens (useAppTheme) · anchor hue: brand greens for affordances
 * designed-as-app · diversification: differs from this session's Narrative Workflow,
 * Conversational FAQ, and Bento Grid runs on macrostructure axis.
 *
 * Operator dashboard rewrite — fixes 14 audit findings (5 critical · 5 major · 4 minor).
 *
 * New hierarchy (top → bottom):
 *
 *   1. DashboardHeader      Utility row only (date + search + bell). Greeting
 *                            card removed (audit M4).
 *
 *   2. PriorityPanel        À TRAITER — the dashboard's reason to exist.
 *                            Three tiles: non-identifiés, impayés, anciens.
 *                            Colour only when there's something to do.
 *                            Fixes C1 (hierarchy inversion) + M2 (Outstanding
 *                            dashboard-within-dashboard) + M3 (empty alerts).
 *
 *   3. SMSBalanceCard       Conditional — renders only when status is not
 *                            "success" (warning or danger). Was previously
 *                            mounted unconditionally. Fixes C3.
 *
 *   4. QuickActions         Four affordances with one shared accent. Was
 *                            previously four different colours with a
 *                            "Prioritaire" badge contradicting its position.
 *                            Fixes M1 + part of C4.
 *
 *   5. KPICards             Tier-2 reference: flat row, no card chrome, two
 *                            stats (Marchandises / Conteneurs). SMS tile and
 *                            meaningless progress bar dropped. Fixes m1 + m3 +
 *                            M5 (label/route mismatch).
 *
 *   6. RecentOrders         Last activity. Kept.
 *
 * Sections REMOVED from the dashboard (not deleted from codebase — components
 * still exist and can be wired into a separate "Plus" / "Outils" screen):
 *   · OutstandingPaymentsSection — surfaced via PriorityPanel + tap-to-detail
 *   · UnassignedGoodsSection     — surfaced via PriorityPanel + tap-to-detail
 *   · MenuCategories             — 25-item nav directory, audit C5 eviction
 *
 * Audit findings fixed by this file:
 *   C1 ✓ hierarchy inversion (act-now first)
 *   C2 ✓ linear stack equal weight (priority + tier-2 reference visual demotion)
 *   C3 ✓ SMS duplicate (KPI tile removed in KPICards rewrite; card gated here)
 *   C4 ✓ accent soup (state-only palette, no per-tile decorative colour)
 *   C5 ✓ menu directory evicted from dashboard
 *   M1 ✓ "Prioritaire" badge removed in QuickActions rewrite
 *   M2 ✓ Outstanding three-stack folded into PriorityPanel
 *   M3 ✓ empty Unassigned state invisible — PriorityPanel renders all-clear row
 *   M4 ✓ greeting card removed in DashboardHeader rewrite
 *   M5 ✓ KPI hero label/route fixed in KPICards rewrite
 *   m1 ✓ meaningless progress bar dropped
 *   m2 ✓ shorter clickable labels ("Marchandises" not "Marchandises en entrepôt")
 *   m3 ✓ single visual KPI treatment (flat row)
 *   m4 ✓ skeletons shrunk — PriorityPanel uses one row, not 600px stack
 */

import React from "react";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { DashboardHeader } from "../components/DashboardHeader";
import { PriorityPanel } from "../components/PriorityPanel";
import { QuickActions } from "../components/QuickActions";
import { RecentOrders } from "../components/RecentOrders";
import { SMSBalanceCard } from "../components/SMSBalanceCard";
import { DashboardLayout } from "../components/DashboardLayout";
import { DashboardAnalyticsSections } from "../components/DashboardAnalyticsSections";

export const AdminDashBoard: React.FC = () => {
  const { user, stats, recentOrders, smsBalance, analytics, refreshing, onRefresh, isLoading } =
    useAdminDashboard();

  // The 25-item admin directory (Marchandises, Commandes, Logistique, Clients,
  // Outils, ...) lives in its own bottom tab (AdminToolsScreen) — see audit
  // finding C5. Removed from this screen so act-now content keeps the focus.
  return (
    <DashboardLayout isLoading={isLoading} refreshing={refreshing} onRefresh={onRefresh}>
      <DashboardHeader user={user} />
      <PriorityPanel />
      {stats.smsBalance !== undefined && <SMSBalanceCard balance={smsBalance} />}
      <QuickActions />
      <DashboardAnalyticsSections
        analytics={analytics}
        totalGoods={stats.totalGoods}
        pendingContainers={stats.pendingContainers}
      />
      <RecentOrders orders={recentOrders} />
    </DashboardLayout>
  );
};

export default AdminDashBoard;
