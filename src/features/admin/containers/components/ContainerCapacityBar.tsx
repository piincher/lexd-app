import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container } from './types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ContainerCard.styles';

interface Props {
  container: Container;
  maxCBM: number;
}

export const ContainerCapacityBar: React.FC<Props> = ({ container, maxCBM }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const fillPercentage = Math.min(((container.totalCBM || 0) / maxCBM) * 100, 100);
  const isFull = fillPercentage >= 90;
  const isNearFull = fillPercentage >= 70 && fillPercentage < 90;
  const getFillColor = () => {
    if (isFull) return colors.status.error;
    if (isNearFull) return colors.status.warning;
    return colors.status.success;
  };
  const goodsCount = container.goodsCount || (container.goodsIds?.length ?? 0);

  return (
    <View style={styles.capacitySection}>
      <View style={styles.capacityHeader}>
        <Text style={styles.capacityLabel}>Capacité utilisée</Text>
        <Text style={[styles.capacityValue, { color: getFillColor() }]}>{(fillPercentage || 0).toFixed(1)}%</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <LinearGradient
          colors={[getFillColor(), `${getFillColor()}80`]}
          style={[styles.progressBarFill, { width: `${fillPercentage}%` }]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        />
      </View>
      <View style={styles.capacityStats}>
        <Text style={styles.capacityStatsText}>{(container.totalCBM || 0).toFixed(2)} m³ / {maxCBM} m³</Text>
        <Text style={styles.goodsCount}>{goodsCount} marchandise{goodsCount > 1 ? 's' : ''}</Text>
      </View>
    </View>
  );
};
