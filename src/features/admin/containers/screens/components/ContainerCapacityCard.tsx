import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { styles, MAX_CBM } from '../ContainerDetailScreen.styles';

interface ContainerCapacityCardProps {
  totalCBM: number;
  fillPercentage: number;
  fillColor: string;
  maxCBM?: number;
}

export const ContainerCapacityCard: React.FC<ContainerCapacityCardProps> = ({
  totalCBM,
  fillPercentage,
  fillColor,
  maxCBM = MAX_CBM,
}) => {
  const getStatusColor = (percentage: number): string => {
    if (percentage > 90) return '#EF4444'; // red
    if (percentage >= 70) return '#F59E0B'; // yellow
    return '#10B981'; // green
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
          <Text style={styles.capacityUnit}>CBM</Text>
          <Text style={styles.capacityMax}>/ {maxCBM} CBM</Text>
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
