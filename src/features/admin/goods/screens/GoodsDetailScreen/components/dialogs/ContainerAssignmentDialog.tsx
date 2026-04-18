// ContainerAssignmentDialog - Dialog for assigning goods to container

import React from 'react';
import { Text } from 'react-native';
import { Portal, Dialog, Button, RadioButton, ActivityIndicator } from 'react-native-paper';

interface Container {
  _id: string;
  virtualContainerNumber?: string;
  totalCBM?: number;
}

interface ContainerAssignmentDialogProps {
  visible: boolean;
  onDismiss: () => void;
  containers: Container[];
  selectedContainerId: string | null;
  onSelectContainer: (id: string) => void;
  onAssign: () => void;
  isLoading: boolean;
}

export const ContainerAssignmentDialog: React.FC<ContainerAssignmentDialogProps> = ({
  visible,
  onDismiss,
  containers = [],
  selectedContainerId,
  onSelectContainer,
  onAssign,
  isLoading,
}) => {
  const hasContainers = containers.length > 0;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Sélectionner un container</Dialog.Title>
        <Dialog.Content>
          {isLoading ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : !hasContainers ? (
            <Text>Aucun container disponible</Text>
          ) : (
            <RadioButton.Group
              onValueChange={(value) => onSelectContainer(value)}
              value={selectedContainerId || ''}
            >
              {containers.map((container) => (
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
          <Button 
            onPress={onAssign} 
            disabled={!selectedContainerId || isLoading}
            loading={isLoading}
          >
            Assigner
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
