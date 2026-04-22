/**
 * SummaryCard Component
 * Displays order totals summary with active/voired CBM and totals
 */

import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { OrderSummary } from '../../types';
import { createStyles } from '../OrderTotalsBreakdownScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SummaryCardProps {
  summary: OrderSummary;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const savings = summary.originalTotal - summary.currentTotal;

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Theme.spacing.md }}>
        <Ionicons name="receipt" size={20} color={Theme.primary[600]} />
        <Text style={[styles.cardTitle, { marginLeft: Theme.spacing.sm }]}>
          Récapitulatif
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total marchandises</Text>
        <Text style={styles.summaryValue}>{summary.totalGoodsCount}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>CBM actif</Text>
        <Text style={[styles.summaryValue, styles.summaryValuePositive]}>
          {summary.activeCBM.toFixed(3)} m³
        </Text>
      </View>

      {summary.voidedCBM > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>CBM annulé</Text>
          <Text style={[styles.summaryValue, styles.summaryValueNegative]}>
            -{summary.voidedCBM.toFixed(3)} m³
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total original</Text>
        <Text style={styles.summaryValue}>
          {summary.originalTotal.toLocaleString()} FCFA
        </Text>
      </View>

      {savings > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Économies</Text>
          <Text style={[styles.summaryValue, styles.summaryValueNegative]}>
            -{savings.toLocaleString()} FCFA
          </Text>
        </View>
      )}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total actuel</Text>
        <Text style={styles.totalValue}>
          {summary.currentTotal.toLocaleString()} FCFA
        </Text>
      </View>
    </View>
  );
};
