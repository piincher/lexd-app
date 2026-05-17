import React from 'react';
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { createStyles } from './PaymentSection.styles';

interface PaymentBreakdownProps {
  isAir: boolean;
  packageWeight?: string | number;
  cbm: string;
  unitPrice: number;
  totalPrice: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID';
  colors: {
    status: { success: string; error: string };
  };
  styles: ReturnType<typeof createStyles>;
}

export const PaymentBreakdown: React.FC<PaymentBreakdownProps> = ({
  isAir,
  packageWeight,
  cbm,
  unitPrice,
  totalPrice,
  paidAmount,
  balanceDue,
  paymentStatus,
  colors,
  styles,
}) => (
  <View style={styles.breakdown}>
    {isAir ? (
      packageWeight ? (
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Poids</Text>
          <Text style={styles.breakdownValue}>{packageWeight} kg</Text>
        </View>
      ) : null
    ) : cbm ? (
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownLabel}>Volume (CBM)</Text>
        <Text style={styles.breakdownValue}>{cbm} m³</Text>
      </View>
    ) : null}

    {unitPrice > 0 && (
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownLabel}>Prix unitaire</Text>
        <Text style={styles.breakdownValue}>
          {unitPrice.toLocaleString()} FCFA/{isAir ? 'kg' : 'm³'}
        </Text>
      </View>
    )}

    <View style={styles.breakdownRow}>
      <Text style={styles.breakdownLabel}>Prix total</Text>
      <Text style={styles.breakdownValue}>
        {totalPrice > 0 ? `${totalPrice.toLocaleString()} FCFA` : 'Non défini'}
      </Text>
    </View>

    <Divider style={{ marginVertical: 8 }} />

    <View style={styles.breakdownRow}>
      <Text style={styles.breakdownLabel}>Total Order Amount</Text>
      <Text style={styles.breakdownValue}>
        {totalPrice > 0 ? `${totalPrice.toLocaleString()} FCFA` : 'Non défini'}
      </Text>
    </View>

    <View style={styles.breakdownRow}>
      <Text style={styles.breakdownLabel}>Amount Paid</Text>
      <Text style={[styles.breakdownValue, { color: colors.status.success }]}>
        {paidAmount.toLocaleString()} FCFA
      </Text>
    </View>

    {paymentStatus !== 'PAID' && (
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownLabel}>Balance Due</Text>
        <Text style={[styles.breakdownValue, { color: colors.status.error }]}>
          {balanceDue.toLocaleString()} FCFA
        </Text>
      </View>
    )}
  </View>
);
