import React from 'react';
import { View, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatRelativeTime } from '../../utils/timeUtils';
import type { InAppNotification } from '../../types';
import { NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG } from '../../types';
import { styles } from './NotificationDropdown.styles';

interface NotificationDropdownItemProps {
  notification: InAppNotification;
  onPress: () => void;
  isLast: boolean;
}

export const NotificationDropdownItem: React.FC<NotificationDropdownItemProps> = ({
  notification,
  onPress,
  isLast,
}) => {
  const { colors } = useAppTheme();
  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;
  const relativeTime = formatRelativeTime(notification.createdAt);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: colors.background.card },
        pressed && { backgroundColor: colors.background.paper },
        !notification.isRead && { backgroundColor: colors.background.elevated },
        isLast && styles.lastItem,
      ]}
    >
      <View style={[styles.itemIcon, { backgroundColor: categoryConfig.backgroundColor }]}>
        <MaterialCommunityIcons name={typeConfig.icon as any} size={20} color={categoryConfig.color} />
      </View>

      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, { color: colors.text.primary }, !notification.isRead && styles.unreadText]} numberOfLines={1}>
          {notification.title}
        </Text>
        <Text style={[styles.itemMessage, { color: colors.text.secondary }]} numberOfLines={2}>
          {notification.message}
        </Text>
        <Text style={[styles.itemTime, { color: colors.text.disabled }]}>{relativeTime}</Text>
      </View>

      {!notification.isRead && <View style={[styles.unreadIndicator, { backgroundColor: categoryConfig.color }]} />}
    </Pressable>
  );
};
