import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';

interface QuietHoursDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onSave: () => void;
}

export const QuietHoursDialog: React.FC<QuietHoursDialogProps> = ({
  visible,
  onDismiss,
  onSave,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Set Quiet Hours</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            Configure the time period when notifications should be silenced.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
