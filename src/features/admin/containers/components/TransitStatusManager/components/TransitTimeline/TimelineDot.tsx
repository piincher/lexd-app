import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './TransitTimeline.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export type WaypointItemStatus = 'completed' | 'current' | 'pending';

interface TimelineDotProps {
  status: WaypointItemStatus;
  isLast: boolean;
}

export const TimelineDot: React.FC<TimelineDotProps> = ({ status, isLast }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  React.useEffect(() => {
    if (status === 'current') {
      pulseScale.value = withRepeat(withTiming(1.3, { duration: 1000 }), -1, true);
      pulseOpacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
    }
  }, [status]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const dotStyles = [
    styles.timelineDot,
    status === 'completed' && styles.timelineDotCompleted,
    status === 'current' && styles.timelineDotCurrent,
    status === 'pending' && styles.timelineDotPending,
  ];

  return (
    <View style={styles.timelineDotContainer}>
      {status === 'current' && <Animated.View style={[styles.timelineDotPulse, pulseStyle]} />}
      <View style={dotStyles}>
        {status === 'completed' && <Ionicons name="checkmark" size={14} color={colors.text.inverse} />}
        {status === 'current' && <View style={styles.currentDotInner} />}
      </View>
      {!isLast && (
        <View style={[styles.timelineConnector, status === 'completed' && styles.timelineConnectorCompleted]} />
      )}
    </View>
  );
};
