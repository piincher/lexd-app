/**
 * ReceiptSection - Displays receipt preview and action buttons
 * SRP: Show receipt preview, view/download/share actions (including PDF via WhatsApp)
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Alert, Linking, ActivityIndicator } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { sharePDFOnWhatsApp, sharePDFGeneric } from '@src/shared/lib/pdfShare';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH: 'Espèces',
  BANK_TRANSFER: 'Virement Bancaire',
  MOBILE_MONEY: 'Mobile Money',
  ORANGE_MONEY: 'Orange Money',
  WAVE: 'Wave',
  CARD: 'Carte Bancaire',
};

interface ReceiptSectionProps {
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

const formatPhoneNumber = (phone: string) => {
  if (!phone) return '';
  let cleaned = phone.replace(/[\s\-().+]/g, '');
  if (cleaned.startsWith('00')) cleaned = cleaned.substring(2);
  if (!cleaned.startsWith('223') && cleaned.length === 8) {
    cleaned = '223' + cleaned;
  }
  return cleaned;
};

export const ReceiptSection: React.FC<ReceiptSectionProps> = ({
  receiptUrl,
  clientName,
  clientPhone,
  amount,
  orderCode,
  paymentMethod,
  referenceNumber,
  receiptNumber,
  paidAt,
  loading,
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const { colors } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
      backgroundColor: colors.background.card,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginLeft: 8,
      color: colors.text.primary,
    },
    receiptPreview: {
      alignItems: 'center',
      paddingVertical: 24,
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      marginBottom: 16,
    },
    receiptText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      marginTop: 8,
    },
    receiptNumber: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      marginTop: 4,
    },
    receiptActions: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
    },
    receiptButton: {
      flex: 1,
      borderRadius: 8,
    },
    shareButton: {
      borderRadius: 8,
      paddingVertical: 4,
    },
    loader: {
      marginTop: 8,
    },
    noReceiptContainer: {
      alignItems: 'center',
      paddingVertical: 32,
    },
    noReceiptText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      marginTop: 8,
    },
  }), [colors]);

  const handleViewReceipt = () => {
    if (receiptUrl) {
      Linking.openURL(receiptUrl);
    } else {
      Alert.alert('Erreur', 'Le reçu n\'est pas disponible');
    }
  };

  const handleDownloadReceipt = () => {
    if (receiptUrl) {
      Linking.openURL(receiptUrl);
      Alert.alert('Téléchargement', 'Le reçu est en cours de téléchargement');
    } else {
      Alert.alert('Erreur', 'Le reçu n\'est pas disponible');
    }
  };

  const buildCaption = () => {
    const methodLabel = paymentMethod ? (PAYMENT_METHOD_LABELS[paymentMethod] || paymentMethod) : '';
    const dateStr = paidAt ? format(new Date(paidAt), 'dd MMMM yyyy', { locale: fr }) : '';
    let caption = `✅ *Reçu de Paiement - ChinaLink Express*\n\n`;
    caption += `Client: *${clientName}*\n`;
    caption += `💰 Montant: *${amount.toLocaleString('fr-FR')} FCFA*\n`;
    if (methodLabel) caption += `💳 Mode: ${methodLabel}\n`;
    if (orderCode) caption += `📦 Commande: ${orderCode}\n`;
    if (receiptNumber) caption += `🧾 N° Reçu: ${receiptNumber}\n`;
    if (dateStr) caption += `📅 Date: ${dateStr}\n`;
    caption += `\nMerci pour votre confiance!\n_ChinaLink Express_`;
    return caption;
  };

  const handleShareWhatsApp = async () => {
    if (!receiptUrl) {
      Alert.alert('Erreur', 'Le reçu n\'est pas disponible');
      return;
    }
    setIsSharing(true);
    try {
      await sharePDFOnWhatsApp({
        url: receiptUrl,
        filename: `recu_${receiptNumber || 'payment'}.pdf`,
        message: buildCaption(),
        phone: clientPhone ? formatPhoneNumber(clientPhone) : undefined,
      });
    } catch (error: any) {
      console.error('PDF WhatsApp share error:', error);
      Alert.alert('Erreur', 'Impossible de partager le PDF.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleShareGeneric = async () => {
    if (!receiptUrl) {
      Alert.alert('Erreur', 'Le reçu n\'est pas disponible');
      return;
    }
    setIsSharing(true);
    try {
      await sharePDFGeneric({
        url: receiptUrl,
        filename: `recu_${receiptNumber || 'payment'}.pdf`,
        message: buildCaption(),
      });
    } catch (error: any) {
      console.error('PDF share error:', error);
      Alert.alert('Erreur', 'Impossible de partager le PDF.');
    } finally {
      setIsSharing(false);
    }
  };

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
            {receiptNumber && (
              <Text style={styles.receiptNumber}>N° {receiptNumber}</Text>
            )}
          </View>

          <View style={styles.receiptActions}>
            <Button
              mode="outlined"
              onPress={handleViewReceipt}
              style={styles.receiptButton}
              icon="eye"
              textColor={colors.primary.main}
            >
              Voir
            </Button>
            <Button
              mode="outlined"
              onPress={handleShareGeneric}
              style={styles.receiptButton}
              icon="share-variant"
              textColor={colors.primary.main}
              disabled={isSharing}
            >
              Partager
            </Button>
          </View>

          {clientPhone && (
            <Button
              mode="contained"
              onPress={handleShareWhatsApp}
              style={styles.shareButton}
              buttonColor="#25D366"
              icon={isSharing ? undefined : "whatsapp"}
              disabled={isSharing}
            >
              {isSharing ? 'Envoi en cours...' : 'Envoyer sur WhatsApp'}
            </Button>
          )}

          {isSharing && (
            <ActivityIndicator style={styles.loader} size="small" color="#25D366" />
          )}
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
