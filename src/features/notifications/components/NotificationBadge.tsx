/**
 * NotificationBadge Component
 * Simple badge showing unread count
 * Can be used with any icon or component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface NotificationBadgeProps {
  count: number;
  showZero?: boolean;
  maxCount?: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  pulse?: boolean;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  showZero = false,
  maxCount = 99,
  size = 'medium',
  color: colorProp,
  pulse = false,
}) => {
  const { colors } = useAppTheme();
  const color = colorProp ?? colors.status.error;
  const scale = useSharedValue(1);

  // Pulse animation when count changes
  React.useEffect(() => {
    if (pulse && count > 0) {
      scale.value = withSequence(
        withSpring(1.3, { damping: 10 }),
        withSpring(1, { damping: 10 })
      );
    }
  }, [count, pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Don't render if count is 0 and showZero is false
  if (count === 0 && !showZero) return null;

  // Format count
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  // Size styles
  const sizeStyles = {
    small: { minWidth: 16, height: 16, fontSize: 9, paddingHorizontal: 3 },
    medium: { minWidth: 20, height: 20, fontSize: 11, paddingHorizontal: 4 },
    large: { minWidth: 24, height: 24, fontSize: 13, paddingHorizontal: 6 },
  };

  const currentSize = sizeStyles[size];

  const styles = StyleSheet.create({
    badge: {
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.background.default,
    },
    text: {
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
  });

  return (
    <Animated.View 
      style={[
        styles.badge, 
        { 
          backgroundColor: color,
          minWidth: currentSize.minWidth,
          height: currentSize.height,
          paddingHorizontal: currentSize.paddingHorizontal,
        },
        animatedStyle,
      ]}
    >
      <Text style={[styles.text, { fontSize: currentSize.fontSize }]}>
        {displayCount}
      </Text>
    </Animated.View>
  );
};

export default NotificationBadge;
