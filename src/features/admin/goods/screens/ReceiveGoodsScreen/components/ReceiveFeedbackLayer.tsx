import React from 'react';
import { Text } from 'react-native';
import { Button, Dialog, Portal, Snackbar } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ReceiveLabelModal } from './ReceiveLabelModal';
import { createStyles } from '../ReceiveGoodsScreen.styles';
import type { Goods } from '../../../types';

interface ReceiveFeedbackLayerProps {
  infoMessage: string | null;
  errorMessage: string | null;
  showSuccessDialog: boolean;
  successMessage: string;
  labelGoods: Goods | null;
  labelVisible: boolean;
  onDismissInfo: () => void;
  onDismissError: () => void;
  onDismissSuccess: () => void;
  onOpenLabel: () => void;
  onDismissLabel: () => void;
}

export const ReceiveFeedbackLayer: React.FC<ReceiveFeedbackLayerProps> = ({
  infoMessage,
  errorMessage,
  showSuccessDialog,
  successMessage,
  labelGoods,
  labelVisible,
  onDismissInfo,
  onDismissError,
  onDismissSuccess,
  onOpenLabel,
  onDismissLabel,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <>
      <Snackbar visible={!!infoMessage} onDismiss={onDismissInfo} duration={2500} style={styles.infoSnackbar}>
        {infoMessage}
      </Snackbar>
      <Snackbar
        visible={!!errorMessage}
        onDismiss={onDismissError}
        action={{ label: 'OK', onPress: onDismissError }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
      <Portal>
        <Dialog visible={showSuccessDialog} onDismiss={onDismissSuccess} style={styles.dialog}>
          <Dialog.Icon icon="check-circle" size={48} color={colors.status.success} />
          <Dialog.Title style={styles.dialogTitle}>Succès</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>{successMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            {labelGoods ? (
              <Button onPress={onOpenLabel} mode="outlined" style={styles.dialogButton}>
                Étiquette
              </Button>
            ) : null}
            <Button onPress={onDismissSuccess} mode="contained" style={styles.dialogButton}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ReceiveLabelModal visible={labelVisible} goods={labelGoods} onDismiss={onDismissLabel} />
    </>
  );
};
