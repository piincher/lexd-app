import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createGoodsOverviewStyles } from './GoodsOverview.styles';

interface GoodsStatusRowProps {
  item: {
    status: string;
    count: number;
  };
  index: number;
  totalGoods: number;
  statusColors: Record<string, string>;
  statusLabels: Record<string, string>;
}

export const GoodsStatusRow: React.FC<GoodsStatusRowProps> = ({
  item,
  index,
  totalGoods,
  statusColors,
  statusLabels,
}) => {
  const { colors } = useAppTheme();
  const styles = createGoodsOverviewStyles(colors);

  const statusKey = item.status?.toLowerCase().replace(/\s+/g, '_');
  const color = statusColors[statusKey] || colors.text.secondary;
  const label = statusLabels[statusKey] || item.status || 'Autre';
  const percentage = totalGoods > 0 ? (item.count / totalGoods) * 100 : 0;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 60).springify().damping(15)}
      style={styles.statusRow}
    >
      <View style={styles.statusHeader}>
        <View style={styles.statusLeft}>
          <View style={[styles.statusDot, { backgroundColor: color }]} />
          <Text style={styles.statusLabel}>{label}</Text>
        </View>
        <View style={styles.statusRight}>
          <Text style={styles.statusCount}>{item.count}</Text>
          <Text style={styles.statusPercent}>{percentage.toFixed(0)}%</Text>
        </View>
      </View>
      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            { width: `${Math.max(percentage, 2)}%`, backgroundColor: color },
          ]}
        />
      </View>
    </Animated.View>
  );
};
