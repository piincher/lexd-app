import React from 'react';
import { Portal, Dialog, Button, Text, RadioButton } from 'react-native-paper';

interface AssignAirwayBillDialogProps {
  visible: boolean;
  airwayBills: any[];
  selectedAirwayBillId: string | null;
  isAssigning: boolean;
  onSelect: (id: string) => void;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const AssignAirwayBillDialog: React.FC<AssignAirwayBillDialogProps> = ({
  visible,
  airwayBills = [],
  selectedAirwayBillId,
  isAssigning,
  onSelect,
  onDismiss,
  onConfirm,
}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Sélectionner une lettre de transport</Dialog.Title>
      <Dialog.Content>
        {airwayBills.length === 0 ? (
          <Text>Aucune lettre de transport disponible</Text>
        ) : (
          <RadioButton.Group onValueChange={onSelect} value={selectedAirwayBillId || ''}>
            {airwayBills.map((awb: any) => (
              <RadioButton.Item
                key={awb._id}
                label={`${awb.awbNumber} · ${awb.flightNumber} · ${awb.totalPackages} colis`}
                value={awb._id}
              />
            ))}
          </RadioButton.Group>
        )}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Annuler</Button>
        <Button onPress={onConfirm} disabled={!selectedAirwayBillId || isAssigning} loading={isAssigning}>
          Assigner
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);
