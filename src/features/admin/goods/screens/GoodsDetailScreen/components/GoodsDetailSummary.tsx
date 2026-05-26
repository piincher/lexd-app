/* Hallmark · macrostructure: Narrative Workflow · component: payment-status panel
 * genre: modern-minimal · theme: brand-aligned app theme
 * Owns the PAYMENT picture only (balance-led + paid/total progress) — cost composition
 * lives in GoodsDetailFinancial, so the two no longer duplicate the same numbers.
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 */
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { getVariantColors, StatusVariant } from '../../../components/statusVariant';
import { formatCurrency } from '@src/shared/lib/currency';
import { Goods } from '../../../types';

interface GoodsDetailSummaryProps {
  goods: Goods;
}

export const GoodsDetailSummary: React.FC<GoodsDetailSummaryProps> = ({ goods }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const totalCost = goods.totalCost || 0;
  const amountPaid = goods.amountPaid || 0;
  const balanceDue = Math.max(totalCost - amountPaid, 0);
  const isSettled = totalCost > 0 && amountPaid >= totalCost;
  const progress = totalCost > 0 ? Math.min(amountPaid / totalCost, 1) : isSettled ? 1 : 0;

  let variant: StatusVariant = 'neutral';
  let label = 'À régler';
  if (isSettled) {
    variant = 'success';
    label = 'Payé';
  } else if (amountPaid > 0 && amountPaid < totalCost) {
    variant = 'warning';
    label = 'Partiel';
  } else if ((goods.paymentStatus || '').toUpperCase() === 'PAID') {
    variant = 'success';
    label = 'Payé';
  } else if ((goods.paymentStatus || '').toUpperCase() === 'PARTIAL') {
    variant = 'warning';
    label = 'Partiel';
  }
  const pv = getVariantColors(variant, colors);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.leadBlock}>
          <Text style={styles.leadLabel}>{isSettled ? 'STATUT DU PAIEMENT' : 'RESTE À PAYER'}</Text>
          <Text
            style={[styles.leadValue, { color: isSettled ? colors.status.success : colors.text.primary }]}
            numberOfLines={1}
          >
            {isSettled ? 'Soldé' : formatCurrency(balanceDue)}
          </Text>
        </View>
        <View style={[styles.pill, { backgroundColor: pv.bg }]}>
          <View style={[styles.pillDot, { backgroundColor: pv.dot }]} />
          <Text style={[styles.pillText, { color: pv.fg }]}>{label}</Text>
        </View>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${Math.round(progress * 100)}%`, backgroundColor: isSettled ? colors.status.success : colors.primary.main },
          ]}
        />
      </View>

      <View style={styles.factsRow}>
        <Text style={styles.factText}>
          <Text style={[styles.factStrong, { color: colors.status.success }]}>{formatCurrency(amountPaid)}</Text>
          <Text style={styles.factMuted}>{'  payé'}</Text>
        </Text>
        <Text style={styles.factText}>
          <Text style={styles.factMuted}>{'sur  '}</Text>
          <Text style={[styles.factStrong, { color: colors.text.primary }]}>{formatCurrency(totalCost)}</Text>
        </Text>
      </View>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      marginBottom: Theme.spacing.md,
      padding: Theme.spacing.lg,
      borderRadius: Theme.radius.xl,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...Theme.shadows.sm,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: Theme.spacing.md,
    },
    leadBlock: { flex: 1, minWidth: 0 },
    leadLabel: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.6,
      color: colors.text.secondary,
    },
    leadValue: {
      fontSize: 28,
      fontWeight: '800',
      letterSpacing: -0.5,
      marginTop: 3,
      fontVariant: ['tabular-nums'],
    },
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: Theme.radius.full,
      marginTop: 2,
    },
    pillDot: { width: 6, height: 6, borderRadius: 3 },
    pillText: { fontSize: 12, fontWeight: '700' },
    track: {
      height: 8,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.background.paper,
      overflow: 'hidden',
      marginTop: Theme.spacing.lg,
    },
    fill: {
      height: '100%',
      borderRadius: Theme.radius.full,
    },
    factsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Theme.spacing.sm,
    },
    factText: { fontSize: 13 },
    factStrong: { fontSize: 14, fontWeight: '800', fontVariant: ['tabular-nums'] },
    factMuted: { fontSize: 13, color: colors.text.secondary },
  });

export default GoodsDetailSummary;
