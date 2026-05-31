import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';
import { formatMoney, type NormalizedPaymentStatus } from './OrderCard.utils';

interface OrderCardFinanceProps {
  total: number;
  paid: number;
  balance: number;
  status: NormalizedPaymentStatus;
}

const paymentCopy = {
  PAID: { label: 'Payé', icon: 'check-circle' },
  PARTIAL: { label: 'Partiel', icon: 'progress-clock' },
  UNPAID: { label: 'Impayé', icon: 'alert-circle' },
} as const;

export const OrderCardFinance: React.FC<OrderCardFinanceProps> = ({
  total,
  paid,
  balance,
  status,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const statusColor =
    status === 'PAID' ? colors.status.success : status === 'PARTIAL' ? colors.status.warning : colors.status.error;
  const statusMeta = paymentCopy[status];

  return (
    <View style={styles.financePanel}>
      <View style={styles.financeHeader}>
        <Text style={styles.financeTitle}>Paiement</Text>
        <View style={[styles.paymentPill, { backgroundColor: statusColor + '15' }]}>
          <MaterialCommunityIcons name={statusMeta.icon} size={13} color={statusColor} />
          <Text style={[styles.paymentPillText, { color: statusColor }]}>{statusMeta.label}</Text>
        </View>
      </View>

      <View style={styles.financeGrid}>
        <View style={styles.financeMetric}>
          <Text style={styles.financeLabel}>Total</Text>
          <Text style={styles.financeValue}>{formatMoney(total)}</Text>
        </View>
        <View style={styles.financeMetric}>
          <Text style={styles.financeLabel}>Payé</Text>
          <Text style={[styles.financeValue, { color: paid > 0 ? colors.status.success : colors.text.secondary }]}>
            {paid > 0 ? formatMoney(paid) : '0 FCFA'}
          </Text>
        </View>
        <View style={styles.financeMetric}>
          <Text style={styles.financeLabel}>Solde</Text>
          <Text style={[styles.financeValue, { color: balance > 0 ? colors.status.error : colors.status.success }]}>
            {balance > 0 ? formatMoney(balance) : '0 FCFA'}
          </Text>
        </View>
      </View>
    </View>
  );
};
