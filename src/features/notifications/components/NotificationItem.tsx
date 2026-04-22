/**
 * NotificationItem Component
 * Displays a single notification in the list with swipe actions
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Text, Surface, Avatar } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { 
  FadeInRight, 
  FadeOutLeft,
  Layout 
} from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatRelativeTime } from '../utils/timeUtils';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { InAppNotification } from '../types';
import { NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG } from '../types';

const { width } = Dimensions.get('window');

interface NotificationItemProps {
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
  // Get config based on notification properties
  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
      overflow: 'hidden',
    },
    unreadContainer: {
      backgroundColor: colors.background.paper,
    },
    pressed: {
      opacity: 0.7,
    },
    surface: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 12,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    title: {
      fontFamily: Fonts.medium,
      fontSize: 15,
      color: colors.text.primary,
      flex: 1,
    },
    unreadTitle: {
      fontFamily: Fonts.bold,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 8,
    },
    message: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
      marginBottom: 8,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    typeBadge: {
      backgroundColor: colors.neutral[200],
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    typeText: {
      fontFamily: Fonts.medium,
      fontSize: 11,
    },
    time: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    chevron: {
      marginLeft: 4,
    },
    swipeAction: {
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 4,
    },
    leftAction: {
      backgroundColor: colors.status.success,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      marginLeft: 16,
    },
    rightAction: {
      backgroundColor: colors.status.error,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      marginRight: 16,
    },
    swipeActionText: {
      fontFamily: Fonts.medium,
      fontSize: 12,
      color: colors.text.inverse,
      marginTop: 4,
    },
  }), [colors]);

  // Format relative time
  const relativeTime = formatRelativeTime(notification.createdAt);

  // Handle mark as read swipe
  const renderLeftActions = () => {
    if (notification.isRead) return null;
    
    return (
      <View style={[styles.swipeAction, styles.leftAction]}>
        <MaterialCommunityIcons name="check-circle" size={28} color={colors.text.inverse} />
        <Text style={styles.swipeActionText}>Lu</Text>
      </View>
    );
  };

  // Handle delete swipe
  const renderRightActions = () => {
    return (
      <View style={[styles.swipeAction, styles.rightAction]}>
        <MaterialCommunityIcons name="delete" size={28} color={colors.text.inverse} />
        <Text style={styles.swipeActionText}>Suppr.</Text>
      </View>
    );
  };

  // Handle swipe open
  const handleSwipeableOpen = (direction: 'left' | 'right') => {
    if (direction === 'left' && !notification.isRead) {
      onMarkAsRead(notification._id);
    } else if (direction === 'right') {
      onDelete(notification._id);
    }
  };

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 50).springify()}
      exiting={FadeOutLeft}
      layout={Layout.springify()}
    >
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableOpen={handleSwipeableOpen}
        leftThreshold={width * 0.25}
        rightThreshold={width * 0.25}
        friction={2}
        overshootLeft={false}
        overshootRight={false}
      >
        <Pressable
          onPress={() => onPress(notification)}
          style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed,
            !notification.isRead && styles.unreadContainer
          ]}
          android_ripple={{ color: colors.neutral[200] }}
        >
          <Surface style={styles.surface} elevation={0}>
            {/* Icon Container */}
            <View style={[styles.iconContainer, { backgroundColor: categoryConfig.backgroundColor }]}>
              <MaterialCommunityIcons 
                name={typeConfig.icon as any} 
                size={24} 
                color={categoryConfig.color} 
              />
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.header}>
                <Text 
                  style={[
                    styles.title, 
                    !notification.isRead && styles.unreadTitle
                  ]}
                  numberOfLines={1}
                >
                  {notification.title}
                </Text>
                
                {/* Unread Indicator */}
                {!notification.isRead && (
                  <View style={[styles.unreadDot, { backgroundColor: categoryConfig.color }]} />
                )}
              </View>

              <Text style={styles.message} numberOfLines={2}>
                {notification.message}
              </Text>

              <View style={styles.footer}>
                <View style={styles.typeBadge}>
                  <Text style={[styles.typeText, { color: categoryConfig.color }]}>
                    {typeConfig.label}
                  </Text>
                </View>
                
                <Text style={styles.time}>{relativeTime}</Text>
              </View>
            </View>

            {/* Chevron */}
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={20} 
              color={colors.text.secondary} 
              style={styles.chevron}
            />
          </Surface>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
};

export default NotificationItem;
