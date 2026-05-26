import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { NotificationEventLog, NotificationEventStatus } from '../types';
import {
  formatNotificationEventDate,
  getNotificationEventUserLabel,
} from '../utils/formatNotificationEvent';
import { createStyles } from './NotificationEventCard.styles';

interface NotificationEventCardProps {
  item: NotificationEventLog;
  onPress: (item: NotificationEventLog) => void;
}

const getStatusColor = (status: NotificationEventStatus, colors: any): string => {
  switch (status) {
    case 'PENDING': return colors.status.info;
    case 'SENT': return colors.status.success;
    case 'DELIVERED': return colors.status.success;
    case 'READ': return colors.status.info;
    case 'FAILED': return colors.status.error;
    case 'SKIPPED': return colors.text.disabled;
    case 'PARTIAL': return colors.status.warning;
    default: return colors.text.secondary;
  }
};

export const NotificationEventCard = memo(({ item, onPress }: NotificationEventCardProps) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Voir l'événement ${item.title}`}
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.78 }]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(item.status, colors) }]}>
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
