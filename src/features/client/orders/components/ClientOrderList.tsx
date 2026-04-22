import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Theme } from '@src/constants/Theme';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { Order } from '../types';
import { ClientOrderCard } from './ClientOrderCard';
import { ClientOrderCardSkeleton } from './ClientOrderCardSkeleton';

interface ClientOrderListProps {
  orders: Order[];
  isLoading: boolean;
  isRefetching?: boolean;
  onOrderPress: (order: Order) => void;
  onRefresh?: () => void;
}

export const ClientOrderList: React.FC<ClientOrderListProps> = ({
  orders,
  isLoading,
  isRefetching,
  onOrderPress,
  onRefresh,
}) => {
  if (isLoading) {
    return <ClientOrderCardSkeleton count={5} />;
  }

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="package-variant-closed"
          title="Aucune commande"
          message="Vous n'avez pas encore de commandes"
        />
      </View>
    );
  }

  return (
    <FlashList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ClientOrderCard order={item} onPress={onOrderPress} />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefetching ?? false}
            onRefresh={onRefresh}
            tintColor={Theme.primary[500]}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: Theme.spacing.md,
  },
});

export default ClientOrderList;
