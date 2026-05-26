/**
 * GoodsListContent - FlashList wrapper for goods
 * SRP: Renders list with loading, error, or empty states
 */

import React, { useCallback } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsCard } from '../../../components/GoodsCard';
import { GoodsEmptyState } from './GoodsEmptyState';
import { GoodsListSkeleton } from './GoodsListSkeleton';
import { Goods } from '../../../types';
import { Theme } from '@src/constants/Theme';

interface GoodsListContentProps {
  goods: Goods[];
  isLoading: boolean;
  refreshing: boolean;
  error: Error | null;
  hasFilters: boolean;
  onRefresh: () => Promise<void>;
  onEndReached?: () => void;
  onPressGoods: (goodsId: string) => void;
  onAddPress?: () => void;
  isSelectionMode?: boolean;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
  listHeader?: React.ReactElement;
}

export const GoodsListContent: React.FC<GoodsListContentProps> = ({
  goods, isLoading, refreshing, error, hasFilters, onRefresh, onEndReached,
  onPressGoods, onAddPress, isSelectionMode, selectedIds, onToggleSelect, listHeader,
}) => {
  const { colors } = useAppTheme();
  const renderItem: ListRenderItem<Goods> = useCallback(({ item }) => (
    <GoodsCard goods={item} onPress={() => onPressGoods(item._id)}
      isSelectionMode={isSelectionMode} isSelected={selectedIds?.includes(item._id)}
      onToggleSelect={() => onToggleSelect?.(item._id)} />
  ), [onPressGoods, isSelectionMode, selectedIds, onToggleSelect]);

  const keyExtractor = useCallback((item: Goods) => item._id, []);

  if (isLoading) {
    return (
      <View style={styles.fill}>
        {listHeader}
        <GoodsListSkeleton />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fill}>
        {listHeader}
        <View style={styles.centerContainer}>
          <View style={[styles.errorIcon, { backgroundColor: colors.feedback.errorBg }]}>
            <Ionicons name="alert-circle" size={56} color={colors.status.error} />
          </View>
          <Text style={[styles.errorTitle, { color: colors.text.primary }]}>Erreur de chargement</Text>
          <Text style={[styles.errorSubtitle, { color: colors.text.secondary }]}>Impossible de récupérer les marchandises</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <LinearGradient colors={Theme.gradients.primary} style={styles.retryGradient}>
              <Ionicons name="refresh" size={20} color={colors.text.inverse} />
              <Text style={styles.retryText}>Réessayer</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <FlashList data={goods} keyExtractor={keyExtractor} renderItem={renderItem}
      contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      ListHeaderComponent={listHeader}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Theme.primary[500]} />
      }
      ListEmptyComponent={<GoodsEmptyState hasFilters={hasFilters} onAddPress={onAddPress} />} />
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'], paddingHorizontal: Theme.spacing.xl },
  errorIcon: { width: 96, height: 96, borderRadius: Theme.radius['2xl'],
    justifyContent: 'center', alignItems: 'center', marginBottom: Theme.spacing.xl },
  errorTitle: { fontSize: 20, fontWeight: '700', marginBottom: Theme.spacing.sm },
  errorSubtitle: { fontSize: 14, fontWeight: '500',
    textAlign: 'center', marginBottom: Theme.spacing.xl },
  retryButton: { borderRadius: Theme.radius.full, overflow: 'hidden' },
  retryGradient: { flexDirection: 'row', alignItems: 'center',
    paddingVertical: Theme.spacing.md, paddingHorizontal: Theme.spacing.xl },
  retryText: { fontSize: 15, fontWeight: '700', color: Theme.colors.text.inverse, marginLeft: Theme.spacing.sm },
  listContent: { paddingTop: Theme.spacing.sm, paddingBottom: 120 },
});
