import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { styles } from './ThemeToggle.styles';

interface ThemeToggleIconProps {
  iconName: string;
  size: number;
  scaleAnim: Animated.Value;
  onPress: () => void;
  colors: any;
  style?: any;
}

export const ThemeToggleIcon: React.FC<ThemeToggleIconProps> = ({
  iconName,
  size,
  scaleAnim,
  onPress,
  colors,
  style,
}) => (
  <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.iconButton, { backgroundColor: colors.background.card }, style]}
      activeOpacity={0.7}
    >
      <FontAwesome6 name={iconName as any} size={size} color={colors.primary.main} />
    </TouchableOpacity>
  </Animated.View>
);
