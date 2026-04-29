/**
 * VoidGoodsListFilters - Search and filter controls for void goods list
 * SRP: Renders search bar and status filter menu
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar, Menu, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'In Warehouse',
  ASSIGNED_TO_CONTAINER: 'Assigned',
  IN_TRANSIT: 'In Transit',
  VOID: 'Voided',
};

interface VoidGoodsListFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string | null;
  onStatusFilterChange: (status: string | null) => void;
  menuVisible: boolean;
  onMenuVisibleChange: (visible: boolean) => void;
  resultCount: number;
}

export const VoidGoodsListFilters: React.FC<VoidGoodsListFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  menuVisible,
  onMenuVisibleChange,
  resultCount,
}) => {
  const handleSelect = (status: string | null) => {
    onStatusFilterChange(status);
    onMenuVisibleChange(false);
  };

  return (
    <>
      <Searchbar
        placeholder="Search by goods ID, client name..."
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.filterRow}>
        <Menu
          visible={menuVisible}
          onDismiss={() => onMenuVisibleChange(false)}
          anchor={
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => onMenuVisibleChange(true)}
            >
              <MaterialCommunityIcons
                name="filter-variant"
                size={20}
                color={Theme.primary[600]}
              />
              <Text style={styles.filterText}>
                {statusFilter ? STATUS_LABELS[statusFilter] : 'All Status'}
              </Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => handleSelect(null)} title="All Status" />
          <Divider />
          <Menu.Item
            onPress={() => handleSelect('RECEIVED_AT_WAREHOUSE')}
            title="In Warehouse"
          />
          <Menu.Item
            onPress={() => handleSelect('ASSIGNED_TO_CONTAINER')}
            title="Assigned"
          />
          <Menu.Item
            onPress={() => handleSelect('IN_TRANSIT')}
            title="In Transit"
          />
          <Menu.Item onPress={() => handleSelect('VOID')} title="Voided" />
        </Menu>
        <Text style={styles.resultCount}>{resultCount} items</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 12,
    borderRadius: 12,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: Theme.primary[50],
    borderRadius: 8,
  },
  filterText: {
    marginLeft: 8,
    color: Theme.primary[600],
    fontWeight: '600',
  },
  resultCount: {
    color: Theme.neutral[500],
    fontSize: 14,
  },
});
