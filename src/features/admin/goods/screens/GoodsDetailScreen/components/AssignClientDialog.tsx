import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { ClientSearchSection } from '../../../components/ClientSearchSection';
import { FormInput } from '../../../components/FormInput';
import type { userData } from '@src/shared/types/user';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AssignClientDialogProps {
  visible: boolean;
  selectedClient: userData | null;
  notes: string;
  isAssigning: boolean;
  onSelectClient: (client: userData | null) => void;
  onChangeNotes: (notes: string) => void;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const AssignClientDialog: React.FC<AssignClientDialogProps> = ({
  visible,
  selectedClient,
  notes,
  isAssigning,
  onSelectClient,
  onChangeNotes,
  onDismiss,
  onConfirm,
}) => {
  const { colors } = useAppTheme();
  const styles = StyleSheet.create({
    dialog: {
      backgroundColor: colors.background.card,
    },
    helpText: {
      color: colors.text.secondary,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 16,
    },
    selector: {
      marginBottom: 16,
    },
  });

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>Assigner un client</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.helpText}>
            Sélectionnez le propriétaire identifié pour rattacher cette marchandise et créer ou mettre à jour sa commande.
          </Text>
          <View style={styles.selector}>
            <ClientSearchSection selectedClient={selectedClient} onSelectClient={onSelectClient} />
          </View>
          <FormInput
            label="Note d'identification"
            value={notes}
            onChangeText={onChangeNotes}
            placeholder="Ex: confirmé par le numéro de suivi"
            multiline
            numberOfLines={2}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} disabled={isAssigning}>Annuler</Button>
          <Button
            mode="contained"
            onPress={onConfirm}
            loading={isAssigning}
            disabled={!selectedClient || isAssigning}
          >
            Assigner
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};