import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { WhatsAppRequestStatus } from '../../api/whatsappRequestApi';

interface WhatsAppRequestCardActionsProps {
  status: WhatsAppRequestStatus;
  isProcessing: boolean;
  isCompleting: boolean;
  isGeneratingPdf: boolean;
  pdfUrl?: string | null;
  onProcess: () => void;
  onGeneratePdf: () => void;
  onComplete: () => void;
  onWhatsApp: () => void;
}

export const WhatsAppRequestCardActions: React.FC<WhatsAppRequestCardActionsProps> = ({
  status,
  isProcessing,
  isCompleting,
  isGeneratingPdf,
  pdfUrl,
  onProcess,
  onGeneratePdf,
  onComplete,
  onWhatsApp,
}) => {
  const isMutating = isProcessing || isCompleting;

  if (status === 'PENDING') {
    return (
      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={onProcess}
          loading={isMutating}
          disabled={isMutating}
          style={styles.processButton}
          buttonColor={Theme.primary[600]}
        >
          Traiter
        </Button>
        <Button
          mode="outlined"
          onPress={onWhatsApp}
          style={styles.whatsappButton}
          textColor="#25D366"
        >
          WhatsApp
        </Button>
      </View>
    );
  }

  if (status === 'PROCESSING') {
    return (
      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={onGeneratePdf}
          loading={isGeneratingPdf}
          style={styles.pdfButton}
          buttonColor="#6366F1"
          icon="file-pdf-box"
        >
          Générer PDF
        </Button>
        <Button
          mode="contained"
          onPress={onComplete}
          loading={isCompleting}
          style={styles.completeButton}
          buttonColor="#10B981"
        >
          Terminer
        </Button>
      </View>
    );
  }

  if (status === 'COMPLETED' && pdfUrl) {
    return (
      <View style={styles.completedBadge}>
        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
        <Text style={styles.completedText}>PDF envoyé</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  processButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  whatsappButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
    borderColor: '#25D366',
  },
  pdfButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  completeButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: Theme.spacing.md,
    backgroundColor: '#D1FAE5',
    borderRadius: Theme.radius.lg,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
});
