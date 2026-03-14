import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, Portal, Dialog, Card, Divider } from 'react-native-paper';
import { ClientSearchSection } from '../ClientSearchSection';
import { GoodsPhotoUpload } from '../GoodsPhotoUpload';
import { CostSummary } from '../CostSummary';
import { COLORS } from '@src/constants/Colors';

interface Client {
  phoneNumber: string;
  name: string;
}

interface ReceivedGoodsListProps {
  selectedClient: Client | null;
  onSelectClient: (client: Client | null) => void;
  clientError?: string;
  photoUri: string | null;
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: () => void;
  cbm: number;
  unitPrice: number;
  totalCost: number;
  isSubmitting: boolean;
  onSubmit: () => void;
  errorMessage: string | null;
  onDismissError: () => void;
  showSuccessDialog: boolean;
  onDismissSuccess: () => void;
}

export const ReceivedGoodsList: React.FC<ReceivedGoodsListProps> = ({
  selectedClient,
  onSelectClient,
  clientError,
  photoUri,
  onPhotoSelected,
  onPhotoRemoved,
  cbm,
  unitPrice,
  totalCost,
  isSubmitting,
  onSubmit,
  errorMessage,
  onDismissError,
  showSuccessDialog,
  onDismissSuccess,
}) => {
  return (
    <>
      <ClientSearchSection
        selectedClient={selectedClient}
        onSelectClient={onSelectClient}
        error={clientError}
      />

      <GoodsPhotoUpload
        photoUri={photoUri}
        onPhotoSelected={onPhotoSelected}
        onPhotoRemoved={onPhotoRemoved}
      />

      <CostSummary
        cbm={cbm}
        unitPrice={unitPrice}
        totalCost={totalCost}
      />

      <Button
        mode="contained"
        onPress={onSubmit}
        style={styles.submitButton}
        contentStyle={styles.submitButtonContent}
        loading={isSubmitting}
        disabled={isSubmitting}
        icon="check"
      >
        {isSubmitting ? 'Enregistrement...' : 'Enregistrer la marchandise'}
      </Button>

      <Snackbar
        visible={!!errorMessage}
        onDismiss={onDismissError}
        action={{ label: 'OK', onPress: onDismissError }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>

      <Portal>
        <Dialog visible={showSuccessDialog} onDismiss={onDismissSuccess} style={styles.dialog}>
          <Dialog.Icon icon="check-circle" size={48} color={COLORS.success || '#28a745'} />
          <Dialog.Title style={styles.dialogTitle}>Succès</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>Marchandise enregistrée avec succès!</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button onPress={onDismissSuccess} mode="contained" style={styles.dialogButton}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 8,
    backgroundColor: COLORS.Crimson || '#dc3545',
    borderRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
  snackbar: {
    backgroundColor: '#333',
  },
  dialog: {
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  dialogText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 15,
  },
  dialogActions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  dialogButton: {
    paddingHorizontal: 32,
  },
});
