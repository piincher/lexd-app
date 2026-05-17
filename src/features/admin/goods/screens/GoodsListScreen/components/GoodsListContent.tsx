/**
 * GoodsListContent - FlashList wrapper for goods
 * SRP: Renders list with loading, error, or empty states
 */

import React, { useCallback } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { ActivityIndicator, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsCard } from '../../../components/GoodsCard';
import { GoodsEmptyState } from './GoodsEmptyState';
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
}

export const GoodsListContent: React.FC<GoodsListContentProps> = ({
  goods, isLoading, refreshing, error, hasFilters, onRefresh, onEndReached,
  onPressGoods, onAddPress, isSelectionMode, selectedIds, onToggleSelect,
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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={[styles.loadingText, { color: colors.text.secondary }]}>Chargement des marchandises...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <LinearGradient colors={[colors.feedback.errorBg, colors.background.paper]} style={styles.errorIcon}>
          <Ionicons name="alert-circle" size={64} color={colors.status.error} />
        </LinearGradient>
        <Text style={[styles.errorTitle, { color: colors.text.primary }]}>Erreur de chargement</Text>
        <Text style={[styles.errorSubtitle, { color: colors.text.secondary }]}>Impossible de récupérer les marchandises</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <LinearGradient colors={Theme.gradients.primary} style={styles.retryGradient}>
            <Ionicons name="refresh" size={20} color={colors.text.inverse} />
            <Text style={styles.retryText}>Réessayer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlashList data={goods} keyExtractor={keyExtractor} renderItem={renderItem}
      contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Theme.primary[500]} />
      }
      ListEmptyComponent={<GoodsEmptyState hasFilters={hasFilters} onAddPress={onAddPress} />} />
  );
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'], paddingHorizontal: Theme.spacing.xl },
  loadingText: { marginTop: Theme.spacing.lg, fontSize: 16, fontWeight: '500' },
  errorIcon: { width: 120, height: 120, borderRadius: Theme.radius['3xl'],
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
