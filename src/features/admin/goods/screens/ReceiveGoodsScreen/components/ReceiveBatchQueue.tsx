import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatCurrency } from '@src/shared/lib/currency';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ReceiveSessionItem } from '../hooks/useReceiveAssistSession';

interface ReceiveBatchQueueProps {
  items: ReceiveSessionItem[];
  onRemove: (id: string) => void;
  onOpenLabel: () => void;
}

export const ReceiveBatchQueue: React.FC<ReceiveBatchQueueProps> = ({ items, onRemove, onOpenLabel }) => {
  const { colors } = useAppTheme();
  if (items.length === 0) return null;

  return (
    <View style={[styles.panel, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Dernières réceptions</Text>
        <Pressable onPress={onOpenLabel} style={styles.labelButton}>
          <MaterialCommunityIcons name="qrcode" size={16} color={colors.primary.main} />
          <Text style={[styles.labelButtonText, { color: colors.primary.main }]}>Étiquette</Text>
        </Pressable>
      </View>
      {items.slice(0, 4).map((item) => (
        <View key={item.id} style={[styles.item, { borderColor: colors.border }]}>
          <View style={styles.itemMain}>
            <Text style={[styles.itemTitle, { color: colors.text.primary }]} numberOfLines={1}>
              {item.goodsId} · {item.clientName}
            </Text>
            <Text style={[styles.itemMeta, { color: colors.text.secondary }]} numberOfLines={1}>
              {item.weight} kg · {item.cbm.toFixed(3)} CBM · {formatCurrency(item.totalCost)}
            </Text>
          </View>
          {item.isException ? (
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color={colors.status.warning} />
          ) : null}
          <Pressable onPress={() => onRemove(item.id)} hitSlop={8}>
            <MaterialCommunityIcons name="close" size={18} color={colors.text.disabled} />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  panel: { marginHorizontal: 16, marginTop: 8, padding: 12, borderRadius: 8, borderWidth: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 14, fontWeight: '800' },
  labelButton: { minHeight: 36, flexDirection: 'row', alignItems: 'center', gap: 4 },
  labelButtonText: { fontSize: 12, fontWeight: '800' },
  item: { minHeight: 54, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemMain: { flex: 1, minWidth: 0 },
  itemTitle: { fontSize: 13, fontWeight: '800' },
  itemMeta: { fontSize: 11, marginTop: 2 },
});
