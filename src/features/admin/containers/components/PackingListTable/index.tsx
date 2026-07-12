import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { PackingListGoods } from '@src/shared/types/packingListGoods';
import { createStyles } from "./PackingListTable.styles";
import { SortableHeader } from "./SortableHeader";
import { PackingListRow } from "./PackingListRow";
import { usePackingListSort } from "./usePackingListSort";
import { PackingListCard } from './PackingListCard';
import { CompactSortBar } from './CompactSortBar';

interface PackingListTableProps {
  goods: PackingListGoods[];
  showPhotos?: boolean;
  startIndex?: number;
  sortable?: boolean;
}

export const PackingListTable: React.FC<PackingListTableProps> = ({
  goods, showPhotos = false, startIndex = 1, sortable = true,
}) => {
  const { colors, isDark } = useAppTheme();
  const { width } = useWindowDimensions();
  const styles = createStyles(colors, isDark);
  const { sortConfig, handleSort, sortedGoods } = usePackingListSort(goods, sortable);
  const compact = width < 600;

  return (
    <View style={styles.container}>
      {compact && sortable && <CompactSortBar sortConfig={sortConfig} onSort={handleSort} />}
      {!compact && <View style={styles.headerRow}>
        <View style={[styles.headerCell, { flex: 0.5 }]}>
          <Text style={styles.headerText}>N°</Text>
        </View>
        <SortableHeader field="goodsId" label="ID" flex={1.2} sortConfig={sortConfig} sortable={sortable} onSort={handleSort} />
        <SortableHeader field="description" label="Description" flex={2} sortConfig={sortConfig} sortable={sortable} onSort={handleSort} />
        {showPhotos && (
          <View style={[styles.headerCell, { flex: 0.6 }]}>
            <Text style={styles.headerText}>Photo</Text>
          </View>
        )}
        <SortableHeader field="actualCBM" label="CBM" flex={0.8} align="right" sortConfig={sortConfig} sortable={sortable} onSort={handleSort} />
        <SortableHeader field="weight" label="Poids" flex={0.8} align="right" sortConfig={sortConfig} sortable={sortable} onSort={handleSort} />
        <SortableHeader field="quantity" label="Qté" flex={0.6} align="right" sortConfig={sortConfig} sortable={sortable} onSort={handleSort} />
      </View>}

      {sortedGoods.map((item, index) => (
          compact ? <PackingListCard
            key={item._id || item.goodsId}
            item={item}
            index={startIndex + index}
            showPhotos={showPhotos}
          /> : <PackingListRow
            key={item._id || item.goodsId || `item-${index}`}
            item={item}
            index={startIndex + index}
            showPhotos={showPhotos}
            isLast={index === sortedGoods.length - 1}
          />
        ))}

      {sortedGoods.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="cube-outline" size={32} color={colors.neutral[400]} />
          <Text style={styles.emptyText}>Aucune marchandise</Text>
        </View>
      )}
    </View>
  );
};

export default PackingListTable;
