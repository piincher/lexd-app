import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {  createStyles, MAX_CBM  } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ContainerCapacityCardProps {
  totalCBM: number;
  fillPercentage: number;
  fillColor: string;
  maxCBM?: number;
  isAir?: boolean;
}

export const ContainerCapacityCard: React.FC<ContainerCapacityCardProps> = ({
  totalCBM,
  fillPercentage,
  fillColor,
  maxCBM = MAX_CBM,
  isAir = false,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const unit = isAir ? 'kg' : 'CBM';
  const getStatusColor = (percentage: number): string => {
    if (percentage > 90) return colors.status.error;
    if (percentage >= 70) return colors.status.warning;
    return colors.status.success;
  };

  const percentageColor = getStatusColor(fillPercentage);
  const clampedPercentage = Math.min(Math.max(fillPercentage, 0), 100);

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(400)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Text style={styles.cardTitle}>Container Capacity</Text>
          </View>
        </View>

        <View style={styles.capacityInfo}>
          <Text style={styles.capacityValue}>{totalCBM.toFixed(1)}</Text>
          <Text style={styles.capacityUnit}>{unit}</Text>
          <Text style={styles.capacityMax}>/ {maxCBM} {unit}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${clampedPercentage}%`,
                  backgroundColor: fillColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressPercentage, { color: percentageColor }]}>
            {clampedPercentage.toFixed(0)}%
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default ContainerCapacityCard;
