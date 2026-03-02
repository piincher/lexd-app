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
import { Text, Surface, Divider, ActivityIndicator } from 'react-native-paper';
import Animated, { 
  FadeIn, 
  FadeOut,
  SlideInDown,
  SlideOutUp,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatRelativeTime } from '../utils/timeUtils';

import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import type { InAppNotification } from '../types';
import { 
  NOTIFICATION_TYPE_CONFIG, 
  NOTIFICATION_CATEGORY_CONFIG 
} from '../types';
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
              <Surface style={styles.surface} elevation={4}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>Notifications</Text>
                  
                  <View style={styles.headerActions}>
                    <Pressable 
                      onPress={handleMarkAllRead}
                      style={styles.actionButton}
                    >
                      <MaterialCommunityIcons 
                        name="check-all" 
                        size={20} 
                        color={COLORS.blue} 
                      />
                    </Pressable>
                    
                    <Pressable onPress={onClose} style={styles.actionButton}>
                      <MaterialCommunityIcons 
                        name="close" 
                        size={20} 
                        color={COLORS.DimGray} 
                      />
                    </Pressable>
                  </View>
                </View>

                <Divider />

                {/* Content */}
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color={COLORS.blue} />
                  </View>
                ) : notifications.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons 
                      name="bell-off-outline" 
                      size={40} 
                      color={COLORS.grey} 
                    />
                    <Text style={styles.emptyText}>Aucune notification</Text>
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
                  <Text style={styles.seeAllText}>Voir tout</Text>
                  <MaterialCommunityIcons 
                    name="arrow-right" 
                    size={16} 
                    color={COLORS.blue} 
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
  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;

  const relativeTime = formatRelativeTime(notification.createdAt);

  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
        !notification.isRead && styles.unreadItem,
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
            !notification.isRead && styles.unreadText
          ]}
          numberOfLines={1}
        >
          {notification.title}
        </Text>
        <Text style={styles.itemMessage} numberOfLines={2}>
          {notification.message}
        </Text>
        <Text style={styles.itemTime}>{relativeTime}</Text>
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
    backgroundColor: COLORS.white,
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
    color: COLORS.DarkGrey,
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
    color: COLORS.grey,
    marginTop: 12,
  },
  list: {
    maxHeight: height * 0.4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.white,
  },
  itemPressed: {
    backgroundColor: COLORS.lightergray,
  },
  unreadItem: {
    backgroundColor: COLORS.FeatherWhite,
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
    color: COLORS.DarkGrey,
  },
  unreadText: {
    fontFamily: Fonts.bold,
  },
  itemMessage: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    marginTop: 2,
    lineHeight: 18,
  },
  itemTime: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: COLORS.grey,
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
    color: COLORS.blue,
  },
});

export default NotificationDropdown;
