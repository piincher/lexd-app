import React from 'react';
import { Text } from 'react-native';
import { Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ContainerDetailScreen.styles';

interface DeliveredDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const DeliveredDialog: React.FC<DeliveredDialogProps> = ({
  visible,
  onDismiss,
  onConfirm,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Icon icon="checkmark-done-circle" color={colors.status.success} />
      <Dialog.Title style={styles.dialogTitle}>
        Confirmer la livraison
      </Dialog.Title>
      <Dialog.Content>
        <Text style={styles.dialogText}>
          Marquer ce conteneur comme livré ? Cette action marquera aussi toutes les marchandises comme livrées.
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Annuler</Button>
        <Button
          onPress={onConfirm}
          textColor={colors.status.success}
        >
          Confirmer
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
