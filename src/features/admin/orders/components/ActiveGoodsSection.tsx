/**
 * ActiveGoodsSection - Displays active goods for an order
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from '@src/shared/ui/Card';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { OrderGoods } from '../api/types';

interface ActiveGoodsSectionProps {
  goods: OrderGoods[];
}

const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  goodsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  goodsCode: {
    fontSize: 16,
    color: colors.text.primary,
  },
  goodsCBM: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});

export const ActiveGoodsSection: React.FC<ActiveGoodsSectionProps> = ({ goods }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

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

export default ActiveGoodsSection;
