/**
 * AllOrdersScreen - Professional logistics orders view
 * SRP: Layout composition ONLY (<100 lines)
 */

import React, { useState, useMemo } from 'react';
import { View, RefreshControl, ActivityIndicator, ScrollView, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Searchbar, Button } from 'react-native-paper';
import { Screen } from '@src/shared/ui';
import { COLORS } from '@src/constants/Colors';
import { useGetAllOrders } from '../hooks/useOrderManagement';
import { OrderCard } from './components/OrderCard';
import { OrdersStats } from './components/OrdersStats';
import { EmptyOrders } from './components/EmptyOrders';
import { AddOrderButton } from './components/AddOrderButton';
import { styles } from './AllOrdersScreen.styles';

const STATUS_TABS = [
  { key: null, label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'Active', label: 'Active' },
  { key: 'In Transit', label: 'Transit' },
  { key: 'Delivered', label: 'Delivered' },
];

const AllOrdersScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { data, isLoading, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = 
    useGetAllOrders();
  
  console.log('[AllOrdersScreen] Data:', data, 'Error:', error);
  
  const orders = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page || []);
  }, [data]);

  console.log('[AllOrdersScreen] Orders count:', orders.length);

  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    return orders.filter((order: any) => {
      if (!order) return false;
      const matchesSearch = 
        order.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.clientPhone?.includes(searchQuery);
      if (!statusFilter) return matchesSearch;
      return matchesSearch && order.status === statusFilter;
    });
  }, [orders, searchQuery, statusFilter]);

  const loadMore = () => hasNextPage && !isFetchingNextPage && fetchNextPage();

  const renderOrderCard = ({ item }: { item: any }) => {
    if (!item) return null;
    return <OrderCard order={item} />;
  };

  if (error) {
    return (
      <Screen header={{ title: 'Orders' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: 'red', textAlign: 'center' }}>
            Error loading orders: {error.message}
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={{ title: 'Orders', subtitle: 'Manage all shipments' }}>
      <View style={styles.container}>
        {/* Stats Section */}
        <OrdersStats orders={orders} />

        {/* Search Bar */}
        <Searchbar
          placeholder="Search orders..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor={COLORS.blue}
        />

        {/* Status Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {STATUS_TABS.map((tab) => (
            <Button
              key={tab.label}
              mode={statusFilter === tab.key ? 'contained' : 'outlined'}
              onPress={() => setStatusFilter(tab.key as string | null)}
              style={styles.tabButton}
              buttonColor={statusFilter === tab.key ? COLORS.blue : undefined}
              textColor={statusFilter === tab.key ? '#FFF' : COLORS.grey}
              compact
            >
              {tab.label}
            </Button>
          ))}
        </ScrollView>

        {/* Orders List with FlashList */}
        <View style={styles.listContainer}>
          <FlashList
            data={filteredOrders}
            keyExtractor={(item, index) => item?._id || `order-${index}`}
            renderItem={renderOrderCard}
            estimatedItemSize={180}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator style={styles.loadMoreIndicator} color={COLORS.blue} />
              ) : null
            }
            ListEmptyComponent={isLoading ? null : <EmptyOrders />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </View>

        <AddOrderButton />
      </View>
    </Screen>
  );
};

export default AllOrdersScreen;
