// GoodsDetailPhysicalProps - Physical properties (CBM, weight, quantity, dimensions)

import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

interface GoodsDetailPhysicalPropsProps {
  actualCBM?: number;
  weight?: number;
  quantity?: number;
  dimensions?: Dimensions;
}

export const GoodsDetailPhysicalProps: React.FC<GoodsDetailPhysicalPropsProps> = ({
  actualCBM,
  weight,
  quantity,
  dimensions,
}) => {
  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="cube-outline" size={20} color={Theme.primary[600]} />
          <Text style={styles.sectionTitle}>Caractéristiques physiques</Text>
        </View>
        
        <View style={styles.propertyGrid}>
          <View style={[styles.propertyItem, styles.propertyItemHighlight]}>
            <MaterialCommunityIcons name="cube" size={28} color={Theme.primary[600]} />
            <Text style={styles.propertyValueHighlight}>{actualCBM?.toFixed(3) || '0'}</Text>
            <Text style={styles.propertyLabel}>m³ (CBM)</Text>
          </View>
          
          <View style={styles.propertyItem}>
            <MaterialCommunityIcons name="weight-kilogram" size={28} color={Theme.accent.mint} />
            <Text style={styles.propertyValue}>{weight || '0'}</Text>
            <Text style={styles.propertyLabel}>kg</Text>
          </View>
          
          <View style={styles.propertyItem}>
            <MaterialCommunityIcons name="package-variant" size={28} color={Theme.accent.coral} />
            <Text style={styles.propertyValue}>{quantity || '1'}</Text>
            <Text style={styles.propertyLabel}>unité(s)</Text>
          </View>
        </View>

        {dimensions && (
          <View style={styles.dimensionsBox}>
            <MaterialCommunityIcons name="ruler-square" size={18} color={Theme.neutral[500]} />
            <Text style={styles.dimensionsText}>
              {dimensions.length} × {dimensions.width} × {dimensions.height} cm
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = {
  sectionCard: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: Theme.colors.background.card,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Theme.neutral[800],
    marginLeft: 10,
  },
  propertyGrid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 16,
  },
  propertyItem: {
    flex: 1,
    alignItems: 'center' as const,
    paddingVertical: 16,
    backgroundColor: Theme.neutral[50],
    borderRadius: 12,
    marginHorizontal: 4,
  },
  propertyItemHighlight: {
    backgroundColor: Theme.primary[50],
    borderWidth: 2,
    borderColor: Theme.primary[200],
  },
  propertyLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 6,
    fontWeight: '500' as const,
  },
  propertyValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Theme.neutral[800],
    marginTop: 4,
  },
  propertyValueHighlight: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: Theme.primary[600],
    marginTop: 4,
  },
  dimensionsBox: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Theme.neutral[100],
    padding: 14,
    borderRadius: 10,
  },
  dimensionsText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Theme.neutral[700],
    marginLeft: 10,
  },
};
