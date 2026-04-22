/**
 * PackingListTable - Goods table with sorting for packing list
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Goods } from '../../goods/types';

type SortField = 'goodsId' | 'description' | 'actualCBM' | 'weight' | 'quantity';
type SortDirection = 'asc' | 'desc';

interface PackingListTableProps {
  goods: Goods[];
  showPhotos?: boolean;
  startIndex?: number;
  sortable?: boolean;
}

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export const PackingListTable: React.FC<PackingListTableProps> = ({
  goods,
  showPhotos = false,
  startIndex = 1,
  sortable = true,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'goodsId',
    direction: 'asc',
  });

  const handleSort = (field: SortField) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedGoods = (() => {
    if (!sortable) return goods;

    return [...goods].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();

      if (sortConfig.direction === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  })();

  const renderSortIcon = (field: SortField) => {
    if (!sortable || sortConfig.field !== field) {
      return <Ionicons name="swap-vertical" size={14} color={Theme.neutral[400]} />;
    }
    return (
      <Ionicons
        name={sortConfig.direction === 'asc' ? 'chevron-up' : 'chevron-down'}
        size={14}
        color={Theme.primary[600]}
      />
    );
  };

  const SortableHeader: React.FC<{
    field: SortField;
    label: string;
    flex: number;
    align?: 'left' | 'center' | 'right';
  }> = ({ field, label, flex, align = 'left' }) => (
    <TouchableOpacity
      style={[styles.headerCell, { flex }]}
      onPress={() => handleSort(field)}
      disabled={!sortable}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.headerText,
          align === 'center' && styles.textCenter,
          align === 'right' && styles.textRight,
        ]}
      >
        {label}
      </Text>
      <View style={styles.sortIcon}>{renderSortIcon(field)}</View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.headerRow}>
        <View style={[styles.headerCell, { flex: 0.5 }]}>
          <Text style={styles.headerText}>N°</Text>
        </View>
        <SortableHeader field="goodsId" label="ID" flex={1.2} />
        <SortableHeader field="description" label="Description" flex={2} />
        {showPhotos && (
          <View style={[styles.headerCell, { flex: 0.6 }]}>
            <Text style={styles.headerText}>Photo</Text>
          </View>
        )}
        <SortableHeader field="actualCBM" label="CBM" flex={0.8} align="right" />
        <SortableHeader field="weight" label="Poids" flex={0.8} align="right" />
        <SortableHeader field="quantity" label="Qté" flex={0.6} align="right" />
      </View>

      {/* Table Body */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {sortedGoods.map((item, index) => (
          <View
            key={item._id || item.goodsId || `item-${index}`}
            style={[
              styles.dataRow,
              index % 2 === 0 ? styles.rowEven : styles.rowOdd,
              index === sortedGoods.length - 1 && styles.lastRow,
            ]}
          >
            <Text style={[styles.cell, { flex: 0.5 }, styles.cellNumber]}>
              {startIndex + index}
            </Text>
            <Text style={[styles.cell, { flex: 1.2 }, styles.cellId]}>
              {item.goodsId}
            </Text>
            <Text
              style={[styles.cell, { flex: 2 }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.description || '-'}
            </Text>
            {showPhotos && (
              <View style={[styles.cell, { flex: 0.6 }, styles.photoCell]}>
                {(() => {
                  const photoUrls = item.photos?.length ? item.photos : (item.images || []);
                  return photoUrls.length > 0 ? (
                    <Image source={{ uri: photoUrls[0] }} style={styles.photo} />
                  ) : (
                    <View style={styles.noPhoto}>
                      <Ionicons name="image-outline" size={16} color={Theme.neutral[400]} />
                    </View>
                  );
                })()}
              </View>
            )}
            <Text style={[styles.cell, { flex: 0.8 }, styles.cellNumeric]}>
              {item.actualCBM.toFixed(2)}
            </Text>
            <Text style={[styles.cell, { flex: 0.8 }, styles.cellNumeric]}>
              {item.weight.toFixed(0)}
            </Text>
            <Text style={[styles.cell, { flex: 0.6 }, styles.cellNumeric]}>
              {item.quantity || 1}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Empty State */}
      {sortedGoods.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="cube-outline" size={32} color={Theme.neutral[400]} />
          <Text style={styles.emptyText}>Aucune marchandise</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.neutral[200],
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: Theme.primary[50],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Theme.primary[200],
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.primary[700],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sortIcon: {
    marginLeft: 2,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  body: {
    maxHeight: 300,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
    alignItems: 'center',
  },
  rowEven: {
    backgroundColor: Theme.colors.background.card,
  },
  rowOdd: {
    backgroundColor: Theme.neutral[50],
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cell: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[700],
    paddingHorizontal: 4,
  },
  cellNumber: {
    fontWeight: '700',
    color: Theme.primary[600],
  },
  cellId: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 11,
  },
  cellNumeric: {
    textAlign: 'right',
    fontWeight: '600',
  },
  photoCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 32,
    height: 32,
    borderRadius: Theme.radius.sm,
    backgroundColor: Theme.neutral[200],
  },
  noPhoto: {
    width: 32,
    height: 32,
    borderRadius: Theme.radius.sm,
    backgroundColor: Theme.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: Theme.spacing.sm,
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
  },
});

export default PackingListTable;
