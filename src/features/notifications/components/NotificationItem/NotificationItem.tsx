import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { InAppNotification, NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG } from '../../types';
import { formatRelativeTime } from '../../utils/timeUtils';
import { NotificationTrackingPreview } from './NotificationTrackingPreview';

interface NotificationItemProps {
  notification: InAppNotification;
  onPress: (notification: InAppNotification) => void;
  onDismiss: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
  onDismiss,
  onDelete,
}) => {
  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const catConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;
  const safeIcon = typeConfig?.icon || 'bell';
  const safeLabel = typeConfig?.label || 'Notification';
  const safeDescription = typeConfig?.description || 'Nouvelle notification';

  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        style={[styles.actionButton, styles.dismissButton]}
        onPress={() => onDismiss(notification._id)}
      >
        <MaterialCommunityIcons name="archive-outline" size={24} color={Theme.neutral.white} />
        <Text style={styles.actionText}>Archiver</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => onDelete(notification._id)}
      >
        <MaterialCommunityIcons name="trash-outline" size={24} color={Theme.neutral.white} />
        <Text style={styles.actionText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={[styles.container, !notification.isRead && styles.unread]}
        onPress={() => onPress(notification)}
      >
        <View style={[styles.iconContainer, !notification.isRead && styles.unreadIcon, { backgroundColor: catConfig.backgroundColor }]}>
          <MaterialCommunityIcons name={safeIcon as any} size={24} color={catConfig.color} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, !notification.isRead && styles.unreadText]}>
            {notification.title || safeLabel}
          </Text>
          <Text style={styles.message} numberOfLines={2}>
            {notification.message || safeDescription}
          </Text>
          <NotificationTrackingPreview data={notification.data} />
          <Text style={styles.time}>{formatRelativeTime(notification.createdAt)}</Text>
        </View>
        {!notification.isRead && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  unread: {
    backgroundColor: Theme.colors.primary.light + '20',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  unreadIcon: {
    backgroundColor: Theme.colors.primary.light + '30',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  unreadText: {
    fontWeight: '700',
    color: Theme.neutral[900],
  },
  message: {
    fontSize: 14,
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.xs,
  },
  time: {
    fontSize: 12,
    color: Theme.neutral[400],
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.primary.main,
    alignSelf: 'center',
    marginLeft: Theme.spacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissButton: {
    backgroundColor: Theme.colors.info.main,
  },
  deleteButton: {
    backgroundColor: Theme.colors.error.main,
  },
  actionText: {
    color: Theme.neutral.white,
    fontSize: 12,
    marginTop: Theme.spacing.xs,
  },
});
