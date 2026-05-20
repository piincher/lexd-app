import React from 'react';
import { Text } from 'react-native';
import { Dialog, Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ContainerDetailScreen.styles';

interface DeleteContainerDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  hasGoods: boolean;
  isDeleting: boolean;
}

export const DeleteContainerDialog: React.FC<DeleteContainerDialogProps> = ({
  visible,
  onDismiss,
  onConfirm,
  hasGoods,
  isDeleting,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <Dialog visible={visible} onDismiss={isDeleting ? undefined : onDismiss}>
      <Dialog.Icon icon="alert" color={colors.status.error} />
      <Dialog.Title style={styles.dialogTitle}>
        Supprimer le Container
      </Dialog.Title>
      <Dialog.Content>
        <Text style={styles.dialogText}>
          {hasGoods
            ? 'Les marchandises assignées seront renvoyées aux non assignées avec leur statut entrepôt. Cette action est irréversible.'
            : 'Êtes-vous sûr de vouloir supprimer ce container ? Cette action est irréversible.'}
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss} disabled={isDeleting}>Annuler</Button>
        <Button
          onPress={onConfirm}
          textColor={colors.status.error}
          disabled={isDeleting}
          loading={isDeleting}
        >
          Supprimer
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
