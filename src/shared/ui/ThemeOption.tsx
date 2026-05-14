import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './ThemeToggle.styles';

interface ThemeOptionProps {
  icon: string;
  label: string;
  selected: boolean;
  onPress: () => void;
  colors: any;
}

export const ThemeOption: React.FC<ThemeOptionProps> = ({ icon, label, selected, onPress, colors }) => {
  const styles = createStyles(colors);
  return (
  <TouchableOpacity
    style={[
      styles.option,
      {
        backgroundColor: selected ? colors.primary.main + '20' : colors.background.paper,
        borderColor: selected ? colors.primary.main : colors.border,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons
      name={icon as any}
      size={24}
      color={selected ? colors.primary.main : colors.text.secondary}
    />
    <Text
      style={[
        styles.optionText,
        { color: selected ? colors.primary.main : colors.text.primary },
      ]}
    >
      {label}
    </Text>
    {selected && <Ionicons name="checkmark-circle" size={24} color={colors.primary.main} />}
  </TouchableOpacity>
);}
