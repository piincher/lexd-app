/**
 * Unpaid Goods List Component
 * Selectable list of unpaid goods with checkboxes and totals
 */

import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { Text, Card, Checkbox, Divider, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UnpaidGoods } from '../types';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

interface UnpaidGoodsListProps {
  goods: UnpaidGoods[];
  selectedIds: string[];
  onToggleSelection: (goodsId: string) => void;
  onSelectAll: () => void;
  currency: string;
  disabled?: boolean;
}

export const UnpaidGoodsList: React.FC<UnpaidGoodsListProps> = ({
  goods,
  selectedIds,
  onToggleSelection,
  onSelectAll,
  currency,
  disabled = false,
}) => {
  const theme = useTheme();
  const allSelected = goods.length > 0 && selectedIds.length === goods.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < goods.length;
  const totalSelected = selectedIds.reduce((sum, id) => {
    const item = goods.find((g) => g._id === id);
    return sum + (item?.balanceDue || 0);
  }, 0);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency || 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderItem: ListRenderItem<UnpaidGoods> = ({ item }) => {
    const isSelected = selectedIds.includes(item._id);

    return (
      <TouchableOpacity
        onPress={() => !disabled && onToggleSelection(item._id)}
        disabled={disabled}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <View style={[styles.goodsItem, isSelected && styles.selectedItem]}>
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => onToggleSelection(item._id)}
            disabled={disabled}
            color={theme.colors.primary}
          />

          <View style={styles.goodsInfo}>
            <Text style={styles.goodsId} numberOfLines={1}>
              {item.goodsId}
            </Text>
            <Text style={styles.goodsDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>

          <View style={styles.goodsAmount}>
            <Text style={styles.balanceDue}>{formatCurrency(item.balanceDue)}</Text>
            <Text style={styles.totalCost}>Total: {formatCurrency(item.totalCost)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons
        name="check-circle-outline"
        size={48}
        color={Theme.status.success}
      />
      <Text style={styles.emptyTitle}>Aucune dette</Text>
      <Text style={styles.emptySubtitle}>
        Vous n'avez aucune marchandise en attente de paiement.
      </Text>
    </View>
  );

  return (
    <Card style={styles.container}>
      <Card.Content>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Marchandises à payer</Text>
          {goods.length > 0 && (
            <TouchableOpacity
              onPress={onSelectAll}
              disabled={disabled}
              style={styles.selectAllButton}
            >
              <Checkbox
                status={allSelected ? 'checked' : someSelected ? 'indeterminate' : 'unchecked'}
                onPress={onSelectAll}
                disabled={disabled}
                color={theme.colors.primary}
              />
              <Text style={styles.selectAllText}>
                {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Divider style={styles.divider} />

        {/* Goods List */}
        {goods.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={goods}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <Divider style={styles.itemDivider} />}
          />
        )}

        {/* Total Section */}
        {selectedIds.length > 0 && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>
                  {selectedIds.length} article{selectedIds.length > 1 ? 's' : ''} sélectionné
                  {selectedIds.length > 1 ? 's' : ''}
                </Text>
                <Text style={styles.totalAmount}>
                  {formatCurrency(totalSelected)}
                </Text>
              </View>
            </View>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral[800],
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: Theme.neutral[600],
  },
  divider: {
    marginVertical: Theme.spacing.sm,
  },
  itemDivider: {
    marginVertical: Theme.spacing.xs,
  },
  goodsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xs,
    borderRadius: Theme.radius.md,
  },
  selectedItem: {
    backgroundColor: `${Theme.primary[100]}50`,
  },
  goodsInfo: {
    flex: 1,
    marginHorizontal: Theme.spacing.sm,
  },
  goodsId: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: Theme.neutral[800],
  },
  goodsDescription: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  goodsAmount: {
    alignItems: 'flex-end',
  },
  balanceDue: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  totalCost: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  totalSection: {
    paddingTop: Theme.spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: Theme.neutral[600],
  },
  totalAmount: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Theme.neutral[800],
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['3xl'],
  },
  emptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[800],
    marginTop: Theme.spacing.md,
  },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
    textAlign: 'center',
  },
});

export default UnpaidGoodsList;
