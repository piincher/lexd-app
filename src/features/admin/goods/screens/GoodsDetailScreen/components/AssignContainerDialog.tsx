import React from 'react';
import { Portal, Dialog, Button, Text, RadioButton, Checkbox, Divider } from 'react-native-paper';

interface AssignContainerDialogProps {
  visible: boolean;
  containers: any[];
  selectedContainerId: string | null;
  isAssigning: boolean;
  isCorrection?: boolean;
  onToggleCorrection?: () => void;
  onSelect: (id: string) => void;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const AssignContainerDialog: React.FC<AssignContainerDialogProps> = ({
  visible,
  containers = [],
  selectedContainerId,
  isAssigning,
  isCorrection,
  onToggleCorrection,
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
        {onToggleCorrection && (
          <>
            <Divider style={{ marginVertical: 8 }} />
            <Checkbox.Item
              label="Correction — ne pas notifier le client"
              status={isCorrection ? 'checked' : 'unchecked'}
              onPress={onToggleCorrection}
            />
          </>
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
