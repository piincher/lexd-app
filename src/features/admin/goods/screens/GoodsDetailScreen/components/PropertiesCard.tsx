import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsDetailScreen.styles';
import { Goods } from '../../../types';

interface PropertiesCardProps {
  goods: Goods;
}

export const PropertiesCard: React.FC<PropertiesCardProps> = ({ goods }) => (
  <Card style={styles.sectionCard}>
    <Card.Content>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="cube-outline" size={20} color={Theme.primary[600]} />
        <Text style={styles.sectionTitle}>Caractéristiques physiques</Text>
      </View>

      <View style={styles.propertyGrid}>
        <View style={[styles.propertyItem, styles.propertyItemHighlight]}>
          <MaterialCommunityIcons name="cube" size={28} color={Theme.primary[600]} />
          <Text style={styles.propertyValueHighlight}>{goods.actualCBM?.toFixed(3) || '0'}</Text>
          <Text style={styles.propertyLabel}>m³ (CBM)</Text>
        </View>

        <View style={styles.propertyItem}>
          <MaterialCommunityIcons name="weight-kilogram" size={28} color={Theme.accent.mint} />
          <Text style={styles.propertyValue}>{goods.weight || '0'}</Text>
          <Text style={styles.propertyLabel}>kg</Text>
        </View>

        <View style={styles.propertyItem}>
          <MaterialCommunityIcons name="package-variant" size={28} color={Theme.accent.coral} />
          <Text style={styles.propertyValue}>{goods.quantity || '1'}</Text>
          <Text style={styles.propertyLabel}>unité(s)</Text>
        </View>
      </View>

      {goods.dimensions && (
        <View style={styles.dimensionsBox}>
          <MaterialCommunityIcons name="ruler-square" size={18} color={Theme.neutral[500]} />
          <Text style={styles.dimensionsText}>
            {goods.dimensions.length} × {goods.dimensions.width} × {goods.dimensions.height} cm
          </Text>
        </View>
      )}
    </Card.Content>
  </Card>
);
