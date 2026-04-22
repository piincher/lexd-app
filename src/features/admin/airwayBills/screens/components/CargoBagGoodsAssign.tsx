/**
 * CargoBagGoodsAssign - Component for assigning goods to a cargo bag
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Checkbox } from '@src/shared/ui/Checkbox';
import { Button } from '@src/shared/ui/Button';
import { Card } from '@src/shared/ui/Card';
import { EmptyState } from '@src/shared/ui/EmptyState';

interface GoodsItem {
  _id: string;
  goodsId: string;
  description: string;
  weight: number;
  quantity: number;
}

interface CargoBagGoodsAssignProps {
  goods: GoodsItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const CargoBagGoodsAssign: React.FC<CargoBagGoodsAssignProps> = ({
  goods,
  selectedIds,
  onToggle,
  onConfirm,
  loading = false,
}) => {
  const { colors } = useAppTheme();

  const { selectedCount, selectedWeight } = useMemo(() => {
    const selected = goods.filter((g) => selectedIds.includes(g._id));
    return {
      selectedCount: selected.reduce((sum, g) => sum + g.quantity, 0),
      selectedWeight: selected.reduce((sum, g) => sum + g.weight, 0),
    };
  }, [goods, selectedIds]);

  if (goods.length === 0) {
    return (
      <EmptyState
        icon="cube-off-outline"
        title="Aucune marchandise disponible"
        message="Toutes les marchandises de ce AWB sont déjà assignées à des sacs."
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {goods.map((item) => (
          <Card key={item._id} style={styles.goodsCard} padding="medium">
            <View style={styles.goodsRow}>
              <Checkbox
                checked={selectedIds.includes(item._id)}
                onPress={() => onToggle(item._id)}
                disabled={loading}
              />
              <View style={styles.goodsInfo}>
                <Text style={[styles.goodsId, { color: colors.text.primary }]}>{item.goodsId}</Text>
                {item.description ? (
                  <Text style={[styles.goodsDesc, { color: colors.text.secondary }]} numberOfLines={1}>
                    {item.description}
                  </Text>
                ) : null}
                <View style={styles.goodsMeta}>
                  <MaterialCommunityIcons name="weight-kilogram" size={12} color={colors.text.muted} />
                  <Text style={[styles.metaText, { color: colors.text.muted }]}>
                    {item.weight.toFixed(1)} kg · {item.quantity} pc{item.quantity > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.background.card }]}>
        <View style={styles.footerInfo}>
          <MaterialCommunityIcons name="package-variant" size={16} color={colors.primary.main} />
          <Text style={[styles.footerText, { color: colors.text.secondary }]}>
            {selectedCount} article{selectedCount > 1 ? 's' : ''} · {selectedWeight.toFixed(1)} kg
          </Text>
        </View>
        <Button
          title="Assigner"
          onPress={onConfirm}
          variant="primary"
          loading={loading}
          disabled={selectedIds.length === 0 || loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 8 },
  goodsCard: { marginBottom: 8 },
  goodsRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  goodsInfo: { flex: 1 },
  goodsId: { fontSize: 14, fontWeight: '700' },
  goodsDesc: { fontSize: 13, marginTop: 2 },
  goodsMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  metaText: { fontSize: 12, fontWeight: '500' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, gap: 12 },
  footerInfo: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  footerText: { fontSize: 14, fontWeight: '600' },
});

export default CargoBagGoodsAssign;
