import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button, Text, TextInput } from 'react-native-paper';

interface QuietHoursDialogProps {
  visible: boolean;
  startTime: string;
  endTime: string;
  onDismiss: () => void;
  onSave: (startTime: string, endTime: string) => void;
}

export const QuietHoursDialog: React.FC<QuietHoursDialogProps> = ({
  visible,
  startTime: initialStartTime,
  endTime: initialEndTime,
  onDismiss,
  onSave,
}) => {
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  const handleSave = () => {
    onSave(startTime, endTime);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Set Quiet Hours</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            Configure the time period when notifications should be silenced.
          </Text>
          <TextInput
            label="Start Time"
            value={startTime}
            onChangeText={setStartTime}
            style={styles.input}
          />
          <TextInput
            label="End Time"
            value={endTime}
            onChangeText={setEndTime}
            style={styles.input}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  input: {
    marginTop: 8,
  },
});
