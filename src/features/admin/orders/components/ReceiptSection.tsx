/**
 * ReceiptSection - Displays receipt preview and action buttons
 * SRP: UI rendering ONLY
 */

import React, { useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useReceiptActions } from '../hooks/useReceiptActions';
import { createReceiptSectionStyles } from './ReceiptSection.styles';

export interface ReceiptSectionProps {
  receiptUrl?: string;
  clientName: string;
  clientPhone?: string;
  amount: number;
  orderCode?: string;
  paymentMethod?: string;
  referenceNumber?: string;
  receiptNumber?: string;
  paidAt?: string;
  loading?: boolean;
}

export const ReceiptSection: React.FC<ReceiptSectionProps> = (props) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createReceiptSectionStyles(colors), [colors]);
  const { receiptUrl, clientPhone, receiptNumber, loading } = props;
  const { isSharing, handleViewReceipt, handleShareGeneric, handleShareWhatsApp } = useReceiptActions(props);

  return (
    <Surface style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="file-document" size={24} color={colors.primary.main} />
        <Text style={styles.cardTitle}>Reçu de paiement</Text>
      </View>

      {receiptUrl ? (
        <>
          <View style={styles.receiptPreview}>
            <MaterialCommunityIcons name="file-pdf-box" size={64} color="#F44336" />
            <Text style={styles.receiptText}>Reçu PDF</Text>
            {receiptNumber && <Text style={styles.receiptNumber}>N° {receiptNumber}</Text>}
          </View>

          <View style={styles.receiptActions}>
            <Button mode="outlined" onPress={handleViewReceipt} style={styles.receiptButton} icon="eye" textColor={colors.primary.main}>
              Voir
            </Button>
            <Button mode="outlined" onPress={handleShareGeneric} style={styles.receiptButton} icon="share-variant" textColor={colors.primary.main} disabled={isSharing}>
              Partager
            </Button>
          </View>

          {clientPhone && (
            <Button mode="contained" onPress={handleShareWhatsApp} style={styles.shareButton} buttonColor="#25D366" icon={isSharing ? undefined : 'whatsapp'} disabled={isSharing}>
              {isSharing ? 'Envoi en cours...' : 'Envoyer sur WhatsApp'}
            </Button>
          )}

          {isSharing && <ActivityIndicator style={styles.loader} size="small" color="#25D366" />}
        </>
      ) : loading ? (
        <View style={styles.noReceiptContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={styles.noReceiptText}>Génération du reçu en cours...</Text>
        </View>
      ) : (
        <View style={styles.noReceiptContainer}>
          <MaterialCommunityIcons name="file-hidden" size={48} color={colors.text.secondary} />
          <Text style={styles.noReceiptText}>Aucun reçu disponible</Text>
        </View>
      )}
    </Surface>
  );
};
