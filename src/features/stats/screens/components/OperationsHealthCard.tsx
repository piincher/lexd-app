import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShimmerBlock } from '@src/shared/ui';
import { OperationsAnalyticsResponse } from '../../types';
import { createOperationsHealthStyles } from './OperationsHealthCard.styles';

interface OperationsHealthCardProps {
  operations?: OperationsAnalyticsResponse;
  isLoading?: boolean;
}

const formatAmount = (value?: number) => {
  const num = Number(value) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return `${Math.round(num)}`;
};

const Metric: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => {
  const { colors } = useAppTheme();
  const styles = createOperationsHealthStyles(colors);

  return (
    <View style={styles.metric}>
      <Text style={[styles.metricValue, { color }]} numberOfLines={1}>{value}</Text>
      <Text style={styles.metricLabel} numberOfLines={1}>{label}</Text>
    </View>
  );
};

export const OperationsHealthCard: React.FC<OperationsHealthCardProps> = ({ operations, isLoading }) => {
  const { colors } = useAppTheme();
  const summary = operations?.summary;
  const topStuckGoods = operations?.goodsFlow.stuckGoods.slice(0, 3) || [];
  const styles = createOperationsHealthStyles(colors);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ShimmerBlock width="50%" height={16} borderRadius={4} />
        <View style={[styles.grid, styles.loaderGrid]}>
          {Array.from({ length: 4 }).map((_, index) => (
            <ShimmerBlock key={index} width="46%" height={58} borderRadius={12} />
          ))}
        </View>
      </View>
    );
  }

  if (!operations) return null;

  return (
    <Animated.View entering={FadeInUp.delay(280).springify().damping(15)} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Operations</Text>
          <Text style={styles.subtitle}>Recouvrement, flux et capacité</Text>
        </View>
        <View style={styles.iconBox}>
          <Ionicons name="pulse-outline" size={18} color={colors.status.info} />
        </View>
      </View>
      <View style={styles.grid}>
        <Metric label="À recouvrer" value={`${formatAmount(summary?.unpaidAmount)} F`} color={colors.status.warning} />
        <Metric label="En retard" value={`${summary?.overdueInvoices || 0}`} color={colors.status.error} />
        <Metric label="Colis bloqués" value={`${summary?.stuckGoods || 0}`} color={colors.status.info} />
        <Metric label="Remplissage" value={`${summary?.avgContainerFillRate || 0}%`} color={colors.status.success} />
      </View>
      {topStuckGoods.length > 0 && (
        <View style={styles.stuckList}>
          {topStuckGoods.map((goods) => (
            <View key={goods.goodsId} style={styles.stuckRow}>
              <Text style={styles.stuckText} numberOfLines={1}>{goods.goodsId} · {goods.customerName}</Text>
              <Text style={styles.stuckDays}>{goods.daysInWarehouse}j</Text>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
};
