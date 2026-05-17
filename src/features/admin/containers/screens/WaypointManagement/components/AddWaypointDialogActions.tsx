import React from 'react';
import { Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from './AddWaypointDialog.styles';

interface ActionsProps {
  onDismiss: () => void;
  onAdd: () => void;
  isValid: boolean;
}

export const AddWaypointDialogActions: React.FC<ActionsProps> = ({ onDismiss, onAdd, isValid }) => (
  <Dialog.Actions style={styles.actions}>
    <Button onPress={onDismiss} textColor={Theme.neutral[500]}>
      Cancel
    </Button>
    <Button
      onPress={onAdd}
      mode="contained"
      disabled={!isValid}
      buttonColor={Theme.primary[600]}
    >
      Add
    </Button>
  </Dialog.Actions>
);
