import React from 'react';
import { View, Text } from 'react-native';
import { createStyles } from './CapacityUsageBar.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CapacityUsageBarHeaderProps {
  variant: 'cbm' | 'weight' | 'items';
  used: number;
  max: number;
  unit: string;
  fillColor: string;
}

const getVariantIcon = (variant: 'cbm' | 'weight' | 'items') => {
  switch (variant) {
    case 'weight':
      return '⚖️';
    case 'items':
      return '📦';
    default:
      return '📐';
  }
};

const getVariantLabel = (variant: 'cbm' | 'weight' | 'items') => {
  switch (variant) {
    case 'cbm':
      return 'Volume';
    case 'weight':
      return 'Poids';
    default:
      return 'Articles';
  }
};

export const CapacityUsageBarHeader: React.FC<CapacityUsageBarHeaderProps> = ({
  variant,
  used,
  max,
  unit,
  fillColor,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
  <View style={styles.header}>
    <View style={styles.labelContainer}>
      <Text style={styles.icon}>{getVariantIcon(variant)}</Text>
      <Text style={styles.label}>{getVariantLabel(variant)}</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={[styles.usedValue, { color: fillColor }]}>
        {used.toFixed(2)} {unit}
      </Text>
      <Text style={styles.separator}> / </Text>
      <Text style={styles.maxValue}>
        {max.toFixed(0)} {unit}
      </Text>
    </View>
  </View>
  );
};
