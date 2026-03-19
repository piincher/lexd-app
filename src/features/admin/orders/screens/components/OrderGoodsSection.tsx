/**
 * OrderGoodsSection - Displays goods attached to an order
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';

interface OrderGoodsSectionProps {
  goods: any[];
}

export const OrderGoodsSection: React.FC<OrderGoodsSectionProps> = ({ goods }) => {
  if (!goods || goods.length === 0) {
    return null;
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="package-variant" size={20} color={COLORS.primary} />
        <Text style={styles.title}>Marchandises ({goods.length})</Text>
      </View>

      {goods.map((item, index) => (
        <View key={item._id || item.id || index} style={styles.goodsItem}>
          <View style={styles.goodsInfo}>
            <Text style={styles.goodsCode}>{item.goodsId || item.trackingCode || 'N/A'}</Text>
            <Text style={styles.goodsDescription} numberOfLines={1}>
              {item.description || 'No description'}
            </Text>
          </View>
          <View style={styles.goodsMeta}>
            <Text style={styles.cbm}>{item.actualCBM || item.cbm || 0} m³</Text>
            <Text style={styles.weight}>{item.weight || 0} kg</Text>
          </View>
        </View>
      ))}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  goodsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  goodsInfo: {
    flex: 1,
  },
  goodsCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  goodsDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  goodsMeta: {
    alignItems: 'flex-end',
  },
  cbm: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.primary,
  },
  weight: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default OrderGoodsSection;
