/**
 * ActiveGoodsSection - Displays active goods for an order
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from '@src/shared/ui/Card';
import { lightTheme } from '@src/constants/Theme';
import { OrderGoods } from '../api/types';

interface ActiveGoodsSectionProps {
  goods: OrderGoods[];
}

export const ActiveGoodsSection: React.FC<ActiveGoodsSectionProps> = ({ goods }) => {
  const renderItem = ({ item }: { item: OrderGoods }) => (
    <View style={styles.goodsItem}>
      <Text style={styles.goodsCode}>{item.trackingCode || item.id}</Text>
      <Text style={styles.goodsCBM}>{item.cbm} m³</Text>
    </View>
  );

  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.title}>Active Goods ({goods.length})</Text>
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
    marginBottom: lightTheme.spacing.lg,
    padding: lightTheme.spacing.lg,
  },
  title: {
    fontSize: lightTheme.typography.h4.fontSize,
    fontWeight: '600',
    color: lightTheme.colors.text.primary,
    marginBottom: lightTheme.spacing.md,
  },
  goodsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: lightTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.neutral[200],
  },
  goodsCode: {
    fontSize: lightTheme.typography.body.fontSize,
    color: lightTheme.colors.text.primary,
  },
  goodsCBM: {
    fontSize: lightTheme.typography.body.fontSize,
    color: lightTheme.colors.text.secondary,
  },
});

export default ActiveGoodsSection;
