import React from 'react';
import { Portal, Dialog, Button, Text, RadioButton } from 'react-native-paper';

interface AssignContainerDialogProps {
  visible: boolean;
  containers: any[];
  selectedContainerId: string | null;
  isAssigning: boolean;
  onSelect: (id: string) => void;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const AssignContainerDialog: React.FC<AssignContainerDialogProps> = ({
  visible,
  containers,
  selectedContainerId,
  isAssigning,
  onSelect,
  onDismiss,
  onConfirm,
}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Sélectionner un container</Dialog.Title>
      <Dialog.Content>
        {containers.length === 0 ? (
          <Text>Aucun container disponible</Text>
        ) : (
          <RadioButton.Group onValueChange={onSelect} value={selectedContainerId || ''}>
            {containers.map((container: any) => (
              <RadioButton.Item
                key={container._id}
                label={`${container.virtualContainerNumber} (${container.totalCBM?.toFixed(2) || 0} m³)`}
                value={container._id}
              />
            ))}
          </RadioButton.Group>
        )}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Annuler</Button>
        <Button onPress={onConfirm} disabled={!selectedContainerId || isAssigning} loading={isAssigning}>
          Assigner
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);
