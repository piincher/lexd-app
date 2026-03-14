import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { InAppNotification } from '../../types';
import { formatRelativeTime } from '../../utils/timeUtils';

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
  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        style={[styles.actionButton, styles.dismissButton]}
        onPress={() => onDismiss(notification._id)}
      >
        <Ionicons name="archive-outline" size={24} color={Theme.neutral.white} />
        <Text style={styles.actionText}>Archiver</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => onDelete(notification._id)}
      >
        <Ionicons name="trash-outline" size={24} color={Theme.neutral.white} />
        <Text style={styles.actionText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  const getIconName = () => {
    switch (notification.type) {
      case 'order':
        return 'cube-outline';
      case 'payment':
        return 'card-outline';
      case 'system':
        return 'information-circle-outline';
      default:
        return 'notifications-outline';
    }
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={[styles.container, !notification.isRead && styles.unread]}
        onPress={() => onPress(notification)}
      >
        <View style={[styles.iconContainer, !notification.isRead && styles.unreadIcon]}>
          <Ionicons
            name={getIconName()}
            size={24}
            color={!notification.isRead ? Theme.colors.primary.main : Theme.neutral.grey500}
          />
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, !notification.isRead && styles.unreadText]}>
            {notification.title}
          </Text>
          <Text style={styles.message} numberOfLines={2}>
            {notification.message}
          </Text>
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
    backgroundColor: Theme.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral.grey200,
  },
  unread: {
    backgroundColor: Theme.colors.primary.light + '20',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.neutral.grey100,
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
    color: Theme.neutral.grey800,
    marginBottom: Theme.spacing.xs,
  },
  unreadText: {
    fontWeight: '700',
    color: Theme.neutral.grey900,
  },
  message: {
    fontSize: 14,
    color: Theme.neutral.grey600,
    marginBottom: Theme.spacing.xs,
  },
  time: {
    fontSize: 12,
    color: Theme.neutral.grey400,
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
