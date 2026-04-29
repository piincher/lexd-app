import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { CargoBagDetailGoodsItem } from './CargoBagDetailGoodsItem';
import type { AirwayBillGoods } from '../../types';

interface Props {
  goodsList: AirwayBillGoods[];
  removeMode: boolean;
  selectedRemoveIds: string[];
  onToggleSelection: (id: string) => void;
  onAddGoods: () => void;
}

export const CargoBagDetailGoodsList: React.FC<Props> = ({
  goodsList,
  removeMode,
  selectedRemoveIds,
  onToggleSelection,
  onAddGoods,
}) => {
  const { colors } = useAppTheme();
  const isEmpty = goodsList.length === 0;

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Marchandises ({goodsList.length})
        </Text>
      </View>

      {isEmpty ? (
        <EmptyState
          icon="cube-outline"
          title="Aucune marchandise"
          message="Ce sac ne contient encore aucune marchandise."
          actionLabel="Ajouter des marchandises"
          onAction={onAddGoods}
        />
      ) : (
        <FlashList
          data={goodsList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CargoBagDetailGoodsItem
              item={item}
              isSelected={selectedRemoveIds.includes(item._id)}
              removeMode={removeMode}
              onToggleSelection={onToggleSelection}
            />
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
});
