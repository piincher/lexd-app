/**
 * NotificationBell - Pure UI component (no business logic)
 * Header bell icon with optional unread badge
 * 
 * For connected version with live unread count, use:
 *   features/notifications/components/ConnectedNotificationBell
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export interface NotificationBellProps {
  onPress: () => void;
  unreadCount?: number;
  hasNew?: boolean;
  showBadge?: boolean;
  size?: number;
  color?: string;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const NotificationBell: React.FC<NotificationBellProps> = ({
  onPress,
  unreadCount = 0,
  hasNew = false,
  showBadge = true,
  size = 24,
  color: colorProp,
}) => {
  const { colors } = useAppTheme();
  const color = colorProp ?? colors.text.secondary;

  const scale = useSharedValue(1);
  const badgeScale = useSharedValue(hasNew ? 1.2 : 1);

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

  const displayCount = unreadCount > 99 ? '99+' : unreadCount.toString();

  const styles = useMemo(() => StyleSheet.create({
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
      backgroundColor: colors.status.error,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
      borderWidth: 1.5,
      borderColor: colors.background.default,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 10,
      color: colors.text.inverse,
    },
  }), [colors]);

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

      {showBadge && unreadCount > 0 && (
        <Animated.View style={[styles.badgeContainer, badgeAnimatedStyle]}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{displayCount}</Text>
          </View>
        </Animated.View>
      )}
    </Pressable>
  );
};

export default NotificationBell;
