import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { PaymentMetricsData } from '../../types';
import { CollectionGauge } from './CollectionGauge';
import { useCompactNumberFormat } from '../../hooks';

interface PaymentOverviewProps {
  data: PaymentMetricsData;
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: '#10B981',
  PENDING: '#F59E0B',
  PROCESSING: '#3B82F6',
  FAILED: '#EF4444',
  REFUNDED: '#8B5CF6',
  CANCELLED: '#6B7280',
};

export const PaymentOverview: React.FC<PaymentOverviewProps> = ({ data }) => {
  const formatCompact = useCompactNumberFormat();

  return (
    <View style={styles.overviewContent}>
      <View style={styles.overviewRow}>
        <View style={styles.gaugeWrapper}>
          <CollectionGauge rate={data.summary.collectionRate} />
        </View>

        <View style={styles.statsColumn}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="cash-plus" size={20} color="#10B981" />
            <Text style={styles.statValue}>
              {formatCompact(data.summary.totalCollectedFCFA)}
            </Text>
            <Text style={styles.statLabel}>Collecté</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="cash-minus" size={20} color="#EF4444" />
            <Text style={styles.statValue}>
              {formatCompact(data.summary.totalOutstandingFCFA)}
            </Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
        </View>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Statut des Transactions</Text>
        <View style={styles.statusGrid}>
          {data.transactionStatuses.map((status) => (
            <View key={status.status} style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[status.status] || '#6B7280' }]} />
              <Text style={styles.statusLabel}>{status.status}</Text>
              <Text style={styles.statusCount}>{status.count}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewContent: {
    gap: 16,
  },
  overviewRow: {
    flexDirection: 'row',
    gap: 16,
  },
  gaugeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsColumn: {
    flex: 1,
    justifyContent: 'space-around',
  },
  statBox: {
    backgroundColor: Theme.colors.neutral[50],
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text.primary,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  statusSection: {
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[100],
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.secondary,
    marginBottom: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Theme.colors.neutral[50],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 11,
    color: Theme.colors.text.secondary,
  },
  statusCount: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
});
