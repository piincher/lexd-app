import React from 'react';
import { View, Text } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { CapacityProgressBar } from './CapacityProgressBar';
import { CapacityLegend } from './CapacityLegend';
import { CapacityWarningBanner } from './CapacityWarningBanner';
import { styles } from './CapacityIndicator.styles';

const MAX_CONTAINER_CBM = 67;

interface CapacityIndicatorProps {
  currentCBM: number;
  selectedCBM: number;
  maxCBM?: number;
  isAir?: boolean;
}

export const CapacityIndicator: React.FC<CapacityIndicatorProps> = ({
  currentCBM,
  selectedCBM,
  maxCBM = MAX_CONTAINER_CBM,
  isAir = false,
}) => {
  const unit = isAir ? 'kg' : 'm³';
  const totalCBM = (currentCBM || 0) + (selectedCBM || 0);
  const fillPercentage = Math.min((totalCBM / maxCBM) * 100, 100);
  const isFull = fillPercentage >= 90;
  const isNearFull = fillPercentage >= 70 && fillPercentage < 90;

  const getFillColor = () => {
    if (isFull) return Theme.status.error;
    if (isNearFull) return Theme.status.warning;
    return Theme.status.success;
  };

  return (
    <View style={styles.capacityContainer}>
      <View style={styles.capacityHeader}>
        <Text style={styles.capacityLabel}>Capacité du container</Text>
        <Text style={[styles.capacityValue, { color: getFillColor() }]}>
          {(totalCBM || 0).toFixed(2)} / {maxCBM} {unit}
        </Text>
      </View>
      <CapacityProgressBar
        currentCBM={currentCBM}
        selectedCBM={selectedCBM}
        maxCBM={maxCBM}
      />
      <CapacityLegend
        currentCBM={currentCBM}
        selectedCBM={selectedCBM}
        unit={unit}
      />
      <CapacityWarningBanner isFull={isFull} isNearFull={isNearFull} />
    </View>
  );
};
