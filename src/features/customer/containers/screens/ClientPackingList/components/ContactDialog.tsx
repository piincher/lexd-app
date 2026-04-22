/**
 * ContactDialog Component
 * Dialog for contacting consignee via phone or WhatsApp
 * SRP: Display contact options for consignee
 */

import React, { useMemo } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ClientPackingListScreen.styles';

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
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

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
