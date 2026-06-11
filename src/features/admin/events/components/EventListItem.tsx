import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatDate } from '@src/shared/lib/formatters';
import { AdminEvent, EventStatus } from '../api/types';

interface EventListItemProps {
  event: AdminEvent;
  onPress: (id: string) => void;
}

const STATUS_LABELS: Record<EventStatus, string> = {
  draft: 'Brouillon',
  scheduled: 'Programmé',
  live: 'En cours',
  ended: 'Terminé',
  archived: 'Archivé',
};

const statusColor = (status: EventStatus, colors: any): string => {
  switch (status) {
    case 'live': return colors.status.success;
    case 'scheduled': return colors.status.info;
    case 'ended': return colors.text.secondary;
    case 'archived': return colors.text.disabled;
    default: return colors.status.warning;
  }
};

export const EventListItem: React.FC<EventListItemProps> = ({ event, onPress }) => {
  const { colors } = useAppTheme();
  const color = statusColor(event.status, colors);

  return (
    <Pressable
      onPress={() => onPress(event._id)}
      style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.name, { color: colors.text.primary }]} numberOfLines={1}>
          {event.theme?.icon ? `${event.theme.icon} ` : ''}{event.name}
        </Text>
        <View style={[styles.badge, { backgroundColor: `${color}22` }]}>
          <Text style={[styles.badgeText, { color }]}>{STATUS_LABELS[event.status]}</Text>
        </View>
      </View>
      <Text style={[styles.meta, { color: colors.text.secondary }]}>
        {formatDate(event.liveStart)} → {formatDate(event.liveEnd)}
      </Text>
      <Text style={[styles.meta, { color: colors.text.secondary }]}>
        {event.shippingRules.length} ligne(s) · {event.campaignSteps.length} notif. · {event.regions.join(', ') || 'Toutes régions'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  name: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  meta: { fontSize: 12, marginTop: 2 },
});
