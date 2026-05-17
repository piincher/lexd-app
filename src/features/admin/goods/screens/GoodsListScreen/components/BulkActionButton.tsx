import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from './GoodsBulkActionBar.styles';

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
  const buttonStyle = variant === 'danger' ? styles.actionButtonDanger : styles.actionButton;

  return (
    <TouchableOpacity
      style={[buttonStyle, disabled && styles.actionButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {isPending ? (
        <ActivityIndicator size="small" color={Theme.colors.text.inverse} />
      ) : (
        <>
          <Ionicons name={icon as any} size={16} color={Theme.colors.text.inverse} />
          <Text style={styles.actionButtonText}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
