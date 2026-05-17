/**
 * VoidGoodsListScreen - List all goods with option to void
 * Admin can view and void goods from here
 * SRP: Screen composition only - no business logic
 */

import React from 'react';
import { View, RefreshControl } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Screen } from '@src/shared/ui/Screen';
import { useVoidGoodsListScreen } from './hooks/useVoidGoodsListScreen';
import { VoidGoodsListFilters } from '../components/VoidGoodsListFilters';
import { VoidGoodsListItem } from '../components/VoidGoodsListItem';
import { VoidGoodsListEmpty } from '../components/VoidGoodsListEmpty';
import { Goods } from '../types';
import { createVoidGoodsListScreenStyles } from './VoidGoodsListScreen.styles';

export const VoidGoodsListScreen: React.FC = () => {
  const {
    goodsList,
    isLoading,
    refetch,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    menuVisible,
    setMenuVisible,
    handlers,
  } = useVoidGoodsListScreen();

  const styles = createVoidGoodsListScreenStyles();

  const renderItem: ListRenderItem<Goods> = ({ item }) => (
    <VoidGoodsListItem item={item} onVoidPress={handlers.handleVoidPress} />
  );

  return (
    <Screen
      header={{
        title: 'Void Goods',
        subtitle: 'Manage and void goods',
        showNotificationBell: true,
      }}
    >
      <View style={styles.container}>
        <VoidGoodsListFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          menuVisible={menuVisible}
          onMenuVisibleChange={setMenuVisible}
          resultCount={goodsList.length}
        />
        <FlashList
          data={goodsList}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          ListEmptyComponent={<VoidGoodsListEmpty />}
        />
      </View>
    </Screen>
  );
};

export default VoidGoodsListScreen;
