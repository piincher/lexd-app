import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { styles } from './ExportDialog.styles';

interface ExportDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onExport: (format: string) => void;
}

const EXPORT_OPTIONS = [
  { format: 'csv', label: 'CSV', icon: 'file-delimited' },
  { format: 'xlsx', label: 'Excel', icon: 'microsoft-excel' },
  { format: 'pdf', label: 'PDF', icon: 'file-pdf-box' },
] as const;

export const ExportDialog: React.FC<ExportDialogProps> = ({ visible, onDismiss, onExport }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Exporter les données</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.exportText}>
            Choisissez le format d'export pour les données analytics
          </Text>
          <View style={styles.exportButtons}>
            {EXPORT_OPTIONS.map((option) => (
              <Button
                key={option.format}
                mode="outlined"
                onPress={() => onExport(option.format)}
                style={styles.exportButton}
                icon={option.icon}
              >
                {option.label}
              </Button>
            ))}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Annuler</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
