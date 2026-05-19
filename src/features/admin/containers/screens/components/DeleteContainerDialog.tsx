import React from 'react';
import { Text } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ContainerDetailScreen.styles';

interface DeleteContainerDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  hasGoods: boolean;
}

export const DeleteContainerDialog: React.FC<DeleteContainerDialogProps> = ({
  visible,
  onDismiss,
  onConfirm,
  hasGoods,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Icon icon="alert" color={colors.status.error} />
        <Dialog.Title style={styles.dialogTitle}>
          Supprimer le Container
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            {hasGoods
              ? 'Veuillez d\'abord retirer toutes les marchandises avant de supprimer ce container.'
              : 'Êtes-vous sûr de vouloir supprimer ce container ? Cette action est irréversible.'}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Annuler</Button>
          <Button
            onPress={onConfirm}
            textColor={colors.status.error}
            disabled={hasGoods}
          >
            Supprimer
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
