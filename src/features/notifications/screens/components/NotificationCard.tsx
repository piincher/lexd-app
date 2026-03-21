/**
 * NotificationCard
 * SRP: Single notification card with swipe actions
 * Premium design with category-colored accent, read/unread states
 */

import React from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutLeft, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { formatRelativeTime } from '../../utils/timeUtils';
import type { InAppNotification } from '../../types';
import {
  NOTIFICATION_TYPE_CONFIG,
  NOTIFICATION_CATEGORY_CONFIG,
} from '../../types';

const { width } = Dimensions.get('window');

interface NotificationCardProps {
  notification: InAppNotification;
  index: number;
  onPress: (notification: InAppNotification) => void;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  index,
  onPress,
  onMarkAsRead,
  onDelete,
}) => {
  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const catConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;
  const relativeTime = formatRelativeTime(notification.createdAt);
  const isUnread = !notification.isRead;

  const renderLeftActions = () => {
    if (!isUnread) return null;
    return (
      <View style={[styles.swipeAction, styles.leftAction]}>
        <Ionicons name="checkmark-circle" size={26} color="#FFF" />
        <Text style={styles.swipeText}>Lu</Text>
      </View>
    );
  };

  const renderRightActions = () => (
    <View style={[styles.swipeAction, styles.rightAction]}>
      <Ionicons name="trash" size={24} color="#FFF" />
      <Text style={styles.swipeText}>Suppr.</Text>
    </View>
  );

  const handleSwipeOpen = (direction: 'left' | 'right') => {
    if (direction === 'left' && isUnread) onMarkAsRead(notification._id);
    if (direction === 'right') onDelete(notification._id);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index * 40, 200)).springify().damping(18)}
      exiting={FadeOutLeft.duration(200)}
      layout={Layout.springify()}
    >
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableOpen={handleSwipeOpen}
        leftThreshold={width * 0.2}
        rightThreshold={width * 0.2}
        friction={2}
        overshootLeft={false}
        overshootRight={false}
      >
        <Pressable
          onPress={() => onPress(notification)}
          style={({ pressed }) => [
            styles.card,
            isUnread && styles.unreadCard,
            pressed && styles.pressed,
          ]}
        >
          {/* Color accent bar */}
          <View style={[styles.accentBar, { backgroundColor: catConfig.color }]} />

          <View style={styles.cardContent}>
            {/* Icon */}
            <View style={[styles.iconCircle, { backgroundColor: catConfig.backgroundColor }]}>
              <MaterialCommunityIcons
                name={typeConfig.icon as any}
                size={22}
                color={catConfig.color}
              />
            </View>

            {/* Text content */}
            <View style={styles.textContent}>
              <View style={styles.titleRow}>
                <Text
                  style={[styles.title, isUnread && styles.unreadTitle]}
                  numberOfLines={1}
                >
                  {notification.title}
                </Text>
                {isUnread && (
                  <View style={[styles.unreadDot, { backgroundColor: catConfig.color }]} />
                )}
              </View>

              <Text style={styles.message} numberOfLines={2}>
                {notification.message}
              </Text>

              <View style={styles.metaRow}>
                <View style={[styles.typeBadge, { backgroundColor: catConfig.backgroundColor }]}>
                  <Text style={[styles.typeLabel, { color: catConfig.color }]}>
                    {typeConfig.label}
                  </Text>
                </View>
                <Text style={styles.time}>{relativeTime}</Text>
              </View>
            </View>

            {/* Chevron */}
            <Ionicons name="chevron-forward" size={18} color={Theme.neutral[300]} />
          </View>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    ...Theme.shadows.sm,
  },
  unreadCard: {
    backgroundColor: '#FAFBFF',
    borderWidth: 1,
    borderColor: Theme.primary[100],
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  accentBar: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.medium,
    fontWeight: '500',
    color: Theme.neutral[700],
  },
  unreadTitle: {
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[900],
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  message: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Theme.neutral[500],
    lineHeight: 18,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeLabel: {
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
  },
  swipeAction: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  leftAction: {
    backgroundColor: '#10B981',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    marginLeft: 16,
  },
  rightAction: {
    backgroundColor: '#EF4444',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    marginRight: 16,
  },
  swipeText: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    fontWeight: '500',
    color: '#FFF',
    marginTop: 3,
  },
});
