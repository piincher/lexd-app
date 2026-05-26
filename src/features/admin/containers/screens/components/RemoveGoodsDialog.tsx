import React from 'react';
import { Text } from 'react-native';
import { Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ContainerDetailScreen.styles';

interface RemoveGoodsDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const RemoveGoodsDialog: React.FC<RemoveGoodsDialogProps> = ({
  visible,
  onDismiss,
  onConfirm,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Icon icon="cube-remove" color={colors.status.warning} />
      <Dialog.Title style={styles.dialogTitle}>
        Retirer la Marchandise
      </Dialog.Title>
      <Dialog.Content>
        <Text style={styles.dialogText}>
          Êtes-vous sûr de vouloir retirer cette marchandise du container ?
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Annuler</Button>
        <Button
          onPress={onConfirm}
          textColor={colors.status.warning}
        >
          Retirer
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
