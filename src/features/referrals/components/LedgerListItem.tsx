import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardLedgerEntry } from '../types';
import { createStyles } from './LedgerListItem.styles';

interface LedgerListItemProps {
  item: RewardLedgerEntry;
}

const TYPE_ICONS: Record<string, { icon: string; colorKey: string }> = {
  EARN: { icon: 'arrow-up-circle', colorKey: 'success' },
  REDEEM: { icon: 'arrow-down-circle', colorKey: 'error' },
  REVERSAL: { icon: 'swap-horizontal', colorKey: 'warning' },
  ADMIN_ADJUSTMENT: { icon: 'cog', colorKey: 'info' },
};

const TYPE_LABELS: Record<string, string> = {
  EARN: 'Points gagnés',
  REDEEM: 'Points utilisés',
  REVERSAL: 'Correction',
  ADMIN_ADJUSTMENT: 'Ajustement',
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const LedgerListItem: React.FC<LedgerListItemProps> = ({ item }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const config = TYPE_ICONS[item.type] || TYPE_ICONS.ADMIN_ADJUSTMENT;
  const color = (colors.status as Record<string, string>)[config.colorKey] || colors.text.secondary;
  const isCredit = item.pointsDelta >= 0;
  const reference = item.source?.reference || item.note || '';

  return (
    <View style={styles.row}>
      <View style={[styles.iconCircle, { backgroundColor: color + '18' }]}>
        <MaterialCommunityIcons name={config.icon as any} size={18} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{TYPE_LABELS[item.type] || item.type}</Text>
        <Text style={styles.meta} numberOfLines={1}>{reference}</Text>
        {item.shipmentQuantity && item.shipmentUnit && (
          <Text style={styles.meta}>{item.shipmentQuantity} {item.shipmentUnit}</Text>
        )}
      </View>
      <View style={styles.right}>
        <Text style={isCredit ? styles.deltaPositive : styles.deltaNegative}>
          {isCredit ? '+' : '-'}{Math.abs(item.pointsDelta)} pts
        </Text>
        <Text style={styles.balance}>Solde: {item.balanceAfter}</Text>
        <Text style={styles.balance}>{formatDate(item.createdAt)}</Text>
      </View>
    </View>
  );
};
