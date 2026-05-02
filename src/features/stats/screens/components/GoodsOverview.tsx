/**
 * GoodsOverview
 * SRP: Visual breakdown of goods by status and payment from v2 analytics
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsVolumeResponse } from '../../types';
import { createGoodsOverviewStyles } from './GoodsOverview.styles';
import { GoodsStatusRow } from './GoodsStatusRow';
import { GoodsOverviewSkeleton } from './GoodsOverviewSkeleton';

export interface GoodsOverviewProps {
  goodsVolume?: GoodsVolumeResponse;
  isLoading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  in_warehouse: '#F59E0B',
  in_transit: '#3B82F6',
  delivered: '#10B981',
  pending: '#8B5CF6',
  ready_for_pickup: '#06B6D4',
};

const STATUS_LABELS: Record<string, string> = {
  in_warehouse: 'En entrepot',
  in_transit: 'En transit',
  delivered: 'Livre',
  pending: 'En attente',
  ready_for_pickup: 'Pret au retrait',
};

export const formatNumber = (num: number | undefined | null): string => {
  const n = Number(num) || 0;
  return new Intl.NumberFormat('fr-FR').format(Math.round(n));
};

export const GoodsOverview: React.FC<GoodsOverviewProps> = ({ goodsVolume, isLoading }) => {
  const { colors } = useAppTheme();
  const styles = createGoodsOverviewStyles(colors);
  const summary = goodsVolume?.summary;
  const byStatus = goodsVolume?.byStatus || [];
  const totalGoods = Number(summary?.totalGoods) || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Marchandises</Text>
          <Text style={styles.subtitle}>Volume et repartition</Text>
        </View>
        <View style={styles.summaryBadge}>
          <Text style={styles.summaryValue}>{formatNumber(totalGoods)}</Text>
          <Text style={styles.summaryLabel}>colis</Text>
        </View>
      </View>

      {isLoading ? (
        <GoodsOverviewSkeleton />
      ) : (
        <>
          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <Ionicons name="cube-outline" size={16} color="#3B82F6" />
              <Text style={styles.quickStatValue}>{Number(summary?.totalCBM || 0).toFixed(1)}</Text>
              <Text style={styles.quickStatLabel}>CBM</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStat}>
              <Ionicons name="cash-outline" size={16} color="#10B981" />
              <Text style={styles.quickStatValue}>{formatNumber(summary?.totalValueFCFA)}</Text>
              <Text style={styles.quickStatLabel}>FCFA</Text>
            </View>
          </View>

          {byStatus.length > 0 && (
            <View style={styles.statusSection}>
              {byStatus.map((item, index) => (
                <GoodsStatusRow
                  key={item.status || index}
                  item={item}
                  index={index}
                  totalGoods={totalGoods}
                  statusColors={STATUS_COLORS}
                  statusLabels={STATUS_LABELS}
                />
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};
