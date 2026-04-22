/**
 * NotificationDropdown Component
 * Dropdown menu showing recent notifications (Facebook/LinkedIn style)
 */

import React from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import Animated, { 
  FadeIn, 
  FadeOut,
  SlideInDown,
  SlideOutUp,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatRelativeTime } from '../utils/timeUtils';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { InAppNotification } from '../types';
import { NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG } from '../types';
import { useGetNotifications, useMarkAsRead } from '../hooks/useNotifications';

const { height, width } = Dimensions.get('window');

interface NotificationDropdownProps {
  visible: boolean;
  onClose: () => void;
  onSeeAll: () => void;
  onNotificationPress: (notification: InAppNotification) => void;
  anchorPosition?: { x: number; y: number };
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  visible,
  onClose,
  onSeeAll,
  onNotificationPress,
}) => {
  const { colors } = useAppTheme();
  const { data, isLoading, refetch } = useGetNotifications({ limit: 5 });
  const { mutate: markAsRead } = useMarkAsRead();
  
  const notifications = data?.data || [];

  // Handle notification press
  const handleNotificationPress = (notification: InAppNotification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    onNotificationPress(notification);
    onClose();
  };

  // Mark all as read
  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.isRead) markAsRead(n._id);
    });
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
          
          <TouchableWithoutFeedback>
            <Animated.View 
              style={styles.container}
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutUp.duration(200)}
            >
              <Surface style={[styles.surface, { backgroundColor: colors.background.card }]} elevation={4}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={[styles.title, { color: colors.text.primary }]}>Notifications</Text>
                  
                  <View style={styles.headerActions}>
                    <Pressable 
                      onPress={handleMarkAllRead}
                      style={styles.actionButton}
                    >
                      <MaterialCommunityIcons 
                        name="check-all" 
                        size={20} 
                        color={colors.primary.main} 
                      />
                    </Pressable>
                    
                    <Pressable onPress={onClose} style={styles.actionButton}>
                      <MaterialCommunityIcons 
                        name="close" 
                        size={20} 
                        color={colors.text.secondary} 
                      />
                    </Pressable>
                  </View>
                </View>

                <Divider />

                {/* Content */}
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <NotificationSkeleton count={4} />
                  </View>
                ) : notifications.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons 
                      name="bell-off-outline" 
                      size={40} 
                      color={colors.text.disabled} 
                    />
                    <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Aucune notification</Text>
                  </View>
                ) : (
                  <ScrollView 
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                  >
                    {notifications.map((notification, index) => (
                      <NotificationDropdownItem
                        key={notification._id}
                        notification={notification}
                        onPress={() => handleNotificationPress(notification)}
                        isLast={index === notifications.length - 1}
                      />
                    ))}
                  </ScrollView>
                )}

                {/* Footer */}
                <Divider />
                <Pressable 
                  onPress={() => {
                    onSeeAll();
                    onClose();
                  }}
                  style={styles.footer}
                >
                  <Text style={[styles.seeAllText, { color: colors.primary.main }]}>Voir tout</Text>
                  <MaterialCommunityIcons 
                    name="arrow-right" 
                    size={16} 
                    color={colors.primary.main} 
                  />
                </Pressable>
              </Surface>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Dropdown Item Component
interface NotificationDropdownItemProps {
  notification: InAppNotification;
  onPress: () => void;
  isLast: boolean;
}

const NotificationDropdownItem: React.FC<NotificationDropdownItemProps> = ({
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
        isLast && styles.lastItem
      ]}
    >
      {/* Icon */}
      <View style={[styles.itemIcon, { backgroundColor: categoryConfig.backgroundColor }]}>
        <MaterialCommunityIcons 
          name={typeConfig.icon as any} 
          size={20} 
          color={categoryConfig.color} 
        />
      </View>

      {/* Content */}
      <View style={styles.itemContent}>
        <Text 
          style={[
            styles.itemTitle,
            { color: colors.text.primary },
            !notification.isRead && styles.unreadText
          ]}
          numberOfLines={1}
        >
          {notification.title}
        </Text>
        <Text style={[styles.itemMessage, { color: colors.text.secondary }]} numberOfLines={2}>
          {notification.message}
        </Text>
        <Text style={[styles.itemTime, { color: colors.text.disabled }]}>{relativeTime}</Text>
      </View>

      {/* Unread Indicator */}
      {!notification.isRead && (
        <View style={[styles.unreadIndicator, { backgroundColor: categoryConfig.color }]} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 8,
  },
  container: {
    width: width * 0.9,
    maxWidth: 400,
    maxHeight: height * 0.6,
    marginRight: 8,
  },
  surface: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    marginTop: 12,
  },
  list: {
    maxHeight: height * 0.4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
  unreadText: {
    fontFamily: Fonts.bold,
  },
  itemMessage: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  itemTime: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 4,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 4,
  },
  seeAllText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
});

export default NotificationDropdown;
