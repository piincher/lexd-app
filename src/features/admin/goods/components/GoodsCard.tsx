/**
 * GoodsCard - Pure composition card, orchestrates sub-components
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Goods } from '../types';
import { normalizePhotos } from '@src/shared/lib';
import { GoodsCardStatus } from './GoodsCardStatus';
import { GoodsCardImage } from './GoodsCardImage';
import { GoodsCardClient } from './GoodsCardClient';
import { GoodsCardMetrics } from './GoodsCardMetrics';

interface GoodsCardProps {
  goods: Goods;
  onPress?: () => void;
  onMenuPress?: () => void;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onToggleSelect?: () => void;
}

export const GoodsCard: React.FC<GoodsCardProps> = ({
  goods, onPress, onMenuPress, isSelected, isSelectionMode, onToggleSelect,
}) => {
  const { colors } = useAppTheme();
  const photoUrls = normalizePhotos(goods);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.background.card },
        isSelected && { backgroundColor: colors.primary[100] },
      ]}
      onPress={isSelectionMode ? onToggleSelect : onPress}
      activeOpacity={0.95}
    >
      <GoodsCardStatus status={goods.status} />
      <View style={styles.content}>
        <GoodsCardImage photoUrls={photoUrls} status={goods.status} />
        <View style={styles.info}>
          <View style={styles.headerRow}>
            <Text style={[styles.goodsId, { color: colors.text.primary }]}>{goods.goodsId}</Text>
            {isSelectionMode ? (
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Ionicons name="checkmark" size={16} color={colors.text.inverse} />}
              </View>
            ) : (
              <TouchableOpacity style={styles.moreButton} onPress={onMenuPress}>
                <Ionicons name="ellipsis-horizontal" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={[styles.description, { color: colors.text.secondary }]} numberOfLines={1}>
            {goods.description || 'Sans description'}
          </Text>
          <GoodsCardClient clientId={goods.clientId} />
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="layers-outline" size={14} color={colors.text.secondary} />
              <Text style={[styles.metaText, { color: colors.text.secondary }]}>Qté: {goods.quantity || 1}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color={colors.text.secondary} />
              <Text style={[styles.metaText, { color: colors.text.secondary }]}>Loc: {goods.warehouseLocation || 'N/A'}</Text>
            </View>
          </View>
          <GoodsCardMetrics cbm={goods.actualCBM} weight={goods.weight} price={goods.totalCost} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.radius.xl,
    margin: Theme.spacing.lg,
    ...Theme.shadows.md,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
  },
  info: {
    flex: 1,
    marginLeft: Theme.spacing.lg,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goodsId: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h3.fontWeight as '800',
    lineHeight: Theme.typography.h3.lineHeight,
    letterSpacing: 0,
  },
  moreButton: {
    padding: 4,
  },
  description: {
    fontSize: Theme.typography.bodySmall.fontSize,
    lineHeight: Theme.typography.bodySmall.lineHeight,
    marginTop: 4,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: Theme.typography.caption.fontSize,
    lineHeight: Theme.typography.caption.lineHeight,
    letterSpacing: Theme.typography.caption.letterSpacing,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Theme.neutral[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Theme.primary[600],
    borderColor: Theme.primary[600],
  },
});

export default GoodsCard;
