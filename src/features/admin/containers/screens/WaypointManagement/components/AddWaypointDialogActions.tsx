import React from 'react';
import { Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './AddWaypointDialog.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ActionsProps {
  onDismiss: () => void;
  onAdd: () => void;
  isValid: boolean;
}

export const AddWaypointDialogActions: React.FC<ActionsProps> = ({ onDismiss, onAdd, isValid }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
  <Dialog.Actions style={styles.actions}>
    <Button onPress={onDismiss} textColor={colors.neutral[500]}>
      Cancel
    </Button>
    <Button
      onPress={onAdd}
      mode="contained"
      disabled={!isValid}
      buttonColor={colors.primary[600]}
    >
      Add
    </Button>
  </Dialog.Actions>
  );
};
