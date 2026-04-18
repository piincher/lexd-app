/**
 * VoidGoodsListScreen - List all goods with option to void
 * Admin can view and void goods from here
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Badge, IconButton, Searchbar, Menu, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { Theme } from '@src/constants/Theme';
import { useGetAllGoods } from '../hooks';
import { Goods } from '../types';

const STATUS_COLORS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: '#2196F3',
  ASSIGNED_TO_CONTAINER: '#FF9800',
  LOADED_IN_CONTAINER: '#9C27B0',
  IN_TRANSIT: '#3F51B5',
  ARRIVED_DESTINATION: '#009688',
  READY_FOR_PICKUP: '#4CAF50',
  DELIVERED: '#757575',
  VOID: '#DC2626',
};

const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'In Warehouse',
  ASSIGNED_TO_CONTAINER: 'Assigned',
  LOADED_IN_CONTAINER: 'Loaded',
  IN_TRANSIT: 'In Transit',
  ARRIVED_DESTINATION: 'Arrived',
  READY_FOR_PICKUP: 'Ready',
  DELIVERED: 'Delivered',
  VOID: 'Voided',
};

export const VoidGoodsListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const { data, isLoading, refetch } = useGetAllGoods({
    status: statusFilter || undefined,
    search: searchQuery || undefined,
  });

  const goodsList = data?.data?.data || data?.data?.goods || [];

  const handleVoidPress = (goods: Goods) => {
    navigation.navigate('VoidGoods' as never, {
      goodsId: goods._id,
      goodsTrackingCode: goods.goodsId,
      cbm: goods.actualCBM,
    } as never);
  };

  const renderGoodsItem = ({ item }: { item: Goods }) => (
    <Card style={styles.goodsCard}>
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.goodsIdContainer}>
            <MaterialCommunityIcons name="package-variant" size={24} color={Theme.primary[600]} />
            <Text style={styles.goodsId}>{item.goodsId}</Text>
          </View>
          <Badge
            style={[
              styles.statusBadge,
              { backgroundColor: STATUS_COLORS[item.status] || '#757575' + '20' },
            ]}
          >
            <Text style={[styles.statusText, { color: STATUS_COLORS[item.status] || '#757575' }]}>
              {STATUS_LABELS[item.status] || item.status}
            </Text>
          </Badge>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Client</Text>
            <Text style={styles.detailValue}>
              {typeof item.clientId === 'object'
                ? `${item.clientId.firstName} ${item.clientId.lastName}`
                : 'Unknown'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>CBM</Text>
            <Text style={styles.detailValue}>{item.actualCBM?.toFixed(3) || '0'} m³</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Value</Text>
            <Text style={styles.detailValue}>{item.totalCost?.toLocaleString() || '0'} FCFA</Text>
          </View>
        </View>

        {item.status !== 'VOID' && (
          <TouchableOpacity
            style={styles.voidButton}
            onPress={() => handleVoidPress(item)}
          >
            <MaterialCommunityIcons name="cancel" size={20} color="#DC2626" />
            <Text style={styles.voidButtonText}>Void Goods</Text>
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <Screen
      header={{
        title: 'Void Goods',
        subtitle: 'Manage and void goods',
      }}
    >
      <View style={styles.container}>
        {/* Search Bar */}
        <Searchbar
          placeholder="Search by goods ID, client name..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/* Filter Row */}
        <View style={styles.filterRow}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setMenuVisible(true)}
              >
                <MaterialCommunityIcons name="filter-variant" size={20} color={Theme.primary[600]} />
                <Text style={styles.filterText}>
                  {statusFilter ? STATUS_LABELS[statusFilter] : 'All Status'}
                </Text>
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => { setStatusFilter(null); setMenuVisible(false); }} title="All Status" />
            <Divider />
            <Menu.Item onPress={() => { setStatusFilter('RECEIVED_AT_WAREHOUSE'); setMenuVisible(false); }} title="In Warehouse" />
            <Menu.Item onPress={() => { setStatusFilter('ASSIGNED_TO_CONTAINER'); setMenuVisible(false); }} title="Assigned" />
            <Menu.Item onPress={() => { setStatusFilter('IN_TRANSIT'); setMenuVisible(false); }} title="In Transit" />
            <Menu.Item onPress={() => { setStatusFilter('VOID'); setMenuVisible(false); }} title="Voided" />
          </Menu>

          <Text style={styles.resultCount}>{goodsList.length} items</Text>
        </View>

        {/* Goods List */}
        <FlashList
          data={goodsList}
          keyExtractor={(item) => item._id}
          renderItem={renderGoodsItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="package-variant-off" size={64} color={Theme.neutral[300]} />
              <Text style={styles.emptyText}>No goods found</Text>
            </View>
          }
        />
      </View>
    </Screen>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 12,
    borderRadius: 12,
  },
  filterRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: 8,
    backgroundColor: Theme.primary[50],
    borderRadius: 8,
  },
  filterText: {
    marginLeft: 8,
    color: Theme.primary[600],
    fontWeight: '600' as const,
  },
  resultCount: {
    color: Theme.neutral[500],
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
  goodsCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  goodsIdContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  goodsId: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Theme.neutral[800],
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700' as const,
  },
  divider: {
    marginVertical: 12,
  },
  detailsRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Theme.neutral[800],
  },
  voidButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  voidButtonText: {
    marginLeft: 8,
    color: '#DC2626',
    fontWeight: '600' as const,
  },
  emptyContainer: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: Theme.neutral[500],
  },
};

export default VoidGoodsListScreen;
