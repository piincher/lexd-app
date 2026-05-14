import React from "react";
import { Text } from "react-native-paper";
import { Button, Dialog, Portal } from "react-native-paper";
import { styles } from "./BackupManager.styles";
import { Backup } from "../../types";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface RestoreDialogProps {
  visible: boolean;
  backup: Backup | null;
  isPending: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const RestoreDialog: React.FC<RestoreDialogProps> = ({
  visible,
  backup,
  isPending,
  onDismiss,
  onConfirm,
}) => {
  const { colors } = useAppTheme();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Icon icon="alert" size={40} color={colors.status.error} />
        <Dialog.Title style={styles.dialogTitle}>Restore Backup?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            This will restore the database from backup{" "}
            <Text style={styles.bold}>{backup?.backupId}</Text>.
          </Text>
          <Text variant="bodyMedium" style={styles.warningText}>
            This action will overwrite current data and cannot be undone. Proceed with caution!
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onConfirm} loading={isPending} textColor={colors.status.error}>
            Restore
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
