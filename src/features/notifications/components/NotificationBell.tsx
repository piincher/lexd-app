/**
 * NotificationBell Component
 * Header bell icon with unread badge
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { useGetUnreadCount } from '../hooks/useNotifications';

interface NotificationBellProps {
  onPress: () => void;
  showBadge?: boolean;
  size?: number;
  color?: string;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const NotificationBell: React.FC<NotificationBellProps> = ({
  onPress,
  showBadge = true,
  size = 24,
  color = COLORS.DarkGrey,
}) => {
  // Get unread count with polling
  const { data: unreadData, isLoading } = useGetUnreadCount();
  const unreadCount = unreadData?.count || 0;
  const hasNew = unreadData?.hasNew || false;

  // Animation values
  const scale = useSharedValue(1);
  const badgeScale = useSharedValue(hasNew ? 1.2 : 1);

  // Badge animation when new notification arrives
  React.useEffect(() => {
    if (hasNew) {
      badgeScale.value = withSequence(
        withSpring(1.4, { damping: 10 }),
        withSpring(1, { damping: 10 })
      );
    }
  }, [hasNew]);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  // Handle press with animation and haptics
  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withSpring(1, { damping: 10 })
    );
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Format count for display (max 99+)
  const displayCount = unreadCount > 99 ? '99+' : unreadCount.toString();

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel={`Notifications, ${unreadCount} non lues`}
      accessibilityHint="Appuyez pour voir vos notifications"
    >
      <Animated.View style={iconAnimatedStyle}>
        <Ionicons name="notifications-outline" size={size} color={color} />
      </Animated.View>

      {/* Badge */}
      {showBadge && unreadCount > 0 && (
        <Animated.View style={[styles.badgeContainer, badgeAnimatedStyle]}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{displayCount}</Text>
          </View>
          
          {/* Red dot for new notifications */}
          {hasNew && <View style={styles.newIndicator} />}
        </Animated.View>
      )}

      {/* Red dot only (no count) */}
      {showBadge && unreadCount === 0 && hasNew && (
        <View style={styles.dotOnly} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 8,
  },
  badgeContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: COLORS.danger,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  badgeText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: COLORS.white,
  },
  newIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.danger,
    marginLeft: 2,
  },
  dotOnly: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
});

export default NotificationBell;
