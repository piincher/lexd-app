/**
 * AirwayBillGoodsSection — the "Marchandises" tab of the AWB detail screen.
 *
 * Goods are split into "Non assigné à un sac" (actionable — these still need to
 * be packed into a bag) and per-bag groups, so the AWB → Sac → Marchandise
 * relationship is obvious at a glance instead of one flat undifferentiated list.
 */
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Button } from '@src/shared/ui/Button';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { AirwayBillGoods, CargoBag } from '../../types';

interface Props {
  goodsList: AirwayBillGoods[];
  cargoBags: CargoBag[];
  onAssignPress: () => void;
}

const goodsKey = (goods: AirwayBillGoods | string) =>
  typeof goods === 'string' ? goods : goods._id;

const clientName = (goods: AirwayBillGoods): string | null => {
  const c = goods.clientId;
  if (!c || typeof c === 'string') return null;
  return [c.firstName, c.lastName].filter(Boolean).join(' ').trim() || null;
};

const GoodsRow: React.FC<{ goods: AirwayBillGoods }> = ({ goods }) => {
  const { colors } = useAppTheme();
  const name = clientName(goods);
  return (
    <View style={[styles.row, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <MaterialCommunityIcons name="cube-outline" size={20} color={colors.primary.main} />
      <View style={styles.rowBody}>
        <Text style={[styles.rowTitle, { color: colors.text.primary }]} numberOfLines={1}>
          {goods.goodsId}
        </Text>
        {!!goods.description && (
          <Text style={[styles.rowDesc, { color: colors.text.secondary }]} numberOfLines={1}>
            {goods.description}
          </Text>
        )}
        <Text style={[styles.rowMeta, { color: colors.text.muted }]} numberOfLines={1}>
          {(goods.quantity ?? 0)} colis · {(goods.weight ?? 0).toFixed?.(1) ?? goods.weight ?? 0} kg
          {name ? ` · ${name}` : ''}
        </Text>
      </View>
    </View>
  );
};

export const AirwayBillGoodsSection: React.FC<Props> = ({ goodsList, cargoBags, onAssignPress }) => {
  const { colors } = useAppTheme();

  // Build bagId -> bag and goodsId -> bag maps from the bags' goods arrays.
  const { groups, unassigned } = useMemo(() => {
    const goodsToBag = new Map<string, CargoBag>();
    for (const bag of cargoBags) {
      for (const g of bag.goodsIds || []) {
        const id = goodsKey(g);
        if (id) goodsToBag.set(id, bag);
      }
    }

    const byBag = new Map<string, { bag: CargoBag; items: AirwayBillGoods[] }>();
    const loose: AirwayBillGoods[] = [];

    for (const goods of goodsList) {
      const bag = goodsToBag.get(goods._id);
      if (bag) {
        if (!byBag.has(bag._id)) byBag.set(bag._id, { bag, items: [] });
        byBag.get(bag._id)!.items.push(goods);
      } else {
        loose.push(goods);
      }
    }

    return { groups: Array.from(byBag.values()), unassigned: loose };
  }, [goodsList, cargoBags]);

  if (goodsList.length === 0) {
    return (
      <EmptyState
        icon="cube-outline"
        title="Aucune marchandise assignée"
        message="Assignez des marchandises à ce AWB, puis regroupez-les dans des sacs."
        actionLabel="Assigner des marchandises"
        onAction={onAssignPress}
      />
    );
  }

  return (
    <View style={styles.container}>
      {unassigned.length > 0 && (
        <View style={styles.group}>
          <View style={styles.groupHeader}>
            <View style={[styles.groupDot, { backgroundColor: colors.status.warning }]} />
            <Text style={[styles.groupTitle, { color: colors.text.primary }]}>
              Non assigné à un sac ({unassigned.length})
            </Text>
          </View>
          <Text style={[styles.groupHint, { color: colors.text.secondary }]}>
            Ces marchandises doivent encore être placées dans un sac de cargo.
          </Text>
          {unassigned.map((g) => (
            <GoodsRow key={g._id} goods={g} />
          ))}
        </View>
      )}

      {groups.map(({ bag, items }) => (
        <View key={bag._id} style={styles.group}>
          <View style={styles.groupHeader}>
            <MaterialCommunityIcons name="bag-personal-outline" size={16} color={colors.primary.main} />
            <Text style={[styles.groupTitle, { color: colors.text.primary }]}>
              {bag.bagNumber} ({items.length})
            </Text>
          </View>
          {items.map((g) => (
            <GoodsRow key={g._id} goods={g} />
          ))}
        </View>
      ))}

      <Button title="+ Assigner plus de marchandises" onPress={onAssignPress} variant="outline" fullWidth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 18 },
  group: { gap: 8 },
  groupHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  groupDot: { width: 9, height: 9, borderRadius: 5 },
  groupTitle: { fontSize: 14, fontWeight: '800' },
  groupHint: { fontSize: 12, lineHeight: 16, marginBottom: 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    padding: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  rowBody: { flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: '700' },
  rowDesc: { fontSize: 13, marginTop: 1 },
  rowMeta: { fontSize: 12, marginTop: 3, fontWeight: '500' },
});

export default AirwayBillGoodsSection;
