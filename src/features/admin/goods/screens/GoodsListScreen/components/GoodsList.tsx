/**
 * GoodsList - FlatList wrapper for goods
 * SRP: Renders list with loading, error, or empty states
 */

import React, { useCallback } from 'react';
import { View, StyleSheet, RefreshControl, ListRenderItem } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { GoodsCard } from '../../../components/GoodsCard';
import { GoodsEmptyState } from './GoodsEmptyState';
import { Goods } from '../../../types';

interface GoodsListProps {
  goods: Goods[];
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  hasFilters: boolean;
  onRefresh: () => Promise<void>;
  onGoodsPress: (goodsId: string) => void;
  onAddPress?: () => void;
}

const GOODS_CARD_HEIGHT = 160;

export const GoodsList: React.FC<GoodsListProps> = ({
  goods,
  isLoading,
  isRefetching,
  error,
  hasFilters,
  onRefresh,
  onGoodsPress,
  onAddPress,
}) => {
  const renderItem: ListRenderItem<Goods> = useCallback(({ item }) => (
    <GoodsCard goods={item} onPress={() => onGoodsPress(item.goodsId)} />
  ), [onGoodsPress]);

  const keyExtractor = useCallback((item: Goods) => item._id, []);

  const getItemLayout = useCallback((
    _data: ArrayLike<Goods> | null | undefined,
    index: number
  ) => ({
    length: GOODS_CARD_HEIGHT,
    offset: GOODS_CARD_HEIGHT * index,
    index,
  }), []);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Theme.primary[600]} />
        <Text style={styles.loadingText}>Chargement des marchandises...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <LinearGradient colors={['#FEF2F2', '#FEE2E2']} style={styles.errorIcon}>
          <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
        </LinearGradient>
        <Text style={styles.errorTitle}>Erreur de chargement</Text>
        <Text style={styles.errorSubtitle}>Impossible de récupérer les marchandises</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <LinearGradient colors={Theme.gradients.primary} style={styles.retryGradient}>
            <Ionicons name="refresh" size={20} color="#FFF" />
            <Text style={styles.retryText}>Réessayer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlashList
      data={goods}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={GOODS_CARD_HEIGHT}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          tintColor={Theme.primary[500]}
        />
      }
      ListEmptyComponent={
        <GoodsEmptyState hasFilters={hasFilters} onAddPress={onAddPress} />
      }
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
    paddingHorizontal: Theme.spacing.xl,
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 16,
    color: Theme.neutral[500],
    fontWeight: '500',
  },
  errorIcon: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[500],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  retryButton: {
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  retryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
  },
  listContent: {
    paddingTop: Theme.spacing.sm,
    paddingBottom: 120,
  },
});

export default GoodsList;
