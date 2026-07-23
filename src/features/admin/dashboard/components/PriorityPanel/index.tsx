/* Hallmark · macrostructure: Workbench · genre: modern-minimal · tone: utilitarian
 * anchor hue: brand greens preserved for affordances; state-only accents (red / amber / neutral)
 * design-system: project tokens (useAppTheme) · designed-as-app
 *
 * À traiter — the new act-now anchor of the admin dashboard.
 *
 * Three tiles surface the first things an operator needs to act on as soon as
 * the app opens: unassigned parcels, outstanding payments, and aged
 * orphans (>= 8 days). Each tile is a Pressable that routes straight to the
 * corresponding list screen.
 *
 * State-coded colour. A tile only turns warm when there's something to do —
 * count = 0 stays neutral. The "everything green" anti-pattern is the reason
 * the audit said "I get lost"; this panel refuses to celebrate idle state.
 *
 * Replaces the OutstandingPaymentsSection + UnassignedGoodsSection above-the-
 * fold real estate. Those sections aren't deleted — they're just not the
 * dashboard's job. The detail screens are still one tap away from each tile.
 */

import React, { useMemo } from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useUnassignedGoods, useOutstandingPayments } from "../../hooks";
import { createPriorityPanelStyles } from "./styles";
import { PriorityPanelHeader } from './PriorityPanelHeader';
import { PriorityTile } from './PriorityTile';

// FCFA formatting — millions get a compact "1.2M" form, thousands "120k".
// Operators glance at orders of magnitude; full digits create reading load.
const formatFcfa = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
};

export const PriorityPanel: React.FC = () => {
  const navigation = useNavigation<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createPriorityPanelStyles(colors, isDark), [colors, isDark]);

  const unassigned = useUnassignedGoods();
  const outstanding = useOutstandingPayments();

  const isLoading = unassigned.isLoading || outstanding.isLoading;
  const hasError = !!(unassigned.error || outstanding.error);

  // Derived metrics — each tile reads one number off the hooks above.
  const unassignedCount = unassigned.totalCount ?? 0;
  const outstandingTotal = outstanding.data?.totalOutstanding ?? 0;
  const agedCount = useMemo(
    () => (unassigned.sortedGoods ?? []).filter((g) => g.daysWaiting >= 8).length,
    [unassigned.sortedGoods],
  );

  const allClear = unassignedCount === 0 && outstandingTotal === 0 && agedCount === 0;
  const openQueue = () => navigation.navigate('AdminWorkQueue');

  // ── Loading state ─────────────────────────────────────────────────
  // ONE compact skeleton row, not the 600px-tall pulse the audit flagged.
  if (isLoading) {
    return (
      <View style={styles.container}>
        <PriorityPanelHeader onPress={openQueue} styles={styles} />
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonTile} />
          <View style={styles.skeletonTile} />
          <View style={styles.skeletonTile} />
        </View>
      </View>
    );
  }

  // ── Error state ─────────────────────────────────────────────────
  // Compact inline — doesn't take over the screen. Tap retries both hooks.
  if (hasError) {
    return (
      <View style={styles.container}>
        <PriorityPanelHeader onPress={openQueue} styles={styles} />
        <Pressable
          onPress={() => {
            void outstanding.refetch();
            void unassigned.handleRefresh?.();
          }}
          style={({ pressed }) => [styles.errorRow, pressed && styles.pressed]}
          accessibilityLabel="Recharger les priorités"
        >
          <MaterialCommunityIcons name="cloud-alert" size={16} color={colors.status.error} />
          <Text style={styles.errorText}>Impossible de charger les priorités</Text>
          <Text style={styles.errorRetry}>Réessayer</Text>
        </Pressable>
      </View>
    );
  }

  // ── All-clear state ─────────────────────────────────────────────
  // Single quiet line. No card chrome, no celebration. The audit was clear:
  // an empty alert is invisible.
  if (allClear) {
    return (
      <View style={styles.container}>
        <PriorityPanelHeader onPress={openQueue} styles={styles} />
        <View style={styles.allClearRow}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={16}
            color={colors.text.secondary}
          />
          <Text style={styles.allClearText}>Aucune action requise.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PriorityPanelHeader onPress={openQueue} styles={styles} />
      <View style={styles.tilesRow}>
        <PriorityTile
          value={String(unassignedCount)}
          label="À affecter"
          severity={unassignedCount > 0 ? "warning" : "neutral"}
          onPress={() => navigation.navigate("UnassignedGoods")}
          styles={styles}
        />
        <PriorityTile
          value={`${formatFcfa(outstandingTotal)} F`}
          label="Impayés"
          severity={outstandingTotal > 0 ? "warning" : "neutral"}
          onPress={() => navigation.navigate("OutstandingPaymentsList")}
          styles={styles}
        />
        <PriorityTile
          value={String(agedCount)}
          // ≥ 8j is the operator's mental threshold — surfaced as the label
          // so the number reads as "this many sit too long" not "this many exist".
          label="Anciens ≥ 8j"
          severity={agedCount > 0 ? "critical" : "neutral"}
          onPress={() => navigation.navigate("UnassignedGoods")}
          styles={styles}
        />
      </View>
    </View>
  );
};

export default PriorityPanel;
