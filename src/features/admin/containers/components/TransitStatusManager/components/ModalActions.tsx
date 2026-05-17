import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from './StatusUpdateModal.styles';

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
  return (
    <View style={styles.actions}>
      <Button
        onPress={onDismiss}
        disabled={isLoading}
        textColor={Theme.neutral[500]}
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
