import React, { memo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { Goods } from '../../../goods/types';
import type { ContainerClientGroup } from '../hooks/containerAssistTypes';

interface ContainerClientGroupItemProps {
  group: ContainerClientGroup;
  index: number;
  onRemoveGoods: (goodsId: string) => void;
  onMarkDelivered: (goodsId: string) => void;
}

const money = (value: number) => `${Math.round(value).toLocaleString()} FCFA`;

const GoodsRow = memo(({
  goods,
  onRemoveGoods,
  onMarkDelivered,
}: {
  goods: Goods;
  onRemoveGoods: (goodsId: string) => void;
  onMarkDelivered: (goodsId: string) => void;
}) => {
  const { colors } = useAppTheme();
  const hasIssue = goods.paymentStatus !== 'PAID' || goods.condition === 'damaged' || !!goods.intakeException?.isException;

  return (
    <View style={[styles.goodsRow, { borderTopColor: colors.border }]}>
      <View style={styles.goodsMain}>
        <View style={styles.goodsIdRow}>
          <Text style={[styles.goodsId, { color: colors.text.primary }]}>{goods.goodsId}</Text>
          {hasIssue ? <Ionicons name="warning-outline" size={14} color={colors.status.warning} /> : null}
        </View>
        <Text style={[styles.goodsDescription, { color: colors.text.secondary }]} numberOfLines={1}>
          {goods.description || 'Sans description'}
        </Text>
        <Text style={[styles.goodsMeta, { color: colors.text.disabled }]} numberOfLines={1}>
          {(goods.actualCBM || 0).toFixed(2)} m³ · {goods.weight || 0} kg · {goods.warehouseLocation || 'Sans emplacement'}
        </Text>
      </View>
      <View style={styles.goodsActions}>
        {goods.status === 'READY_FOR_PICKUP' ? (
          <Pressable onPress={() => onMarkDelivered(goods._id)} style={styles.iconButton}>
            <Ionicons name="checkmark-done" size={20} color={colors.status.success} />
          </Pressable>
        ) : null}
        <Pressable onPress={() => onRemoveGoods(goods._id)} style={styles.iconButton}>
          <Ionicons name="close-circle" size={22} color={colors.status.error} />
        </Pressable>
      </View>
    </View>
  );
});

GoodsRow.displayName = 'GoodsRow';

export const ContainerClientGroupItem: React.FC<ContainerClientGroupItemProps> = ({
  group,
  index,
  onRemoveGoods,
  onMarkDelivered,
}) => {
  const { colors } = useAppTheme();
  const [expanded, setExpanded] = useState(index < 2);

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <Pressable onPress={() => setExpanded((value) => !value)} style={styles.header}>
        <View style={styles.clientIcon}>
          <Ionicons name="person-outline" size={20} color={colors.primary[600]} />
        </View>
        <View style={styles.clientInfo}>
          <Text style={[styles.clientName, { color: colors.text.primary }]} numberOfLines={1}>
            {group.clientName}
          </Text>
          <Text style={[styles.clientPhone, { color: colors.text.secondary }]} numberOfLines={1}>
            {group.clientPhone || 'Téléphone manquant'}
          </Text>
        </View>
        {group.issueCount > 0 ? (
          <View style={[styles.issueBadge, { backgroundColor: colors.feedback.warningBg }]}>
            <Text style={[styles.issueText, { color: colors.feedback.warningDark }]}>{group.issueCount}</Text>
          </View>
        ) : null}
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.text.secondary} />
      </Pressable>

      <View style={styles.summary}>
        <Text style={[styles.summaryText, { color: colors.text.secondary }]}>{group.summary.totalItems} colis</Text>
        <Text style={[styles.summaryText, { color: colors.text.secondary }]}>{group.summary.totalCBM.toFixed(2)} m³</Text>
        <Text style={[styles.summaryText, { color: colors.text.secondary }]}>{group.summary.totalWeight.toFixed(0)} kg</Text>
        <Text style={[styles.balanceText, { color: group.summary.balanceDue > 0 ? colors.status.error : colors.status.success }]}>
          {money(group.summary.balanceDue)}
        </Text>
      </View>

      {expanded ? group.goods.map((goods) => (
        <GoodsRow key={goods._id} goods={goods} onRemoveGoods={onRemoveGoods} onMarkDelivered={onMarkDelivered} />
      )) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginBottom: 10, borderRadius: 8, borderWidth: 1, overflow: 'hidden' },
  header: { minHeight: 58, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  clientIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  clientInfo: { flex: 1 },
  clientName: { fontSize: 14, fontWeight: '800' },
  clientPhone: { marginTop: 2, fontSize: 12, fontWeight: '600' },
  issueBadge: { minWidth: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  issueText: { fontSize: 12, fontWeight: '900' },
  summary: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 12, paddingBottom: 10 },
  summaryText: { fontSize: 12, fontWeight: '700' },
  balanceText: { fontSize: 12, fontWeight: '900' },
  goodsRow: { minHeight: 64, borderTopWidth: 1, paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' },
  goodsMain: { flex: 1 },
  goodsIdRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  goodsId: { fontSize: 13, fontWeight: '900' },
  goodsDescription: { marginTop: 2, fontSize: 12, fontWeight: '600' },
  goodsMeta: { marginTop: 2, fontSize: 11, fontWeight: '600' },
  goodsActions: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});

export default ContainerClientGroupItem;
