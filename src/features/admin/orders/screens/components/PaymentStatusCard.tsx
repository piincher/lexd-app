import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './PaymentSection.styles';

interface PaymentStatusCardProps {
  statusConfig: {
    color: string;
    bgColor: string;
    icon: string;
    label: string;
  };
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID';
  balanceDue: number;
  styles: ReturnType<typeof createStyles>;
}

export const PaymentStatusCard: React.FC<PaymentStatusCardProps> = ({
  statusConfig,
  paymentStatus,
  balanceDue,
  styles,
}) => (
  <View style={[styles.statusCard, { backgroundColor: statusConfig.bgColor }]}>
    <View style={styles.statusIconContainer}>
      <MaterialCommunityIcons
        name={statusConfig.icon as any}
        size={32}
        color={statusConfig.color}
      />
    </View>
    <View style={styles.statusContent}>
      <Text style={[styles.statusLabel, { color: statusConfig.color }]}>
        {statusConfig.label}
      </Text>
      {paymentStatus === 'PAID' ? (
        <Text style={styles.statusAmount}>Fully Paid</Text>
      ) : (
        <Text style={styles.statusAmount}>
          {balanceDue.toLocaleString()} FCFA due
        </Text>
      )}
    </View>
  </View>
);
