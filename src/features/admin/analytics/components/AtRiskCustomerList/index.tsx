import React, { useCallback } from 'react';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { ListRenderItem } from '@shopify/flash-list';
import { Button } from '@src/shared/ui/Button';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AtRiskCustomerCard } from '../AtRiskCustomerCard';
import { AtRiskEmptyState } from '../AtRiskEmptyState';
import type { AtRiskCustomer, AtRiskCustomersData } from '../../types';
import { createStyles } from './AtRiskCustomerList.styles';

type Pagination = AtRiskCustomersData['pagination'];

interface AtRiskCustomerListProps {
  customers: AtRiskCustomer[];
  isLoading: boolean;
  isRefreshing: boolean;
  searchActive: boolean;
  pagination?: Pagination;
  onRefresh: () => void;
  onPageChange: (page: number) => void;
  onWhatsApp: (customer: AtRiskCustomer) => void;
  onCall: (customer: AtRiskCustomer) => void;
  onDetail: (customer: AtRiskCustomer) => void;
  onWinBack: (customer: AtRiskCustomer) => void;
}

export function AtRiskCustomerList({
  customers, isLoading, isRefreshing, searchActive, pagination, onRefresh, onPageChange,
  onWhatsApp, onCall, onDetail, onWinBack,
}: AtRiskCustomerListProps) {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const renderItem: ListRenderItem<AtRiskCustomer> = useCallback(({ item }) => (
    <AtRiskCustomerCard
      customer={item}
      onWhatsApp={onWhatsApp}
      onCall={onCall}
      onDetail={onDetail}
      onWinBack={onWinBack}
    />
  ), [onCall, onDetail, onWhatsApp, onWinBack]);

  if (isLoading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary.main} /></View>;
  }

  const footer = pagination && pagination.totalPages > 1 ? (
    <View style={styles.pagination}>
      <Button title="Précédent" variant="outline" onPress={() => onPageChange(pagination.page - 1)} disabled={isRefreshing || !pagination.hasPrevPage} style={styles.pageButton} />
      <View style={styles.pageInfo}>
        <Text style={styles.pageValue}>{pagination.page} / {pagination.totalPages}</Text>
        <Text style={styles.pageLabel}>{pagination.total} résultat{pagination.total > 1 ? 's' : ''}</Text>
      </View>
      <Button title="Suivant" variant="outline" onPress={() => onPageChange(pagination.page + 1)} disabled={isRefreshing || !pagination.hasNextPage} style={styles.pageButton} />
    </View>
  ) : null;

  return (
    <FlashList
      style={styles.list}
      data={customers}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={colors.primary.main} colors={[colors.primary.main]} />}
      ListEmptyComponent={<AtRiskEmptyState searchActive={searchActive} />}
      ListFooterComponent={footer}
    />
  );
}

const keyExtractor = (item: AtRiskCustomer) => item.userId;
