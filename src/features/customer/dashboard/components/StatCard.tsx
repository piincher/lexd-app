/**
 * StatCard Component
 * Displays a statistic with gradient background, icon, value and label
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

export interface StatCardProps {
  /**
   * Icon name from MaterialCommunityIcons
   */
  icon: string;
  /**
   * Statistic value to display
   */
  value: string | number;
  /**
   * Label describing the statistic
   */
  label: string;
  /**
   * Gradient colors (default: primary gradient)
   */
  gradientColors?: readonly [string, string, ...string[]];
  /**
   * Icon color (default: white)
   */
  iconColor?: string;
  /**
   * Optional press handler
   */
  onPress?: () => void;
  /**
   * Optional test ID
   */
  testID?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  gradientColors = Theme.gradients.primary,
  iconColor = Theme.neutral.white,
  onPress,
  testID,
}) => {
  const theme = useTheme();

  const CardWrapper = onPress ? Pressable : View;
  const pressableProps = onPress ? { onPress, testID } : { testID };

  return (
    <CardWrapper
      {...pressableProps}
      style={styles.container}
    >
      <LinearGradient
        colors={gradientColors as readonly [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Glassmorphism overlay */}
        <View style={styles.glassOverlay} />

        {/* Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={24}
            color={iconColor}
          />
        </View>

        {/* Value */}
        <Text
          style={[styles.value, { color: iconColor }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {value}
        </Text>

        {/* Label */}
        <Text
          style={[styles.label, { color: iconColor }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
      </LinearGradient>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  gradient: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
    position: 'relative',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Theme.radius.lg,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.9,
    marginTop: 2,
  },
});

export default StatCard;
