import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { ContainerProfitSummary } from '../../../api/statsApi';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { fmtProfitAmount } from '../ProfitOverviewCard.utils';

interface Props {
  summary: ContainerProfitSummary['summary'];
}

export const ProfitOverviewMetrics: React.FC<Props> = ({ summary }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.metrics}>
      <View style={styles.metricRow}>
        <View style={styles.metricLeft}>
          <Ionicons name="cash-outline" size={14} color={colors.text.disabled} style={styles.icon} />
          <Text style={[styles.metricLabel, { color: colors.text.secondary }]}>
            Chiffre d'affaires
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: colors.text.primary }]}>
          {fmtProfitAmount(summary.totalRevenue)}
        </Text>
      </View>
      <View style={styles.metricRow}>
        <View style={styles.metricLeft}>
          <Ionicons name="checkmark-circle-outline" size={14} color={colors.text.disabled} style={styles.icon} />
          <Text style={[styles.metricLabel, { color: colors.text.secondary }]}>
            Encaissé
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: colors.status.success }]}>
          {fmtProfitAmount(summary.totalCollected)}
        </Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.metricRow}>
        <View style={styles.metricLeft}>
          <Ionicons name="boat-outline" size={14} color={colors.text.disabled} style={styles.icon} />
          <Text style={[styles.metricLabel, { color: colors.text.secondary }]}>
            {`Coût agent (${fmtProfitAmount(summary.cbmCostPerUnit)}/CBM)`}
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: colors.status.error }]}>
          {fmtProfitAmount(summary.totalCost)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  metrics: {
    gap: 10,
    marginBottom: 14,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 6,
  },
  metricLabel: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    flex: 1,
  },
  metricValue: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  divider: {
    height: 1,
  },
});
