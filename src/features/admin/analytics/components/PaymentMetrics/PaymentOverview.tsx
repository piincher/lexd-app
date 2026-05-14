import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { PaymentMetricsData } from '../../types';
import { CollectionGauge } from './CollectionGauge';
import { useCompactNumberFormat } from '../../hooks';

interface PaymentOverviewProps {
  data: PaymentMetricsData;
}

export const PaymentOverview: React.FC<PaymentOverviewProps> = ({ data }) => {
  const { colors } = useAppTheme();
  const formatCompact = useCompactNumberFormat();
  const styles = createStyles(colors);

  const STATUS_COLORS: Record<string, string> = {
    COMPLETED: colors.status.success,
    PENDING: colors.status.warning,
    PROCESSING: colors.status.info,
    FAILED: colors.status.error,
    REFUNDED: '#8B5CF6',
    CANCELLED: colors.text.muted,
  };

  return (
    <View style={styles.overviewContent}>
      <View style={styles.overviewRow}>
        <View style={styles.gaugeWrapper}>
          <CollectionGauge rate={data.summary.collectionRate} />
        </View>

        <View style={styles.statsColumn}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="cash-plus" size={20} color={colors.status.success} />
            <Text style={styles.statValue}>
              {formatCompact(data.summary.totalCollectedFCFA)}
            </Text>
            <Text style={styles.statLabel}>Collecté</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="cash-minus" size={20} color={colors.status.error} />
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
              <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[status.status] || colors.text.muted }]} />
              <Text style={styles.statusLabel}>{status.status}</Text>
              <Text style={styles.statusCount}>{status.count}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
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
    backgroundColor: colors.neutral[50],
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 2,
  },
  statusSection: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
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
    backgroundColor: colors.neutral[50],
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
    color: colors.text.secondary,
  },
  statusCount: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.primary,
  },
});
