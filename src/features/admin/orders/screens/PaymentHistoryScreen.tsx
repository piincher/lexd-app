/**
 * PaymentHistoryScreen - Admin view of payment history for a specific order
 * Includes receipt viewing and WhatsApp sharing capabilities
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import { Text, Surface, Divider, ActivityIndicator, IconButton, Portal, Modal, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { sharePDFOnWhatsApp as sharePDFOnWhatsAppUtil } from '@src/shared/lib/pdfShare';
import { Screen } from '@src/shared/ui/Screen';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPaymentHistory, backfillPayments } from '@src/api/order';
import { formatDate } from '@src/utils/formatDate';

const PAYMENT_METHOD_ICONS: Record<string, string> = {
  CASH: 'cash',
  BANK_TRANSFER: 'bank',
  MOBILE_MONEY: 'cellphone',
  ORANGE_MONEY: 'cellphone',
  WAVE: 'wave',
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH: 'Espèces',
  BANK_TRANSFER: 'Virement Bancaire',
  MOBILE_MONEY: 'Mobile Money',
  ORANGE_MONEY: 'Orange Money',
  WAVE: 'Wave',
};

const formatPhoneForWhatsApp = (phone: string): string => {
  if (!phone) return '';
  let cleaned = phone.replace(/[\s\-().+]/g, '');
  if (cleaned.startsWith('00')) cleaned = cleaned.substring(2);
  if (!cleaned.startsWith('223') && cleaned.length === 8) {
    cleaned = '223' + cleaned;
  }
  return cleaned;
};

const PaymentHistoryScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { orderId, orderCode, clientName, clientPhone } = route.params as {
    orderId: string;
    orderCode: string;
    clientName?: string;
    clientPhone?: string;
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: payments, isLoading, error, refetch } = useQuery({
    queryKey: ['paymentHistory', orderId],
    queryFn: () => getPaymentHistory(orderId),
    enabled: !!orderId,
  });

  const { mutate: runBackfill, isPending: isBackfilling } = useMutation({
    mutationFn: () => backfillPayments(orderId),
    onSuccess: (data: any) => {
      Alert.alert(
        'Synchronisation terminée',
        `${data.created} paiements synchronisés, ${data.receiptsGenerated} reçus générés.`
      );
      queryClient.invalidateQueries({ queryKey: ['paymentHistory', orderId] });
      refetch();
    },
    onError: (err: any) => {
      Alert.alert('Erreur', err?.message || 'La synchronisation a échoué.');
    },
  });

  // Check if any payments are missing receipts
  const hasMissingReceipts = payments?.some((p: any) => !p.receiptUrl);

  const handleViewReceipt = (receiptUrl: string) => {
    Linking.openURL(receiptUrl).catch(() =>
      Alert.alert('Erreur', "Impossible d'ouvrir le reçu.")
    );
  };

  const [sharingPaymentId, setSharingPaymentId] = useState<string | null>(null);

  const handleShareOnWhatsApp = async (payment: any) => {
    const phone = clientPhone || payment.clientPhone;
    if (!phone) {
      Alert.alert('Numéro manquant', "Le numéro de téléphone du client n'est pas disponible.");
      return;
    }

    const formattedPhone = formatPhoneForWhatsApp(phone);
    const amountStr = (payment.amount || 0).toLocaleString('fr-FR');
    const methodLabel = PAYMENT_METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod;
    const date = formatDate(payment.recordedAt);
    const name = clientName || 'Client';

    let message = `✅ *Reçu de Paiement - ChinaLink Express*\n\n`;
    message += `Bonjour ${name},\n\n`;
    message += `Votre paiement a été enregistré avec succès.\n\n`;
    message += `📋 *Détails du Paiement:*\n`;
    message += `• Montant: *${amountStr} FCFA*\n`;
    message += `• Méthode: ${methodLabel}\n`;
    message += `• Date: ${date}\n`;
    message += `• N° Commande: ${orderCode}\n`;
    if (payment.referenceNumber) message += `• Référence: ${payment.referenceNumber}\n`;
    if (payment.receiptNumber) message += `• N° Reçu: ${payment.receiptNumber}\n`;
    message += `\nMerci de votre confiance!\n_ChinaLink Express_`;

    // If receipt PDF is available, share the actual file
    if (payment.receiptUrl) {
      setSharingPaymentId(payment._id);
      try {
        await sharePDFOnWhatsAppUtil({
          url: payment.receiptUrl,
          filename: `recu_${payment.receiptNumber || 'payment'}.pdf`,
          message,
          phone: formattedPhone,
        });
      } catch (err: any) {
        console.error('PDF share error:', err);
        // Fallback: open WhatsApp with text message + link
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message + `\n\n📄 Votre reçu:\n${payment.receiptUrl}`)}`;
        Linking.openURL(whatsappUrl).catch(() => Alert.alert('Erreur', "Impossible d'ouvrir WhatsApp."));
      } finally {
        setSharingPaymentId(null);
      }
    } else {
      // No PDF — send text only via WhatsApp link
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
      try {
        const canOpen = await Linking.canOpenURL(whatsappUrl);
        if (canOpen) {
          await Linking.openURL(whatsappUrl);
        } else {
          Alert.alert('WhatsApp non disponible', "WhatsApp n'est pas installé.");
        }
      } catch {
        Alert.alert('Erreur', "Impossible d'ouvrir WhatsApp.");
      }
    }
  };

  const renderPaymentCard = (payment: any, index: number) => {
    const hasReceipt = !!payment.receiptUrl;
    const hasPhone = !!(clientPhone || payment.clientPhone);

    return (
      <Surface key={payment._id || index} style={styles.paymentCard}>
        {/* Header */}
        <View style={styles.paymentHeader}>
          <View style={styles.methodContainer}>
            <View style={styles.methodIcon}>
              <MaterialCommunityIcons
                name={(PAYMENT_METHOD_ICONS[payment.paymentMethod] || 'cash') as any}
                size={20}
                color={COLORS.blue}
              />
            </View>
            <View>
              <Text style={styles.methodText}>
                {PAYMENT_METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod}
              </Text>
              <Text style={styles.dateText}>{formatDate(payment.recordedAt)}</Text>
            </View>
          </View>
          <Text style={styles.amountText}>
            {(payment.amount || 0).toLocaleString('fr-FR')} FCFA
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Details */}
        <View style={styles.detailsContainer}>
          {payment.referenceNumber && (
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="identifier" size={16} color={COLORS.grey} />
              <Text style={styles.detailLabel}>Référence:</Text>
              <Text style={styles.detailValue}>{payment.referenceNumber}</Text>
            </View>
          )}

          {payment.receiptNumber && (
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="receipt" size={16} color={COLORS.grey} />
              <Text style={styles.detailLabel}>N° Reçu:</Text>
              <Text style={styles.detailValue}>{payment.receiptNumber}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="account" size={16} color={COLORS.grey} />
            <Text style={styles.detailLabel}>Enregistré par:</Text>
            <Text style={styles.detailValue}>
              {payment.recordedBy?.firstName} {payment.recordedBy?.lastName}
            </Text>
          </View>

          {payment.notes && (
            <View style={styles.notesContainer}>
              <MaterialCommunityIcons name="note-text" size={16} color={COLORS.grey} />
              <Text style={styles.notesText}>{payment.notes}</Text>
            </View>
          )}
        </View>

        {/* Receipt & WhatsApp Actions */}
        {(hasReceipt || hasPhone) && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.actionsContainer}>
              {hasReceipt && (
                <Button
                  mode="outlined"
                  onPress={() => handleViewReceipt(payment.receiptUrl)}
                  style={styles.actionButton}
                  icon="file-pdf-box"
                  textColor={COLORS.blue}
                  compact
                >
                  Voir le reçu
                </Button>
              )}

              {hasPhone && (
                <Button
                  mode="contained"
                  onPress={() => handleShareOnWhatsApp(payment)}
                  style={styles.whatsappButton}
                  buttonColor="#25D366"
                  icon={sharingPaymentId === payment._id ? undefined : "whatsapp"}
                  compact
                  disabled={sharingPaymentId === payment._id}
                  loading={sharingPaymentId === payment._id}
                >
                  {sharingPaymentId === payment._id ? 'Envoi...' : 'Partager'}
                </Button>
              )}
            </View>
          </>
        )}

        {/* Proof Images */}
        {payment.proofImages && payment.proofImages.length > 0 && (
          <View style={styles.imagesContainer}>
            <Text style={styles.imagesLabel}>Preuve de paiement:</Text>
            <View style={styles.imagesRow}>
              {payment.proofImages.map((url: string, imgIndex: number) => (
                <TouchableOpacity key={imgIndex} onPress={() => setSelectedImage(url)}>
                  <Image source={{ uri: url }} style={styles.thumbnail} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </Surface>
    );
  };

  if (isLoading) {
    return (
      <Screen header={{ title: 'Historique des paiements' }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={styles.loadingText}>Chargement des paiements...</Text>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen header={{ title: 'Historique des paiements' }}>
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={48} color={COLORS.redShade} />
          <Text style={styles.errorTitle}>Échec du chargement</Text>
          <Text style={styles.errorText}>{(error as Error).message}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  const totalPaid = payments?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0;

  return (
    <Screen header={{ title: 'Historique des paiements', subtitle: orderCode }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {payments && payments.length > 0 ? (
          <>
            {/* Summary Card */}
            <Surface style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Paiements</Text>
                  <Text style={styles.summaryValue}>{payments.length}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Total encaissé</Text>
                  <Text style={[styles.summaryValue, { color: '#10B981' }]}>
                    {totalPaid.toLocaleString('fr-FR')} FCFA
                  </Text>
                </View>
              </View>
            </Surface>

            {/* Backfill button when receipts are missing */}
            {hasMissingReceipts && (
              <Button
                mode="contained"
                onPress={() => runBackfill()}
                style={styles.backfillButton}
                buttonColor={COLORS.blue}
                icon={isBackfilling ? undefined : "sync"}
                loading={isBackfilling}
                disabled={isBackfilling}
              >
                {isBackfilling ? 'Synchronisation...' : 'Générer les reçus manquants'}
              </Button>
            )}

            {payments.map((payment: any, index: number) => renderPaymentCard(payment, index))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cash-remove" size={64} color={COLORS.lightGray} />
            <Text style={styles.emptyTitle}>Aucun paiement</Text>
            <Text style={styles.emptyText}>
              Aucun paiement n'a été enregistré pour cette commande.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Image Preview Modal */}
      <Portal>
        <Modal
          visible={!!selectedImage}
          onDismiss={() => setSelectedImage(null)}
          contentContainerStyle={styles.modalContent}
        >
          <IconButton
            icon="close"
            size={24}
            onPress={() => setSelectedImage(null)}
            style={styles.closeButton}
          />
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
          )}
        </Modal>
      </Portal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backfillButton: {
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    color: '#1A1A2E',
  },
  paymentCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: '#1A1A2E',
  },
  dateText: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    color: '#4CAF50',
  },
  divider: {
    marginVertical: 12,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailLabel: {
    fontSize: 13,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
    minWidth: 100,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    color: '#333',
    flex: 1,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: '#FFF8E1',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    borderColor: COLORS.blue,
  },
  whatsappButton: {
    flex: 1,
    borderRadius: 8,
  },
  imagesContainer: {
    marginTop: 12,
  },
  imagesLabel: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    color: '#333',
    marginBottom: 8,
  },
  imagesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: COLORS.redShade,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFF',
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: '#1A1A2E',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 32,
  },
  modalContent: {
    backgroundColor: '#000',
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    height: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});

export default PaymentHistoryScreen;
