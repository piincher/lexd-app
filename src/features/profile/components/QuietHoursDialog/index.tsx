/**
 * QuietHoursDialog Component
 * Dialog for setting quiet hours time range
 */

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Portal, Dialog, Button, Text } from "react-native-paper";

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
  const [startTime] = useState(initialStartTime);
  const [endTime] = useState(initialEndTime);

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
          <Text style={styles.timeDisplay}>
            {startTime} - {endTime}
          </Text>
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
    color: "#6B7280",
  },
  timeDisplay: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    textAlign: "center",
  },
});
