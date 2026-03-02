import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Button,
  useTheme,
  Divider,
  List,
  Portal,
  Dialog,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  useGetInvoice,
  useSendInvoice,
  useCancelInvoice,
  useMarkInvoicePaid,
  useDownloadInvoicePdf,
} from '../hooks/useInvoices';
import { InvoiceStatusBadge } from '../components/InvoiceStatusBadge';
import { InvoiceItemList } from '../components/InvoiceItemList';
import { formatCurrency } from '@src/shared/lib/currency';
import { RootStackParamList } from '@src/navigations/type';

type InvoiceDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AdminInvoiceDetail'
>;

type InvoiceDetailScreenRouteProp = RouteProp<RootStackParamList, 'AdminInvoiceDetail'>;

export const InvoiceDetailScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<InvoiceDetailScreenNavigationProp>();
  const route = useRoute<InvoiceDetailScreenRouteProp>();
  const { invoiceId } = route.params;

  const [showPayDialog, setShowPayDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [paymentReference, setPaymentReference] = useState('');

  const { data: invoice, isLoading } = useGetInvoice(invoiceId);
  const sendMutation = useSendInvoice();
  const cancelMutation = useCancelInvoice();
  const payMutation = useMarkInvoicePaid();
  const downloadMutation = useDownloadInvoicePdf();

  const handleSend = async () => {
    try {
      await sendMutation.mutateAsync(invoiceId);
      showMessage({
        message: 'Facture envoyée avec succès',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Erreur lors de l\'envoi de la facture',
        type: 'danger',
      });
    }
  };

  const handleCancel = async () => {
    try {
      await cancelMutation.mutateAsync({ id: invoiceId, reason: cancelReason });
      setShowCancelDialog(false);
      showMessage({
        message: 'Facture annulée',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Erreur lors de l\'annulation',
        type: 'danger',
      });
    }
  };

  const handleMarkPaid = async () => {
    try {
      await payMutation.mutateAsync({
        id: invoiceId,
        data: {
          paidAmount: Number(paidAmount),
          paymentMethod,
          paymentReference: paymentReference || undefined,
        },
      });
      setShowPayDialog(false);
      showMessage({
        message: 'Paiement enregistré',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Erreur lors de l\'enregistrement du paiement',
        type: 'danger',
      });
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const blob = await downloadMutation.mutateAsync(invoiceId);
      // Handle PDF download/share
      showMessage({
        message: 'PDF téléchargé',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Erreur lors du téléchargement',
        type: 'danger',
      });
    }
  };

  const handleEdit = () => {
    navigation.navigate('AdminEditInvoice', { invoiceId });
  };

  if (isLoading || !invoice) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isDraft = invoice.status === 'DRAFT';
  const isSent = invoice.status === 'SENT';
  const isPaid = invoice.status === 'PAID';
  const isOverdue = invoice.status === 'OVERDUE';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={invoice.invoiceNumber} />
        <Appbar.Action icon="file-pdf-box" onPress={handleDownloadPdf} />
        {isDraft && <Appbar.Action icon="pencil" onPress={handleEdit} />}
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        {/* Header Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerRow}>
              <View>
                <Text variant="titleLarge" style={styles.invoiceNumber}>
                  {invoice.invoiceNumber}
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                  Créée le {format(new Date(invoice.createdAt), 'dd MMM yyyy', { locale: fr })}
                </Text>
              </View>
              <InvoiceStatusBadge status={invoice.status} />
            </View>

            <Divider style={styles.divider} />

            {/* Customer Info */}
            {invoice.user && (
              <View style={styles.section}>
                <Text variant="titleSmall" style={styles.sectionTitle}>
                  Client
                </Text>
                <Text variant="bodyLarge">
                  {invoice.user.firstName} {invoice.user.lastName}
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                  {invoice.user.phoneNumber}
                </Text>
                {invoice.user.email && (
                  <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                    {invoice.user.email}
                  </Text>
                )}
              </View>
            )}

            <Divider style={styles.divider} />

            {/* Due Date */}
            <View style={styles.dueDateRow}>
              <Text variant="bodyMedium">Date d'échéance:</Text>
              <Text
                variant="bodyMedium"
                style={[
                  styles.dueDate,
                  (isOverdue || (isSent && new Date(invoice.dueDate) < new Date())) &&
                    styles.overdue,
                ]}
              >
                {format(new Date(invoice.dueDate), 'dd MMM yyyy', { locale: fr })}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Items Card */}
        <Card style={styles.card}>
          <Card.Content>
            <InvoiceItemList items={invoice.items} onChange={() => {}} editable={false} currency={invoice.currency} />
          </Card.Content>
        </Card>

        {/* Summary Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Sous-total</Text>
              <Text variant="bodyMedium">{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
            </View>
            {invoice.taxAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text variant="bodyMedium">TVA ({invoice.taxRate}%)</Text>
                <Text variant="bodyMedium">{formatCurrency(invoice.taxAmount, invoice.currency)}</Text>
              </View>
            )}
            {invoice.discountAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text variant="bodyMedium">Remise</Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.error }}>
                  -{formatCurrency(invoice.discountAmount, invoice.currency)}
                </Text>
              </View>
            )}
            <Divider style={styles.summaryDivider} />
            <View style={styles.totalRow}>
              <Text variant="titleMedium">Total</Text>
              <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </Text>
            </View>

            {isPaid && (
              <>
                <Divider style={styles.summaryDivider} />
                <View style={styles.paidRow}>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    Payé le {invoice.paidAt && format(new Date(invoice.paidAt), 'dd MMM yyyy', { locale: fr })}
                  </Text>
                  <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                    {formatCurrency(invoice.paidAmount, invoice.currency)}
                  </Text>
                </View>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Notes */}
        {invoice.notes && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.sectionTitle}>
                Notes
              </Text>
              <Text variant="bodyMedium">{invoice.notes}</Text>
            </Card.Content>
          </Card>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {isDraft && (
            <>
              <Button
                mode="contained"
                onPress={handleSend}
                icon="send"
                loading={sendMutation.isPending}
                style={styles.actionButton}
              >
                Envoyer la facture
              </Button>
              <Button
                mode="outlined"
                onPress={() => setShowCancelDialog(true)}
                icon="close"
                textColor={theme.colors.error}
                style={styles.actionButton}
              >
                Annuler
              </Button>
            </>
          )}

          {(isSent || isOverdue) && (
            <Button
              mode="contained"
              onPress={() => {
                setPaidAmount(String(invoice.totalAmount - invoice.paidAmount));
                setShowPayDialog(true);
              }}
              icon="cash-check"
              style={styles.actionButton}
            >
              Marquer comme payée
            </Button>
          )}
        </View>
      </ScrollView>

      {/* Pay Dialog */}
      <Portal>
        <Dialog visible={showPayDialog} onDismiss={() => setShowPayDialog(false)}>
          <Dialog.Title>Enregistrer le paiement</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Montant payé"
              value={paidAmount}
              onChangeText={setPaidAmount}
              keyboardType="numeric"
              style={styles.dialogInput}
            />
            <TextInput
              label="Méthode de paiement"
              value={paymentMethod}
              onChangeText={setPaymentMethod}
              style={styles.dialogInput}
            />
            <TextInput
              label="Référence (optionnel)"
              value={paymentReference}
              onChangeText={setPaymentReference}
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowPayDialog(false)}>Annuler</Button>
            <Button onPress={handleMarkPaid} loading={payMutation.isPending}>
              Confirmer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Cancel Dialog */}
      <Portal>
        <Dialog visible={showCancelDialog} onDismiss={() => setShowCancelDialog(false)}>
          <Dialog.Title>Annuler la facture</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={styles.dialogText}>
              Êtes-vous sûr de vouloir annuler cette facture ? Cette action est irréversible.
            </Text>
            <TextInput
              label="Motif (optionnel)"
              value={cancelReason}
              onChangeText={setCancelReason}
              multiline
              numberOfLines={3}
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowCancelDialog(false)}>Retour</Button>
            <Button
              onPress={handleCancel}
              textColor={theme.colors.error}
              loading={cancelMutation.isPending}
            >
              Confirmer l'annulation
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  invoiceNumber: {
    fontWeight: '700',
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  dueDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontWeight: '600',
  },
  overdue: {
    color: '#F44336',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryDivider: {
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
  },
  dialogInput: {
    marginTop: 8,
  },
  dialogText: {
    marginBottom: 16,
  },
});
