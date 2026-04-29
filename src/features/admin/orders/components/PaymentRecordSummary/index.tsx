import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentRecordSummaryStyles } from './PaymentRecordSummary.styles';

interface PaymentRecordSummaryProps {
  orderCode: string;
  clientName: string;
  totalAmount: number;
  currentBalance: number;
}

export const PaymentRecordSummary: React.FC<PaymentRecordSummaryProps> = ({
  orderCode,
  clientName,
  totalAmount,
  currentBalance,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentRecordSummaryStyles(colors);

  return (
    <Surface style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Order Code</Text>
        <Text style={styles.summaryValue}>{orderCode}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Client</Text>
        <Text style={styles.summaryValue}>{clientName}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total Amount</Text>
        <Text style={styles.summaryValue}>{totalAmount.toLocaleString()} FCFA</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Current Balance Due</Text>
        <Text style={styles.balanceValue}>{currentBalance.toLocaleString()} FCFA</Text>
      </View>
    </Surface>
  );
};

export default PaymentRecordSummary;
