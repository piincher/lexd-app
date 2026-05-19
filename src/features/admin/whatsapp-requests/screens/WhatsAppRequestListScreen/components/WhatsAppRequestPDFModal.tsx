/**
 * WhatsAppRequestPDFModal - PDF preview modal
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
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
};

const createStyles = (colors: any) => StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.background.card,
    padding: 20,
    margin: 20,
    borderRadius: 16,
  },
  modalContent: {
    maxHeight: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  pdfPreview: {
    maxHeight: 300,
    marginBottom: 16,
  },
  pdfText: {
    fontSize: 16,
    color: colors.neutral[800],
  },
  pdfNote: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 12,
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});

export default WhatsAppRequestPDFModal;
