/**
 * GoodsDimensionsCard - Display goods physical properties
 * SRP: Show weight, CBM, dimensions, and quantity in a card layout
 */

import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '@src/shared/ui/Card';
import { Text } from 'react-native';
import { createStyles } from './GoodsDimensionsCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface GoodsDimensionsCardProps {
  weight: number;
  cbm: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  quantity: number;
}

export const GoodsDimensionsCard: React.FC<GoodsDimensionsCardProps> = ({
  weight,
  cbm,
  dimensions,
  quantity,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <Card variant="elevated" padding="medium" style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="cube-outline" size={20} color={colors.primary[600]} />
        <Text style={styles.title}>Dimensions & Poids</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.item}>
          <MaterialCommunityIcons name="weight-kilogram" size={24} color={colors.primary[500]} />
          <Text style={styles.value}>{weight.toFixed(2)}</Text>
          <Text style={styles.label}>kg</Text>
        </View>

        <View style={styles.item}>
          <MaterialCommunityIcons name="cube" size={24} color={colors.accent.mint} />
          <Text style={styles.value}>{cbm.toFixed(2)}</Text>
          <Text style={styles.label}>CBM</Text>
        </View>

        <View style={styles.item}>
          <MaterialCommunityIcons name="package-variant" size={24} color={colors.accent.coral} />
          <Text style={styles.value}>{quantity}</Text>
          <Text style={styles.label}>Qté</Text>
        </View>
      </View>

      <View style={styles.dimensionsRow}>
        <MaterialCommunityIcons name="ruler-square" size={18} color={colors.neutral[500]} />
        <Text style={styles.dimensionsText}>
          {dimensions.length.toFixed(2)} × {dimensions.width.toFixed(2)} × {dimensions.height.toFixed(2)} cm
        </Text>
      </View>
    </Card>
  );
};
