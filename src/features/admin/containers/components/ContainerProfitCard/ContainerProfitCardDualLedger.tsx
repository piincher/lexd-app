import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { ContainerProfitCardRow } from './ContainerProfitCardRow';
import { fmt } from '../../lib/formatCurrency';
import { DualLedger } from '../../types/containerProfit';

interface ContainerProfitCardDualLedgerProps {
  dualLedger: DualLedger;
  totalCBM: number;
}

export const ContainerProfitCardDualLedger: React.FC<ContainerProfitCardDualLedgerProps> = ({
  dualLedger,
  totalCBM,
}) => {
  const { colors } = useAppTheme();
  const isReconciled = dualLedger.reconciliationStatus === 'RECONCILED';
  const hasGap = dualLedger.profitGap != null && dualLedger.profitGap !== 0;
  const gapColor = (dualLedger.profitGap || 0) >= 0 ? colors.status.success : colors.status.error;

  return (
    <View style={styles.ledgerSection}>
      <Text style={styles.ledgerTitle}>Grand livre client</Text>
      <ContainerProfitCardRow
        label={`CBM facturé aux clients (${(dualLedger.clientTotalCBM ?? 0).toFixed(2)} CBM)`}
        value={fmt(dualLedger.clientTotalRevenue ?? 0)}
        valueColor={colors.text.primary}
      />
      <ContainerProfitCardRow
        label="Coût estimé (temps réel)"
        value={fmt(dualLedger.clientTotalCBM * (dualLedger.agentUnitCost || 278000))}
        valueColor={colors.status.error}
      />
      <ContainerProfitCardRow
        label="Bénéfice temps réel"
        value={`${dualLedger.realTimeProfit >= 0 ? '+' : ''}${fmt(dualLedger.realTimeProfit)}`}
        valueColor={dualLedger.realTimeProfit >= 0 ? colors.status.success : colors.status.error}
        highlight
      />

      {isReconciled && dualLedger.agentTotalCost != null && (
        <>
          <View style={styles.divider} />
          <Text style={styles.ledgerTitle}>Grand livre agent (réconcilié)</Text>
          <ContainerProfitCardRow
            label={`CBM agent final (${dualLedger.agentTotalCBM?.toFixed(2)} CBM)`}
            value={fmt(dualLedger.agentTotalCost)}
            valueColor={colors.status.error}
          />
          <ContainerProfitCardRow
            label="Bénéfice réconcilié"
            value={`${(dualLedger.reconciledProfit || 0) >= 0 ? '+' : ''}${fmt(dualLedger.reconciledProfit || 0)}`}
            valueColor={(dualLedger.reconciledProfit || 0) >= 0 ? colors.status.success : colors.status.error}
            highlight
          />
          {hasGap && (
            <ContainerProfitCardRow
              label="Écart (réel vs estimé)"
              value={`${(dualLedger.profitGap || 0) >= 0 ? '+' : ''}${fmt(dualLedger.profitGap || 0)}`}
              valueColor={gapColor}
            />
          )}
          {dualLedger.unbilledCapacityCost != null && dualLedger.unbilledCapacityCost > 0 && (
            <ContainerProfitCardRow
              label="Capacité non facturée"
              value={fmt(dualLedger.unbilledCapacityCost)}
              valueColor={colors.status.warning}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ledgerSection: {
    gap: 10,
    marginBottom: 4,
  },
  ledgerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
    marginBottom: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[100],
    marginVertical: 2,
  },
});
