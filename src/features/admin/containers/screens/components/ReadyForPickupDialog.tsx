import React from 'react';
import { Text } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ContainerDetailScreen.styles';

interface ReadyForPickupDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const ReadyForPickupDialog: React.FC<ReadyForPickupDialogProps> = ({
  visible,
  onDismiss,
  onConfirm,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Icon icon="checkmark-done-circle" color={colors.status.warning} />
        <Dialog.Title style={styles.dialogTitle}>
          Marquer comme Prêt
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            Êtes-vous sûr de vouloir marquer ce container comme prêt pour le retrait ?
            {'\n\n'}
            Cela notifiera tous les clients que leurs marchandises sont disponibles.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Annuler</Button>
          <Button
            onPress={onConfirm}
            textColor={colors.status.warning}
          >
            Confirmer
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
