import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export interface DualLedger {
  clientTotalCBM: number;
  clientTotalRevenue: number;
  agentTotalCBM: number | null;
  agentUnitCost: number;
  agentTotalCost: number | null;
  realTimeProfit: number;
  reconciledProfit: number | null;
  profitGap: number | null;
  unbilledCapacityCost: number | null;
  reconciliationStatus: 'PENDING' | 'RECONCILED';
  reconciledAt?: string | null;
}

export interface CbmProfit {
  revenue: number;
  collected: number;
  cost: number;
  profit: number;
  profitMargin: number;
  totalCBM: number;
  cbmCostPerUnit: number;
  dualLedger?: DualLedger;
}

interface ContainerProfitCardProps {
  cbmProfit: CbmProfit;
  onReconcile?: () => void;
}

const fmt = (amount: number): string =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const Row: React.FC<{ label: string; value: string; valueColor?: string; highlight?: boolean }> = ({
  label,
  value,
  valueColor = '#1F2937',
  highlight = false,
}) => (
  <View style={[styles.row, highlight && styles.rowHighlight]}>
    <Text style={[styles.rowLabel, highlight && styles.rowLabelHighlight]}>{label}</Text>
    <Text style={[styles.rowValue, { color: valueColor }, highlight && styles.rowValueHighlight]}>{value}</Text>
  </View>
);

export const ContainerProfitCard: React.FC<ContainerProfitCardProps> = ({ cbmProfit, onReconcile }) => {
  const { revenue, collected, cost, profit, profitMargin, totalCBM, cbmCostPerUnit, dualLedger } = cbmProfit;
  const isProfit = profit >= 0;
  const profitColor = isProfit ? '#10B981' : '#EF4444';

  const dl = dualLedger;
  const isReconciled = dl?.reconciliationStatus === 'RECONCILED';
  const hasGap = dl?.profitGap != null && dl.profitGap !== 0;
  const gapColor = (dl?.profitGap || 0) >= 0 ? '#10B981' : '#EF4444';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2' }]}>
          <Ionicons name="trending-up" size={20} color={profitColor} />
        </View>
        <Text style={styles.title}>Rentabilité CBM</Text>
        <View style={[styles.marginBadge, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2' }]}>
          <Text style={[styles.marginText, { color: profitColor }]}>
            {isProfit ? '+' : ''}{profitMargin.toFixed(1)}%
          </Text>
        </View>
      </View>

      {/* Reconciliation status pill */}
      {dl && (
        <View style={[styles.statusPill, { backgroundColor: isReconciled ? '#ECFDF5' : '#FEF3C7' }]}>
          <Ionicons
            name={isReconciled ? 'checkmark-circle' : 'time'}
            size={14}
            color={isReconciled ? '#10B981' : '#F59E0B'}
          />
          <Text style={[styles.statusText, { color: isReconciled ? '#10B981' : '#F59E0B' }]}>
            {isReconciled ? 'Réconcilié' : 'En attente de réconciliation'}
          </Text>
          {dl.reconciledAt && (
            <Text style={styles.statusDate}>
              {' '}(le {new Date(dl.reconciledAt).toLocaleDateString('fr-FR')})
            </Text>
          )}
        </View>
      )}

      {/* Profit highlight */}
      <View style={[styles.profitBox, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2', borderColor: profitColor + '40' }]}>
        <Text style={styles.profitLabel}>{isProfit ? 'Bénéfice' : 'Perte'}</Text>
        <Text style={[styles.profitValue, { color: profitColor }]}>
          {isProfit ? '+' : ''}{fmt(profit)}
        </Text>
        {dl && (
          <Text style={styles.profitSub}>
            Client: {dl.clientTotalCBM.toFixed(2)} CBM × {fmt(300000)}
            {'  ·  '}
            Agent: {(dl.agentTotalCBM ?? totalCBM).toFixed(2)} CBM × {fmt(dl.agentUnitCost || 278000)}
          </Text>
        )}
      </View>

      {/* Dual-ledger details */}
      {dl && (
        <View style={styles.ledgerSection}>
          <Text style={styles.ledgerTitle}>Grand livre client</Text>
          <Row
            label={`CBM facturé aux clients (${dl.clientTotalCBM.toFixed(2)} CBM)`}
            value={fmt(dl.clientTotalRevenue)}
            valueColor="#1F2937"
          />
          <Row
            label="Coût estimé (temps réel)"
            value={fmt(dl.clientTotalCBM * (dl.agentUnitCost || 278000))}
            valueColor="#EF4444"
          />
          <Row
            label="Bénéfice temps réel"
            value={`${dl.realTimeProfit >= 0 ? '+' : ''}${fmt(dl.realTimeProfit)}`}
            valueColor={dl.realTimeProfit >= 0 ? '#10B981' : '#EF4444'}
            highlight
          />

          {isReconciled && dl.agentTotalCost != null && (
            <>
              <View style={styles.divider} />
              <Text style={styles.ledgerTitle}>Grand livre agent (réconcilié)</Text>
              <Row
                label={`CBM agent final (${dl.agentTotalCBM?.toFixed(2)} CBM)`}
                value={fmt(dl.agentTotalCost)}
                valueColor="#EF4444"
              />
              <Row
                label="Bénéfice réconcilié"
                value={`${(dl.reconciledProfit || 0) >= 0 ? '+' : ''}${fmt(dl.reconciledProfit || 0)}`}
                valueColor={(dl.reconciledProfit || 0) >= 0 ? '#10B981' : '#EF4444'}
                highlight
              />
              {hasGap && (
                <Row
                  label="Écart (réel vs estimé)"
                  value={`${(dl.profitGap || 0) >= 0 ? '+' : ''}${fmt(dl.profitGap || 0)}`}
                  valueColor={gapColor}
                />
              )}
              {dl.unbilledCapacityCost != null && dl.unbilledCapacityCost > 0 && (
                <Row
                  label="Capacité non facturée"
                  value={fmt(dl.unbilledCapacityCost)}
                  valueColor="#F59E0B"
                />
              )}
            </>
          )}
        </View>
      )}

      {/* Legacy detail rows */}
      {!dl && (
        <View style={styles.details}>
          <Row label="Chiffre d'affaires (CA)" value={fmt(revenue)} />
          <Row label="Montant encaissé" value={fmt(collected)} valueColor="#10B981" />
          <View style={styles.divider} />
          <Row
            label={`Coût agent (${totalCBM.toFixed(2)} CBM × ${fmt(cbmCostPerUnit)}/CBM)`}
            value={fmt(cost)}
            valueColor="#EF4444"
          />
        </View>
      )}

      {/* Reconcile button */}
      {dl && !isReconciled && onReconcile && (
        <TouchableOpacity onPress={onReconcile} style={styles.reconcileButton} activeOpacity={0.7}>
          <Ionicons name="sync" size={18} color={Theme.colors.background.card} />
          <Text style={styles.reconcileText}>Réconcilier avec l'agent</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  marginBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  marginText: {
    fontSize: 13,
    fontWeight: '700',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusDate: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  profitBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  profitLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profitValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  profitSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
  },
  ledgerSection: {
    gap: 10,
    marginBottom: 4,
  },
  ledgerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
    marginBottom: 2,
  },
  details: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  rowHighlight: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: -4,
  },
  rowLabel: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    flexShrink: 1,
  },
  rowLabelHighlight: {
    fontWeight: '600',
    color: '#374151',
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  rowValueHighlight: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.neutral[100],
    marginVertical: 2,
  },
  reconcileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 14,
  },
  reconcileText: {
    color: Theme.colors.background.card,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ContainerProfitCard;
