/**
 * ContactDialog Component
 * Dialog for contacting consignee via phone or WhatsApp
 * SRP: Display contact options for consignee
 */

import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { styles } from '../ClientPackingListScreen.styles';

interface ContactDialogProps {
  visible: boolean;
  onDismiss: () => void;
  consigneeName?: string;
  consigneePhone?: string;
  onCall: () => void;
  onWhatsApp?: () => void;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({
  visible,
  onDismiss,
  consigneeName,
  consigneePhone,
  onCall,
  onWhatsApp,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Contacter {consigneeName || 'le Destinataire'}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.infoLabel}>Numéro de téléphone</Text>
          <Text style={styles.infoValue}>{consigneePhone || 'Non disponible'}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Annuler</Button>
          {onWhatsApp && (
            <Button onPress={onWhatsApp} icon="whatsapp" mode="outlined">
              WhatsApp
            </Button>
          )}
          <Button onPress={onCall} icon="phone" mode="contained">
            Appeler
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ContactDialog;
