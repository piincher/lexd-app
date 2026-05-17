import React from 'react';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './AuditFilterBar.styles';

interface AuditChipProps {
  label: string;
  active: boolean;
  color?: string;
  onPress: () => void;
}

export const AuditChip: React.FC<AuditChipProps> = ({ label, active, color, onPress }) => {
  const { colors } = useAppTheme();
  const activeColor = color ?? colors.primary.main;

  return (
    <Pressable
      accessibilityRole="button"
      style={[
        styles.chip,
        { borderColor: active ? activeColor : colors.border },
        { backgroundColor: active ? `${activeColor}18` : colors.background.card },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, { color: active ? activeColor : colors.text.primary }]}>{label}</Text>
    </Pressable>
  );
};
