/**
 * Payment Metrics Component
 * Displays payment analytics including collection rate, aging, and methods
 */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { PaymentMetricsData } from '../types';
import {
  PaymentMetricsHeader,
  PaymentMetricsTabs,
  PaymentOverview,
  PaymentMethodsView,
  PaymentAgingView,
} from './PaymentMetrics';
import { ViewMode } from './PaymentMetrics/PaymentMetricsTabs';

interface PaymentMetricsProps {
  data: PaymentMetricsData;
}

export const PaymentMetrics: React.FC<PaymentMetricsProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');

  return (
    <Card style={styles.container}>
      <Card.Content>
        <PaymentMetricsHeader collectionRate={data.summary.collectionRate} />
        <PaymentMetricsTabs viewMode={viewMode} onChange={setViewMode} />
        {viewMode === 'overview' && <PaymentOverview data={data} />}
        {viewMode === 'methods' && <PaymentMethodsView data={data} />}
        {viewMode === 'aging' && <PaymentAgingView data={data} />}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    elevation: 2,
  },
});

export default PaymentMetrics;
