import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { DailyVolumePoint } from '../../types';
import { TrendChart } from './TrendChart';
import { styles } from './GoodsVolumeChart.styles';

interface TrendViewProps {
  dailyTrend: DailyVolumePoint[];
  totalGoods: number;
}

export const TrendView: React.FC<TrendViewProps> = ({ dailyTrend, totalGoods }) => (
  <View style={styles.content}>
    <Text style={styles.sectionTitle}>Tendance Journalière</Text>

    {dailyTrend.length > 0 ? (
      <View>
        <TrendChart data={dailyTrend} />
        <View style={styles.trendSummary}>
          <View style={styles.trendItem}>
            <Text style={styles.trendLabel}>Moyenne/jour</Text>
            <Text style={styles.trendValue}>
              {(totalGoods / dailyTrend.length).toFixed(0)} march.
            </Text>
          </View>
          <View style={styles.trendItem}>
            <Text style={styles.trendLabel}>Peak</Text>
            <Text style={styles.trendValue}>
              {Math.max(...dailyTrend.map((d) => d.count))} march.
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <Text style={styles.noData}>Pas assez de données</Text>
    )}
  </View>
);
