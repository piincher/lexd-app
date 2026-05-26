/**
 * GoodsPhysicalProps - Display physical characteristics
 * SRP: Show weight, CBM, quantity, and dimensions
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './GoodsPhysicalProps.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsPhysicalPropsProps {
  weight: number;
  cbm: number;
  quantity: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export const GoodsPhysicalProps: React.FC<GoodsPhysicalPropsProps> = ({
  weight,
  cbm,
  quantity,
  dimensions,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="cube-outline" size={20} color={colors.primary[600]} />
          <Text style={styles.title}>Caractéristiques physiques</Text>
        </View>

        <View style={styles.propertyGrid}>
          <View style={[styles.propertyItem, styles.propertyItemHighlight]}>
            <MaterialCommunityIcons name="cube" size={28} color={colors.primary[600]} />
            <Text style={styles.propertyValueHighlight}>{cbm?.toFixed(3) || '0'}</Text>
            <Text style={styles.propertyLabel}>m³ (CBM)</Text>
          </View>

          <View style={styles.propertyItem}>
            <MaterialCommunityIcons name="weight-kilogram" size={28} color={colors.accent.mint} />
            <Text style={styles.propertyValue}>{weight || '0'}</Text>
            <Text style={styles.propertyLabel}>kg</Text>
          </View>

          <View style={styles.propertyItem}>
            <MaterialCommunityIcons name="package-variant" size={28} color={colors.accent.coral} />
            <Text style={styles.propertyValue}>{quantity || '1'}</Text>
            <Text style={styles.propertyLabel}>unité(s)</Text>
          </View>
        </View>

        {dimensions && (
          <View style={styles.dimensionsBox}>
            <MaterialCommunityIcons name="ruler-square" size={18} color={colors.neutral[500]} />
            <Text style={styles.dimensionsText}>
              {dimensions.length} × {dimensions.width} × {dimensions.height} cm
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
