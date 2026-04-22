/**
 * VoidedGoodsSection - Displays voided goods for an order
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from '@src/shared/ui/Card';
import { Theme } from '@src/constants/Theme';
import { OrderGoods } from '../api/types';

interface VoidedGoodsSectionProps {
  goods: OrderGoods[];
}

export const VoidedGoodsSection: React.FC<VoidedGoodsSectionProps> = ({ goods }) => {
  const renderItem = ({ item }: { item: OrderGoods }) => (
    <View style={styles.goodsItem}>
      <Text style={styles.goodsCode}>{item.trackingCode || item.id}</Text>
      <Text style={styles.goodsCBM}>{item.cbm} m³</Text>
    </View>
  );

  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.title}>Voided Goods ({goods.length})</Text>
      <FlashList
        data={goods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.status.error,
  },
  title: {
    fontSize: Theme.typography.h4.fontSize,
    fontWeight: '600',
    color: Theme.colors.status.error,
    marginBottom: Theme.spacing.md,
  },
  goodsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  goodsCode: {
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  goodsCBM: {
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text.muted,
  },
});

export default VoidedGoodsSection;
