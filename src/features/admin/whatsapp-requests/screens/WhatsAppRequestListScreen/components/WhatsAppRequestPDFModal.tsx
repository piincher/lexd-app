/**
 * WhatsAppRequestPDFModal - PDF preview modal
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface WhatsAppRequestPDFModalProps {
  visible: boolean;
  generatedPdf: string | null;
  onDismiss: () => void;
  onSend: () => void;
}

export const WhatsAppRequestPDFModal: React.FC<WhatsAppRequestPDFModalProps> = ({
  visible,
  generatedPdf,
  onDismiss,
  onSend,
}) => (
  <Portal>
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Aperçu du PDF</Text>
        <ScrollView style={styles.pdfPreview}>
          <Text style={styles.pdfText}>{generatedPdf ? 'PDF généré avec succès!' : 'Aucun contenu'}</Text>
          <Text style={styles.pdfNote}>En production, le PDF sera envoyé au client via WhatsApp.</Text>
        </ScrollView>
        <View style={styles.modalButtons}>
          <Button onPress={onDismiss}>Fermer</Button>
          <Button mode="contained" onPress={onSend}>
            Envoyer au client
          </Button>
        </View>
      </View>
    </Modal>
  </Portal>
);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: Theme.radius.xl,
  },
  modalContent: {
    maxHeight: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Theme.spacing.lg,
  },
  pdfPreview: {
    maxHeight: 300,
    marginBottom: Theme.spacing.lg,
  },
  pdfText: {
    fontSize: 16,
    color: Theme.neutral[800],
  },
  pdfNote: {
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.md,
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.spacing.md,
  },
});

export default WhatsAppRequestPDFModal;
