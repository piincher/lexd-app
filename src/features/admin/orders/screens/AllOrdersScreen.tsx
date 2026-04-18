/**
 * AllOrdersScreen - Professional logistics orders view
 * SRP: Layout composition ONLY
 */

import React, { useState, useMemo, useCallback, useRef } from 'react';

import { View, RefreshControl, ScrollView, Text, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Searchbar, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthenticatedStackParamList } from '@src/navigation/types';
import { Screen } from '@src/shared/ui/Screen';
import { COLORS } from '@src/constants/Colors';
import { useGetAllOrders, useSyncOrderStatuses } from '../hooks/useOrderManagement';
import { OrderCard } from './components/OrderCard';
import { OrdersStats } from './components/OrdersStats';
import { EmptyOrders } from './components/EmptyOrders';
import { AddOrderButton } from './components/AddOrderButton';
import { OrderCardSkeleton, OrderCardFooterSkeleton } from './components/OrderCardSkeleton';
import { OrderBulkActionBar } from './components/OrderBulkActionBar';
import { useOrderBulkActions } from './hooks/useOrderBulkActions';
import { styles } from './AllOrdersScreen.styles';

const STATUS_TABS = [
  { key: undefined, label: 'All' },
  { key: 'Pending', label: 'Pending' },
  { key: 'Active', label: 'Active' },
  { key: 'In Transit', label: 'Transit' },
  { key: 'Delivered', label: 'Delivered' },
];

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

const AllOrdersScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  // Gate to prevent onEndReached auto-fetch cascade.
  // After each fetch, set to true. Reset to false on user scroll.
  const hasCalledOnEnd = useRef(false);

  // Pass status filter to the API for server-side filtering
  const { data, isLoading, isFetching, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllOrders(statusFilter);

  const { mutate: syncOrderStatuses, isPending: isSyncing } = useSyncOrderStatuses();

  const handleSyncOrderStatuses = () => {
    Alert.alert(
      'Sync Order Statuses',
      'This will sync all order statuses from their linked goods. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sync',
          onPress: () => {
            syncOrderStatuses(undefined, {
              onSuccess: (result) => {
                Alert.alert(
                  'Sync Complete',
                  `Processed ${result.affectedOrders} orders\nUpdated ${result.updatedCount} orders`
                );
                refetch();
              },
              onError: (error: any) => {
                Alert.alert('Sync Failed', error?.message || 'Failed to sync order statuses');
              },
            });
          },
        },
      ]
    );
  };

  const orders = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page || []);
  }, [data]);

  // Client-side search filter only (status is handled server-side)
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    if (!searchQuery) return orders;
    const query = searchQuery.toLowerCase();
    return orders.filter((order: any) => {
      if (!order) return false;
      return (
        order.clientName?.toLowerCase().includes(query) ||
        order.code?.toLowerCase().includes(query) ||
        order.clientPhone?.includes(searchQuery)
      );
    });
  }, [orders, searchQuery]);

  // Reset the gate when user scrolls — allows next onEndReached to fire
  const handleMomentumScrollBegin = useCallback(() => {
    hasCalledOnEnd.current = false;
  }, []);

  const loadMore = useCallback(() => {
    if (hasCalledOnEnd.current) return;
    if (hasNextPage && !isFetchingNextPage) {
      hasCalledOnEnd.current = true;
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const {
    selectedOrderIds,
    isSelectionMode,
    setIsSelectionMode,
    toggleSelectOrder,
    toggleSelectAllOrders,
    exitSelectionMode,
    isBatchUpdating,
    handleChangeOrderStatus,
  } = useOrderBulkActions(filteredOrders, refetch);

  const renderOrderCard = ({ item }: { item: any }) => {
    if (!item) return null;
    return (
      <OrderCard
        order={item}
        isSelectionMode={isSelectionMode}
        isSelected={selectedOrderIds.includes(item._id)}
        onToggleSelect={() => toggleSelectOrder(item._id)}
      />
    );
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
    <Screen 
      header={{ 
        title: 'Orders', 
        rightAction: (
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon={isSelectionMode ? 'close' : 'checkbox-multiple-marked-outline'}
              size={24}
              onPress={() => {
                if (isSelectionMode) exitSelectionMode();
                else setIsSelectionMode(true);
              }}
              iconColor={COLORS.blue}
            />
            <IconButton
              icon="sync"
              size={24}
              onPress={handleSyncOrderStatuses}
              loading={isSyncing}
              disabled={isSyncing}
              iconColor={COLORS.blue}
            />
          </View>
        )
      }} 
      scrollable={false}
    >
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
              onPress={() => setStatusFilter(tab.key)}
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
          {!data?.pages?.length && (isLoading || isFetching) ? (
            <OrderCardSkeleton count={5} />
          ) : (
            <FlashList
              data={filteredOrders}
              keyExtractor={(item, index) => item?._id || `order-${index}`}
              renderItem={renderOrderCard}

              refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
              onEndReached={loadMore}
              onEndReachedThreshold={0.3}
              onMomentumScrollBegin={handleMomentumScrollBegin}
              ListFooterComponent={
                isFetchingNextPage ? <OrderCardFooterSkeleton /> : null
              }
              ListEmptyComponent={<EmptyOrders />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          )}
        </View>

        {!isSelectionMode && <AddOrderButton />}
        {isSelectionMode && (
          <OrderBulkActionBar
            selectedCount={selectedOrderIds.length}
            totalCount={filteredOrders.length}
            isPending={isBatchUpdating}
            onToggleSelectAll={toggleSelectAllOrders}
            onChangeStatus={handleChangeOrderStatus}
            onCancel={exitSelectionMode}
          />
        )}
      </View>
    </Screen>
  );
};

export default AllOrdersScreen;
