import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { AssignGoodsListItem } from '../../screens/components/AssignGoodsListItem';
import type { AirwayBillGoods } from '../../types';

interface Props {
  goodsList: AirwayBillGoods[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const AssignGoodsList: React.FC<Props> = ({ goodsList, selectedIds, onToggle }) => {
  const renderItem = useCallback(
    ({ item }: { item: AirwayBillGoods }) => (
      <AssignGoodsListItem
        item={item}
        isSelected={selectedIds.includes(item._id)}
        onToggle={onToggle}
      />
    ),
    [selectedIds, onToggle]
  );

  return (
    <FlashList
      data={goodsList}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="cube-outline" size={48} color={Theme.neutral[300]} />
          <Text style={styles.emptyText}>Aucune marchandise aérienne disponible</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: { paddingHorizontal: Theme.spacing.lg, paddingBottom: 100 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { marginTop: Theme.spacing.md, fontSize: 14, color: Theme.neutral[400] },
});
