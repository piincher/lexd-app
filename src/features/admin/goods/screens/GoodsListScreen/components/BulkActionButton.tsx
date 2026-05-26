import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { createStyles } from './GoodsBulkActionBar.styles';

interface BulkActionButtonProps {
  icon: string;
  label: string;
  isPending: boolean;
  disabled: boolean;
  variant?: 'primary' | 'danger';
  onPress: () => void;
}

export const BulkActionButton: React.FC<BulkActionButtonProps> = ({
  icon,
  label,
  isPending,
  disabled,
  variant = 'primary',
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  // Styles are exported as a factory (createStyles) to bind to the active theme — call it
  // here instead of expecting a static `styles` export, which was the source of the
  // "cannot read property 'actionButton' of undefined" crash.
  const styles = createStyles(colors, isDark);
  const buttonStyle = variant === 'danger' ? styles.actionButtonDanger : styles.actionButton;

  return (
    <TouchableOpacity
      style={[buttonStyle, disabled && styles.actionButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {isPending ? (
        <ActivityIndicator size="small" color={colors.text.inverse} />
      ) : (
        <>
          <Ionicons name={icon as any} size={16} color={colors.text.inverse} />
          <Text style={styles.actionButtonText}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
