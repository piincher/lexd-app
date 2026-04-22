/**
 * GoodsCardMetrics - CBM, weight, and price chips
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface GoodsCardMetricsProps {
  cbm?: number;
  weight?: number;
  price?: number;
}

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('fr-FR');
};

export const GoodsCardMetrics: React.FC<GoodsCardMetricsProps> = ({ cbm, weight, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.metric}>
          <View style={[styles.icon, { backgroundColor: Theme.primary[100] }]}>
            <Ionicons name="cube-outline" size={14} color={Theme.primary[600]} />
          </View>
          <Text style={styles.metricText}>{(cbm || 0).toFixed(3)} m³</Text>
        </View>

        <View style={styles.metric}>
          <View style={[styles.icon, { backgroundColor: `${Theme.accent.mint}20` }]}>
            <Ionicons name="scale-outline" size={14} color={Theme.accent.mint} />
          </View>
          <Text style={styles.metricText}>{weight || 0} kg</Text>
        </View>
      </View>

      <View style={styles.pricePill}>
        <Text style={styles.priceLabel}>Coût total</Text>
        <Text style={styles.priceValue}>
          {formatCurrency(price || 0)} FCFA
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: Theme.spacing.lg,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricText: {
    fontSize: Theme.typography.caption.fontSize,
    lineHeight: Theme.typography.caption.lineHeight,
    letterSpacing: Theme.typography.caption.letterSpacing,
    color: Theme.neutral[600],
  },
  pricePill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.lg,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.primary[100],
  },
  priceLabel: {
    fontSize: Theme.typography.overline.fontSize,
    lineHeight: Theme.typography.overline.lineHeight,
    letterSpacing: Theme.typography.overline.letterSpacing,
    fontWeight: Theme.typography.overline.fontWeight as '600',
    color: Theme.neutral[400],
  },
  priceValue: {
    fontSize: Theme.typography.h4.fontSize,
    lineHeight: Theme.typography.h4.lineHeight,
    fontWeight: Theme.typography.h4.fontWeight as '600',
    color: Theme.primary[700],
    letterSpacing: -0.3,
  },
});
