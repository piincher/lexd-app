import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { PaymentMetricsData } from '../../types';
import { AgingChart } from './AgingChart';

interface PaymentAgingViewProps {
  data: PaymentMetricsData;
}

export const PaymentAgingView: React.FC<PaymentAgingViewProps> = ({ data }) => (
  <View style={styles.agingContent}>
    <Text style={styles.agingTitle}>Ancienneté des Créances</Text>
    <AgingChart data={data.outstandingAging} />
  </View>
);

const styles = StyleSheet.create({
  agingContent: {
    marginTop: 8,
  },
  agingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.secondary,
    marginBottom: 12,
  },
});
