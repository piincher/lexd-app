/**
 * AllOrdersScreen - Screen to view ALL orders
 * SRP: Layout composition ONLY (<100 lines)
 */

import React, { useState } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Searchbar, Button, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui';
import { COLORS } from '@src/constants/Colors';
import { useGetActiveOrdersAdmin } from '../hooks/useOrderManagement';
import { OrderCard } from './components/OrderCard';
import { FilterMenu } from './components/FilterMenu';
import { EmptyOrders } from './components/EmptyOrders';
import { AddOrderButton } from './components/AddOrderButton';
import { styles } from './AllOrdersScreen.styles';

const AllOrdersScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'active' | 'past'>('all');

  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = 
    useGetActiveOrdersAdmin(statusFilter || 'Active', new Date(), 'sea');

  const orders = data?.pages?.flatMap((page) => page) || [];

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = 
      order.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.code?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (viewMode === 'all') return matchesSearch;
    if (viewMode === 'active') return matchesSearch && order.status === 'Active';
    if (viewMode === 'past') return matchesSearch && (order.status === 'Delivered' || order.status === 'Inactive');
    return matchesSearch;
  });

  const loadMore = () => hasNextPage && !isFetchingNextPage && fetchNextPage();

  return (
    <Screen header={{ title: 'All Orders', subtitle: `${filteredOrders.length} orders` }}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search orders..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <View style={styles.filterRow}>
          <View style={styles.viewModeContainer}>
            {(['all', 'active', 'past'] as const).map((mode) => (
              <Button
                key={mode}
                mode={viewMode === mode ? 'contained' : 'outlined'}
                onPress={() => setViewMode(mode)}
                style={styles.viewModeButton}
                compact
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </View>
          <FilterMenu statusFilter={statusFilter} onSelect={setStatusFilter} />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <OrderCard order={item} />}
            contentContainerStyle={styles.listContainer}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={styles.loadMoreIndicator} /> : null}
            ListEmptyComponent={<EmptyOrders />}
          />
        )}

        <AddOrderButton />
      </View>
    </Screen>
  );
};

export default AllOrdersScreen;
