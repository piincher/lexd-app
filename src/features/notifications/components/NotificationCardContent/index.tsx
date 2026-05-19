/**
 * NotificationCardContent
 * SRP: Inner pressable content of a notification card
 */

import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatRelativeTime } from '../../utils/timeUtils';
import type { InAppNotification } from '../../types';
import {
  NOTIFICATION_TYPE_CONFIG,
  NOTIFICATION_CATEGORY_CONFIG,
} from '../../types';
import { createStyles } from './NotificationCardContent.styles';

interface NotificationCardContentProps {
  notification: InAppNotification;
  onPress: (notification: InAppNotification) => void;
}

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export const NotificationCardContent: React.FC<NotificationCardContentProps> = ({
  notification,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const catConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;

  const safeIcon = typeConfig?.icon || 'bell';
  const safeLabel = typeConfig?.label || 'Notification';
  const safeDescription = typeConfig?.description || 'Nouvelle notification';
  const safeCatColor = catConfig?.color || colors.status.info;
  const safeCatBgColor = catConfig?.backgroundColor || colors.status.info + '1A';
  const relativeTime = formatRelativeTime(notification.createdAt);
  const isUnread = !notification.isRead;

  return (
    <Pressable
      onPress={() => onPress(notification)}
      style={({ pressed }) => [
        styles.card,
        isUnread && styles.unreadCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.accentBar, { backgroundColor: safeCatColor }]} />
      <View style={styles.cardContent}>
        <View style={[styles.iconCircle, { backgroundColor: safeCatBgColor }]}>
          <MaterialCommunityIcons
            name={safeIcon as MaterialIconName}
            size={22}
            color={safeCatColor}
          />
        </View>
        <View style={styles.textContent}>
          <View style={styles.titleRow}>
            <Text
              style={[styles.title, isUnread && styles.unreadTitle]}
              numberOfLines={1}
            >
              {notification.title || safeLabel}
            </Text>
            {isUnread && (
              <View style={[styles.unreadDot, { backgroundColor: safeCatColor }]} />
            )}
          </View>
          <Text style={styles.message} numberOfLines={2}>
            {notification.message || safeDescription}
          </Text>
          <View style={styles.metaRow}>
            <View style={[styles.typeBadge, { backgroundColor: safeCatBgColor }]}>
              <Text style={[styles.typeLabel, { color: safeCatColor }]}>
                {safeLabel}
              </Text>
            </View>
            <Text style={styles.time}>{relativeTime}</Text>
          </View>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={18} color={colors.border} />
      </View>
    </Pressable>
  );
};
