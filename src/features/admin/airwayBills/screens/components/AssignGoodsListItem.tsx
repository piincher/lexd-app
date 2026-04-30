import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import type { AirwayBillGoods } from '../../types';

interface Props {
  item: AirwayBillGoods;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const AssignGoodsListItem: React.FC<Props> = ({ item, isSelected, onToggle }) => {
  const clientName = item.clientId && typeof item.clientId !== 'string'
    ? `${item.clientId.firstName || ''} ${item.clientId.lastName || ''}`.trim()
    : '';

  return (
    <TouchableOpacity
      style={[styles.item, isSelected && styles.itemSelected]}
      onPress={() => onToggle(item._id)}
    >
      <Checkbox status={isSelected ? 'checked' : 'unchecked'} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemId}>{item.goodsId}</Text>
        <Text style={styles.itemDesc} numberOfLines={1}>
          {item.description || 'Sans description'}
        </Text>
        {clientName && <Text style={styles.itemClient}>{clientName}</Text>}
      </View>
      <View style={styles.itemWeight}>
        <Text style={styles.weightText}>{item.weight} kg</Text>
        <Text style={styles.qtyText}>Qty: {item.quantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  itemSelected: { borderColor: Theme.primary[500], borderWidth: 2 },
  itemInfo: { flex: 1, marginLeft: Theme.spacing.sm },
  itemId: { fontSize: 14, fontWeight: '700', color: Theme.neutral[800] },
  itemDesc: { fontSize: 12, color: Theme.neutral[500], marginTop: 2 },
  itemClient: { fontSize: 12, color: Theme.neutral[400], marginTop: 2 },
  itemWeight: { alignItems: 'flex-end' },
  weightText: { fontSize: 13, fontWeight: '700', color: Theme.primary[600] },
  qtyText: { fontSize: 11, color: Theme.neutral[400], marginTop: 2 },
});
