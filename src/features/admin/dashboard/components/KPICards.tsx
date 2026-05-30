/* Hallmark · macrostructure: Workbench · component: kpi-row · tone: utilitarian
 *
 * Reference tier — quiet stats. Three changes from the previous version:
 *   1. Visual tier demoted: flat row of numbers + hairline rules. No cards,
 *      no shadows, no gradient hero. Tier-2 reference content sits behind
 *      the PriorityPanel, not alongside it.
 *   2. SMS tile removed (audit C3): duplicated the standalone SMSBalanceCard.
 *      Same data appearing twice is the kind of "I get lost" tell the audit
 *      flagged. SMS lives in its own gated card now.
 *   3. Hero route fixed (audit M5): "Marchandises en entrepôt" used to route
 *      to UnassignedGoods, which is a different list. Now routes to the main
 *      goods list — label matches destination.
 *
 * Two remaining stats:
 *   · Marchandises en entrepôt → AdminGoodsList (the warehouse view)
 *   · Conteneurs actifs        → ContainerList
 *
 * The arbitrary `pendingContainers * 10` progress bar from the old SmallKpiCard
 * is gone — there's no meaningful capacity ceiling to plot against (audit m1).
 */

import React, { useMemo } from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { navigationProps } from "@src/app/navigation/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createKPIRowStyles } from "./KPICards.styles";

export interface KPICardsProps {
  stats: {
    totalGoods: number;
    pendingContainers: number;
    smsBalance: number;
    smsBalancePct: number;
  };
}

export const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

export const KPICards: React.FC<KPICardsProps> = ({ stats }) => {
  const navigation = useNavigation<navigationProps>();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createKPIRowStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Aperçu</Text>
      <View style={styles.row}>
        <KPIItem
          value={formatNumber(stats.totalGoods)}
          // Short label — single-line clickable text (slop gate 59).
          // Long form lived in the previous hero card; that was the wrap-risk.
          label="Marchandises"
          onPress={() => navigation.navigate("AdminGoodsList")}
          styles={styles}
        />
        <View style={styles.divider} />
        <KPIItem
          value={formatNumber(stats.pendingContainers)}
          label="Conteneurs"
          onPress={() => navigation.navigate("ContainerList")}
          styles={styles}
        />
      </View>
    </View>
  );
};

interface KPIItemProps {
  value: string;
  label: string;
  onPress: () => void;
  styles: ReturnType<typeof createKPIRowStyles>;
}

const KPIItem: React.FC<KPIItemProps> = ({ value, label, onPress, styles }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    accessibilityLabel={`${label}: ${value}`}
  >
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

export default KPICards;
