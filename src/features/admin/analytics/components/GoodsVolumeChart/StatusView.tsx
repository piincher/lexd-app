import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { VolumeByStatus } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { statusConfig } from './goodsVolumeConstants';
import { StackedBarChart } from './StackedBarChart';
import { createStyles } from './GoodsVolumeChart.styles';

interface StatusViewProps {
  byStatus: VolumeByStatus[];
  totalGoods: number;
  statusChartData: Array<{ label: string; value: number; color: string }>;
  formatCurrency: (amount: number) => string;
}

export const StatusView: React.FC<StatusViewProps> = ({
  byStatus,
  totalGoods,
  statusChartData,
  formatCurrency,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Répartition par Statut</Text>

      <View style={styles.stackedBarContainer}>
        <StackedBarChart data={statusChartData} total={totalGoods} />
      </View>

      <View style={styles.legendGrid}>
        {byStatus
          .filter((s) => s.count > 0)
          .sort((a, b) => b.count - a.count)
          .map((status) => {
            const config = statusConfig[status.status];
            const percentage = (status.count / totalGoods) * 100;

            return (
              <View key={status.status} style={styles.legendItem}>
                <View style={styles.legendHeader}>
                  <View style={[styles.legendDot, { backgroundColor: config?.color || colors.text.muted }]} />
                  <Text style={styles.legendLabel}>{config?.label || status.status}</Text>
                  <Text style={styles.legendValue}>{status.count}</Text>
                </View>
                <View style={styles.legendDetails}>
                  <Text style={styles.legendDetail}>
                    {percentage.toFixed(1)}% • {status.totalCBM.toFixed(1)} CBM
                  </Text>
                  <Text style={styles.legendValue}>
                    {formatCurrency(status.totalValueFCFA)} FCFA
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};
