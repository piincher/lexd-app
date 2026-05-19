import { useAppTheme } from '@src/providers/ThemeProvider';
/**
 * SaveChangesDialog - Simple confirmation dialog for saving changes
 */

import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface SaveChangesDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onSave: () => void;
}

export const SaveChangesDialog: React.FC<SaveChangesDialogProps> = ({
  visible,
  onDismiss,
  onSave,
}) => {
  const { colors } = useAppTheme();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Icon icon="content-save" color={colors.primary.main} />
        <Dialog.Title>Sauvegarder les modifications</Dialog.Title>
        <Dialog.Content>
          <Text style={{ color: colors.neutral[600] }}>
            Voulez-vous sauvegarder les modifications apportées aux waypoints ?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Annuler</Button>
          <Button onPress={onSave} textColor={colors.primary.main}>
            Sauvegarder
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SaveChangesDialog;
