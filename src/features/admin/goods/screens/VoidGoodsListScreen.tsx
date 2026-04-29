/**
 * VoidGoodsListScreen - List all goods with option to void
 * Admin can view and void goods from here
 * SRP: Screen composition only - no business logic
 */

import React from 'react';
import { View, RefreshControl, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { useVoidGoodsList } from '../hooks/useVoidGoodsList';
import { VoidGoodsListFilters } from '../components/VoidGoodsListFilters';
import { VoidGoodsListItem } from '../components/VoidGoodsListItem';
import { VoidGoodsListEmpty } from '../components/VoidGoodsListEmpty';
import { Goods } from '../types';

export const VoidGoodsListScreen: React.FC = () => {
  const navigation = useNavigation();
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
  } = useVoidGoodsList();

  const handleVoidPress = (goods: Goods) => {
    navigation.navigate('VoidGoods' as never, {
      goodsId: goods._id,
      goodsTrackingCode: goods.goodsId,
      cbm: goods.actualCBM,
    } as never);
  };

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
          renderItem={({ item }) => (
            <VoidGoodsListItem item={item} onVoidPress={handleVoidPress} />
          )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default VoidGoodsListScreen;
