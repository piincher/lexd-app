import { useAppTheme } from '@src/providers/ThemeProvider';
/**
 * ContainerAssignDialog - Dialog for container selection
 * SRP: Allow user to select and assign container
 */

import React from 'react';
import { View } from 'react-native';
import { Dialog, Button, Text, RadioButton, ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface Container {
  _id: string;
  virtualContainerNumber?: string;
  totalCBM?: number;
}

interface ContainerAssignDialogProps {
  visible: boolean;
  onDismiss: () => void;
  containers: Container[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAssign: () => void;
  isLoading: boolean;
}

export const ContainerAssignDialog: React.FC<ContainerAssignDialogProps> = ({
  visible,
  onDismiss,
  containers = [],
  selectedId,
  onSelect,
  onAssign,
  isLoading,
}) => {
  const { colors } = useAppTheme();
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Sélectionner un container</Dialog.Title>
      <Dialog.Content>
        {isLoading ? (
          <ActivityIndicator color={colors.primary[600]} />
        ) : containers.length === 0 ? (
          <Text>Aucun container disponible</Text>
        ) : (
          <RadioButton.Group onValueChange={(value) => onSelect(value)} value={selectedId || ''}>
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
        <Button onPress={onAssign} disabled={!selectedId || isLoading} loading={isLoading}>
          Assigner
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
