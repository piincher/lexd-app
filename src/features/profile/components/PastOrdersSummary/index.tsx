import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { formatCurrency } from "@src/shared/lib/currency";
import type { PastOrdersSummary as Summary } from "../../hooks/pastOrdersTransforms";
import { createStyles } from "./PastOrdersSummary.styles";

interface PastOrdersSummaryProps {
  summary: Summary;
}

export const PastOrdersSummary: React.FC<PastOrdersSummaryProps> = ({ summary }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const paymentRate = summary.total > 0 ? Math.round((summary.paid / summary.total) * 100) : 0;

  return (
    <View style={styles.panel}>
      <View style={styles.lede}>
        <View style={styles.iconWell}>
          <MaterialCommunityIcons name="archive-check-outline" size={24} color={colors.primary.main} />
        </View>
        <View style={styles.ledeCopy}>
          <Text style={styles.kicker}>{"Carnet d'expéditions"}</Text>
          <Text style={styles.value}>{summary.total}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.metricGrid}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{paymentRate}%</Text>
          <Text style={styles.metricLabel}>payées</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{summary.unpaid}</Text>
          <Text style={styles.metricLabel}>à solder</Text>
        </View>
        <View style={styles.metricWide}>
          <Text style={styles.metricValue}>{formatCurrency(summary.totalValue)}</Text>
          <Text style={styles.metricLabel}>valeur historique</Text>
        </View>
      </View>
    </View>
  );
};
