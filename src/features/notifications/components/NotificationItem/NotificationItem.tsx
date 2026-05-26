import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
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
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

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
        <MaterialCommunityIcons name="archive-outline" size={24} color={colors.text.inverse} />
        <Text style={styles.actionText}>Archiver</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => onDelete(notification._id)}
      >
        <MaterialCommunityIcons name="trash-outline" size={24} color={colors.text.inverse} />
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

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    unread: {
      backgroundColor: colors.primary.light + '20',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    unreadIcon: {
      backgroundColor: colors.primary.light + '30',
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text.primary,
      marginBottom: 4,
    },
    unreadText: {
      fontWeight: '700',
      color: colors.text.primary,
    },
    message: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    time: {
      fontSize: 12,
      color: colors.text.disabled,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary.main,
      alignSelf: 'center',
      marginLeft: 8,
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
      backgroundColor: colors.status.info,
    },
    deleteButton: {
      backgroundColor: colors.status.error,
    },
    actionText: {
      color: colors.text.inverse,
      fontSize: 12,
      marginTop: 4,
    },
  });
