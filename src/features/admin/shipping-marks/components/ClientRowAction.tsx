import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ClientRow.styles';

interface ClientRowActionProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  loading?: boolean;
  primary?: boolean;
}

export const ClientRowAction: React.FC<ClientRowActionProps> = ({ label, icon, onPress, loading, primary }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [styles.action, primary && styles.primaryAction, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ busy: Boolean(loading) }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.text.inverse} />
      ) : (
        <Ionicons name={icon} size={18} color={primary ? colors.text.inverse : colors.text.primary} />
      )}
      <Text style={[styles.actionText, primary && styles.primaryActionText]} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
};
