import React from 'react';
import { Text, Button, Portal, Dialog } from 'react-native-paper';
import { useContactDialogStyles } from './ContactDialog.styles';
import { CustomerContainer } from '../../types';

interface ContactDialogProps {
  visible: boolean;
  container?: CustomerContainer | null;
  onDismiss: () => void;
  onCall: () => void;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({
  visible,
  container,
  onDismiss,
  onCall,
}) => {
  const styles = useContactDialogStyles();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Contacter l'Entrepôt</Dialog.Title>
        <Dialog.Content>
          {container?.pickupContact ? (
            <>
              <Text style={styles.dialogText}>
                <Text style={styles.dialogLabel}>Nom: </Text>
                {container.pickupContact.name}
              </Text>
              <Text style={styles.dialogText}>
                <Text style={styles.dialogLabel}>Téléphone: </Text>
                {container.pickupContact.phone}
              </Text>
              <Text style={styles.dialogText}>
                <Text style={styles.dialogLabel}>Adresse: </Text>
                {container.pickupContact.address}
              </Text>
            </>
          ) : (
            <Text>Contactez votre administrateur pour les informations de retrait.</Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Fermer</Button>
          {container?.pickupContact?.phone && (
            <Button onPress={onCall} mode="contained">
              Appeler
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
