import React from 'react';
import { View, Text } from 'react-native';
import { usePaymentProviders } from '../../hooks/usePayments';
import type { PaymentProvider } from '../../types';

interface Props {
  provider: PaymentProvider;
  amount: number;
  styles: any;
}

export const FeeBreakdown: React.FC<Props> = ({ provider, amount, styles }) => {
  const { data } = usePaymentProviders();
  const providerInfo = data?.providers?.find(p => p.code === provider);
  if (!providerInfo?.feeExample) return null;
  const fee = providerInfo.feeExample;

  return (
    <View style={styles.feeBreakdown}>
      <Text style={styles.feeBreakdownTitle}>Fee Breakdown</Text>
      <View style={styles.feeRow}>
        <Text style={styles.feeLabel}>Subtotal</Text>
        <Text style={styles.feeValue}>{fee.amountFCFA.toLocaleString()} FCFA</Text>
      </View>
      <View style={styles.feeRow}>
        <Text style={styles.feeLabel}>Processing Fee ({providerInfo.feeExample.feePercentage})</Text>
        <Text style={styles.feeValue}>{fee.totalFeeFCFA.toLocaleString()} FCFA</Text>
      </View>
      <View style={[styles.feeRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{(fee.amountFCFA + fee.totalFeeFCFA).toLocaleString()} FCFA</Text>
      </View>
    </View>
  );
};
