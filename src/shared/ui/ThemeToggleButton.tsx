import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { createStyles } from './ThemeToggle.styles';

interface ThemeToggleButtonProps {
  iconName: string;
  label: string;
  onPress: () => void;
  colors: any;
  style?: any;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  iconName,
  label,
  onPress,
  colors,
  style,
}) => {
  const styles = createStyles(colors);
  return (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      { backgroundColor: colors.background.card, borderColor: colors.border },
      style,
    ]}
    activeOpacity={0.7}
  >
    <FontAwesome6 name={iconName as any} size={18} color={colors.primary.main} />
    <Text style={[styles.buttonText, { color: colors.text.primary }]}>{label}</Text>
    <FontAwesome6 name="chevron-right" size={14} color={colors.text.secondary} />
  </TouchableOpacity>
);}
