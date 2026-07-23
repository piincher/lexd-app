import React, { memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatCurrency } from '@src/shared/lib/currency';
import type { AdminWorkQueueItem, WorkQueueKind } from '../../types';
import { createStyles } from './WorkQueueItem.styles';

interface WorkQueueItemProps {
  item: AdminWorkQueueItem;
  onPress: (goodsId: string) => void;
}

const kindConfig: Record<WorkQueueKind, { label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }> = {
  owner: { label: 'Client', icon: 'account-alert-outline' },
  intake: { label: 'Réception', icon: 'package-variant-closed' },
  assignment: { label: 'Logistique', icon: 'truck-fast-outline' },
  payment: { label: 'Paiement', icon: 'cash-clock' },
};

export const WorkQueueItem: React.FC<WorkQueueItemProps> = memo(({ item, onPress }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const config = kindConfig[item.kind];
  const accent = item.severity === 'critical' ? colors.status.error
    : item.severity === 'warning' ? colors.status.warning : colors.status.info;
  const ageLabel = item.ageDays === 0 ? "Aujourd'hui" : `${item.ageDays} j`;

  return (
    <Pressable
      onPress={() => onPress(item.goodsId)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      android_ripple={{ color: colors.primary.main + '18' }}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, ${item.goodsId}, ${ageLabel}`}
      accessibilityHint="Ouvre la fiche de la marchandise"
    >
      <View style={[styles.severityBar, { backgroundColor: accent }]} />
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={config.icon} size={22} color={accent} />
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.goodsId} selectable>{item.goodsId}</Text>
          <View style={styles.ageChip}>
            <Text style={[styles.ageText, { color: accent }]}>{ageLabel}</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.kind}>{config.label}</Text>
          {item.clientName ? <Text style={styles.client} numberOfLines={1}>· {item.clientName}</Text> : null}
          {item.amountDue !== undefined ? (
            <Text style={styles.amount}>{formatCurrency(item.amountDue)}</Text>
          ) : null}
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color={colors.text.disabled} />
    </Pressable>
  );
});

WorkQueueItem.displayName = 'WorkQueueItem';
