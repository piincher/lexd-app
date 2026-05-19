import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './StatusUpdateModal.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ModalActionsProps {
  onDismiss: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  isValid: boolean;
  buttonColor: string;
  confirmLabel: string;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  onDismiss,
  onConfirm,
  isLoading,
  isValid,
  buttonColor,
  confirmLabel,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.actions}>
      <Button
        onPress={onDismiss}
        disabled={isLoading}
        textColor={colors.neutral[500]}
        style={styles.actionButton}
      >
        Annuler
      </Button>
      <Button
        mode="contained"
        onPress={onConfirm}
        disabled={!isValid || isLoading}
        loading={isLoading}
        buttonColor={buttonColor}
        style={styles.actionButton}
      >
        {confirmLabel}
      </Button>
    </View>
  );
};
