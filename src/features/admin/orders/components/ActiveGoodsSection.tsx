/**
 * ActiveGoodsSection - Displays active goods for an order
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Card } from '@src/shared/ui/Card';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { normalizePhotos } from '@src/shared/lib';
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
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.neutral[200],
  },
  thumbPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  goodsInfo: {
    flex: 1,
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
  const styles = createStyles(colors, isDark);

  const renderItem = ({ item }: { item: OrderGoods }) => {
    // The photo the operator attached at intake travels with the good; surface
    // it here so the order shows its goods' pictures.
    const thumb = normalizePhotos(item as unknown as Record<string, unknown>)[0];
    return (
      <View style={styles.goodsItem}>
        {thumb ? (
          <Image source={{ uri: thumb }} style={styles.thumb} contentFit="cover" />
        ) : (
          <View style={styles.thumbPlaceholder}>
            <Ionicons name="cube-outline" size={20} color={colors.text.disabled} />
          </View>
        )}
        <View style={styles.goodsInfo}>
          <Text style={styles.goodsCode}>{item.trackingCode || item.id}</Text>
        </View>
        <Text style={styles.goodsCBM}>{item.cbm} m³</Text>
      </View>
    );
  };

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
