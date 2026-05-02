/**
 * NotificationItem Component
 * Displays a single notification in the list with swipe actions
 */

import React, { useMemo } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeInRight, FadeOutLeft, Layout } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatRelativeTime } from '../utils/timeUtils';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { InAppNotification } from '../types';
import { NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG } from '../types';
import { NotificationSwipeActions } from './NotificationSwipeActions';
import { createNotificationItemStyles } from './NotificationItem.styles';

const { width } = Dimensions.get('window');

export interface NotificationItemProps {
  notification: InAppNotification;
  onPress: (notification: InAppNotification) => void;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  index?: number;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
  onMarkAsRead,
  onDelete,
  index = 0,
}) => {
  const { colors } = useAppTheme();
  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;
  const styles = useMemo(() => createNotificationItemStyles(colors), [colors]);
  const relativeTime = formatRelativeTime(notification.createdAt);

  const handleSwipeableOpen = (direction: 'left' | 'right') => {
    if (direction === 'left' && !notification.isRead) {
      onMarkAsRead(notification._id);
    } else if (direction === 'right') {
      onDelete(notification._id);
    }
  };

  const swipeStyles = {
    swipeAction: styles.swipeAction,
    leftAction: styles.leftAction,
    rightAction: styles.rightAction,
    swipeActionText: styles.swipeActionText,
  };

  return (
    <Animated.View entering={FadeInRight.delay(index * 50).springify()} exiting={FadeOutLeft} layout={Layout.springify()}>
      <Swipeable
        renderLeftActions={() => (
          <NotificationSwipeActions side="left" isRead={notification.isRead} styles={swipeStyles} colors={colors} />
        )}
        renderRightActions={() => (
          <NotificationSwipeActions side="right" isRead={notification.isRead} styles={swipeStyles} colors={colors} />
        )}
        onSwipeableOpen={handleSwipeableOpen}
        leftThreshold={width * 0.25}
        rightThreshold={width * 0.25}
        friction={2}
        overshootLeft={false}
        overshootRight={false}
      >
        <Pressable
          onPress={() => onPress(notification)}
          style={({ pressed }) => [styles.container, pressed && styles.pressed, !notification.isRead && styles.unreadContainer]}
          android_ripple={{ color: colors.neutral[200] }}
        >
          <Surface style={styles.surface} elevation={0}>
            <View style={[styles.iconContainer, { backgroundColor: categoryConfig.backgroundColor }]}>
              <MaterialCommunityIcons
                name={typeConfig.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
                size={24}
                color={categoryConfig.color}
              />
            </View>

            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={[styles.title, !notification.isRead && styles.unreadTitle]} numberOfLines={1}>
                  {notification.title}
                </Text>
                {!notification.isRead && <View style={[styles.unreadDot, { backgroundColor: categoryConfig.color }]} />}
              </View>

              <Text style={styles.message} numberOfLines={2}>
                {notification.message}
              </Text>

              <View style={styles.footer}>
                <View style={styles.typeBadge}>
                  <Text style={[styles.typeText, { color: categoryConfig.color }]}>{typeConfig.label}</Text>
                </View>
                <Text style={styles.time}>{relativeTime}</Text>
              </View>
            </View>

            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.secondary} style={styles.chevron} />
          </Surface>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
};

export default NotificationItem;
