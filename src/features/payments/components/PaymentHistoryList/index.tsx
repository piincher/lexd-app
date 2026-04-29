import React from 'react';
import { View, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { PaymentHistoryItem } from '../../types';
import { PaymentHistoryListItem } from '../PaymentHistoryListItem';

interface PaymentHistoryListProps {
  payments: PaymentHistoryItem[];
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  ListEmptyComponent: React.ReactElement | null;
}

export const PaymentHistoryList: React.FC<PaymentHistoryListProps> = ({
  payments,
  isLoading,
  refreshing,
  onRefresh,
  onEndReached,
  ListEmptyComponent,
}) => {
  const { colors } = useAppTheme();

  return (
    <FlashList
      data={payments}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PaymentHistoryListItem item={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={
        isLoading && payments.length > 0 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary.main} />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  loaderContainer: {
    paddingVertical: 24,
  },
});
