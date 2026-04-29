import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentPreviewCardStyles } from './PaymentPreviewCard.styles';

interface PaymentPreviewCardProps {
  amount: number;
  currentBalance: number;
  newBalance: number;
  paymentStatus: string;
}

export const PaymentPreviewCard: React.FC<PaymentPreviewCardProps> = ({
  amount,
  currentBalance,
  newBalance,
  paymentStatus,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentPreviewCardStyles(colors);

  const statusColors: Record<string, { bg: string; text: string }> = {
    PAID: { bg: '#E8F5E9', text: colors.status.success },
    PARTIAL: { bg: '#FFF3E0', text: colors.accent.goldDark },
    UNPAID: { bg: '#FFEBEE', text: colors.status.error },
  };

  const statusStyle = statusColors[paymentStatus] || statusColors.UNPAID;
  const newBalanceColor = newBalance === 0 ? '#4CAF50' : '#FF9800';
  const overpayment = amount - currentBalance;

  return (
    <Surface style={styles.previewCard}>
      <Text style={styles.previewTitle}>Payment Preview</Text>
      <View style={styles.previewRow}>
        <Text style={styles.previewLabel}>Amount Being Paid</Text>
        <Text style={styles.previewValue}>{amount.toLocaleString()} FCFA</Text>
      </View>
      <View style={styles.previewRow}>
        <Text style={styles.previewLabel}>New Balance</Text>
        <Text style={[styles.previewValue, { color: newBalanceColor }]}>
          {newBalance.toLocaleString()} FCFA
        </Text>
      </View>
      {amount > currentBalance && (
        <View style={styles.previewRow}>
          <Text style={styles.overpaymentLabel}>Overpayment</Text>
          <Text style={styles.overpaymentValue}>+{overpayment.toLocaleString()} FCFA</Text>
        </View>
      )}
      <View style={styles.previewRow}>
        <Text style={styles.previewLabel}>Payment Status</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {paymentStatus}
          </Text>
        </View>
      </View>
    </Surface>
  );
};

export default PaymentPreviewCard;
