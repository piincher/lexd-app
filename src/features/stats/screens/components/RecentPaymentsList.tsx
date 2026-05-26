/**
 * RecentPaymentsList
 * SRP: Displays recent payments from the v2 dashboard endpoint
 * Hallmark: minimal flat list, no card wrapper, hairline separators
 */

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RecentPayment } from '../../types';
import { getStyles } from './RecentPaymentsList.styles';
import { PaymentRow } from './PaymentRow';

interface RecentPaymentsListProps {
  payments: RecentPayment[];
}

export const RecentPaymentsList: React.FC<RecentPaymentsListProps> = ({ payments }) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Paiements récents</Text>
          <Text style={styles.subtitle}>Dernières transactions</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{payments.length}</Text>
        </View>
      </View>

      {payments.length > 0 ? (
        payments.map((payment, index) => (
          <PaymentRow
            key={payment.paymentId || index}
            payment={payment}
            index={index}
            isLast={index === payments.length - 1}
            colors={colors}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={28} color={colors.text.disabled} />
          <Text style={styles.emptyText}>Aucun paiement récent</Text>
        </View>
      )}
    </View>
  );
};
