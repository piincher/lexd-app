import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { NotificationEventLog, NotificationEventStatus } from '../types';
import {
  formatNotificationEventDate,
  getNotificationEventUserLabel,
} from '../utils/formatNotificationEvent';
import { createNotificationEventCardStyles } from './NotificationEventCard.styles';

interface NotificationEventCardProps {
  item: NotificationEventLog;
  onPress: (item: NotificationEventLog) => void;
}

const STATUS_COLORS: Record<NotificationEventStatus, string> = {
  PENDING: '#64748B',
  SENT: '#16A34A',
  DELIVERED: '#059669',
  READ: '#2563EB',
  FAILED: '#DC2626',
  SKIPPED: '#6B7280',
  PARTIAL: '#D97706',
};

export const NotificationEventCard = memo(({ item, onPress }: NotificationEventCardProps) => {
  const { colors } = useAppTheme();
  const styles = createNotificationEventCardStyles(colors);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Voir l'événement ${item.title}`}
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.78 }]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status] || colors.text.secondary }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
      <View style={styles.channelRow}>
        <View style={styles.channel}><Text style={styles.channelText}>Push: {item.pushStatus || '-'}</Text></View>
        <View style={styles.channel}><Text style={styles.channelText}>In-app: {item.inAppStatus || '-'}</Text></View>
        <View style={styles.channel}><Text style={styles.channelText}>WhatsApp: {item.whatsappStatus || '-'}</Text></View>
      </View>
      <Text style={styles.meta} numberOfLines={1}>
        {getNotificationEventUserLabel(item)} · {formatNotificationEventDate(item.createdAt)}
      </Text>
    </Pressable>
  );
});

NotificationEventCard.displayName = 'NotificationEventCard';
