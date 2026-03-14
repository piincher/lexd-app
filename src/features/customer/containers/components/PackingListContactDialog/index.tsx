/**
 * PackingListContactDialog Component
 * Contact dialog for consignee
 * SRP: Display consignee contact information dialog
 */

import React from 'react';
import { Linking } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PackingListContactDialog.styles';

interface Consignee {
  name: string;
  phone: string;
  email?: string;
}

interface PackingListContactDialogProps {
  visible: boolean;
  onDismiss: () => void;
  consignee: Consignee;
}

export const PackingListContactDialog: React.FC<PackingListContactDialogProps> = ({
  visible,
  onDismiss,
  consignee,
}) => {
  const handleCall = () => {
    if (consignee.phone) {
      Linking.openURL(`tel:${consignee.phone}`);
    }
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Contacter le Destinataire</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            <Text style={styles.dialogLabel}>Nom: </Text>
            {consignee.name}
          </Text>
          <Text style={styles.dialogText}>
            <Text style={styles.dialogLabel}>Téléphone: </Text>
            {consignee.phone}
          </Text>
          {consignee.email && (
            <Text style={styles.dialogText}>
              <Text style={styles.dialogLabel}>Email: </Text>
              {consignee.email}
            </Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Fermer</Button>
          <Button onPress={handleCall} mode="contained">
            Appeler
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PackingListContactDialog;
