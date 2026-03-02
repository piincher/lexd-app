import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Share } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Button,
  useTheme,
  Divider,
  Portal,
  Dialog,
  RadioButton,
  ActivityIndicator,
} from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  useGetInvoice,
  usePayInvoice,
  useDownloadInvoicePdf,
  useShareInvoice,
} from '../hooks/useInvoices';
import { Invoice, INVOICE_STATUS_LABELS, INVOICE_TYPE_LABELS } from '../types';
import { formatCurrency } from '@src/shared/lib/currency';
import { RootStackParamList } from '@src/navigations/type';

type InvoiceDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InvoiceDetail'
>;

type InvoiceDetailScreenRouteProp = RouteProp<RootStackParamList, 'InvoiceDetail'>;

const PAYMENT_METHODS = [
  { value: 'ORANGE_MONEY', label: 'Orange Money' },
  { value: 'MOOV_MONEY', label: 'Moov Money' },
  { value: 'BANK_TRANSFER', label: 'Virement bancaire' },
  { value: 'CASH', label: 'Espèces' },
];

export const InvoiceDetailScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<InvoiceDetailScreenNavigationProp>();
  const route = useRoute<InvoiceDetailScreenRouteProp>();
  const { invoiceId } = route.params;

  const [showPayDialog, setShowPayDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('ORANGE_MONEY');

  const { data: invoice, isLoading } = useGetInvoice(invoiceId);
  const payMutation = usePayInvoice();
  const downloadMutation = useDownloadInvoicePdf();
  const shareMutation = useShareInvoice();

  const handlePay = async () => {
    try {
      await payMutation.mutateAsync({
        id: invoiceId,
        paymentData: {
          paymentMethod: selectedPaymentMethod,
        },
      });
      setShowPayDialog(false);
      showMessage({
        message: 'Paiement effectué avec succès',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Erreur lors du paiement',
        type: 'danger',
      });
    }
  };

  const handleDownloadPdf = async () => {
    try {
      await downloadMutation.mutateAsync(invoiceId);
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

  const handleShare = async () => {
    try {
      const result = await shareMutation.mutateAsync(invoiceId);
      await Share.share({
        message: `Voici ma facture ${invoice?.invoiceNumber}: ${result.shareUrl}`,
        title: `Facture ${invoice?.invoiceNumber}`,
      });
    } catch (error) {
      // User cancelled share
    }
  };

  if (isLoading || !invoice) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isPayable = invoice.status === 'SENT' || invoice.status === 'OVERDUE';
  const isPaid = invoice.status === 'PAID';
  const isOverdue = new Date(invoice.dueDate) < new Date() && !isPaid;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={invoice.invoiceNumber} />
        <Appbar.Action icon="share-variant" onPress={handleShare} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        {/* Status Card */}
        <Card style={[styles.card, { borderLeftWidth: 4, borderLeftColor: isPaid ? '#4CAF50' : isOverdue ? '#F44336' : '#2196F3' }]}>
          <Card.Content>
            <View style={styles.statusRow}>
              <View>
                <Text variant="titleMedium" style={styles.statusLabel}>
                  Statut
                </Text>
                <Text
                  variant="titleLarge"
                  style={[
                    styles.statusValue,
                    { color: isPaid ? '#4CAF50' : isOverdue ? '#F44336' : '#2196F3' },
                  ]}
                >
                  {INVOICE_STATUS_LABELS[invoice.status]}
                </Text>
              </View>
              <Text variant="headlineSmall" style={[styles.amount, { color: theme.colors.primary }]}>
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </Text>
            </View>
            {isOverdue && (
              <Text variant="bodySmall" style={{ color: theme.colors.error, marginTop: 8 }}>
                Cette facture est en retard de paiement
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Details Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Détails de la facture
            </Text>
            
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.detailLabel}>Type</Text>
              <Text variant="bodyMedium" style={styles.detailValue}>
                {INVOICE_TYPE_LABELS[invoice.type]}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.detailLabel}>Date d'émission</Text>
              <Text variant="bodyMedium" style={styles.detailValue}>
                {format(new Date(invoice.createdAt), 'dd MMM yyyy', { locale: fr })}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.detailLabel}>Date d'échéance</Text>
              <Text
                variant="bodyMedium"
                style={[
                  styles.detailValue,
                  isOverdue && { color: theme.colors.error },
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
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Articles
            </Text>
            {invoice.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.itemDescription}>
                  <Text variant="bodyMedium" numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                    {item.quantity} x {formatCurrency(item.unitPrice, invoice.currency)}
                  </Text>
                </View>
                <Text variant="bodyMedium" style={styles.itemTotal}>
                  {formatCurrency(item.total, invoice.currency)}
                </Text>
              </View>
            ))}
            
            <Divider style={styles.divider} />
            
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
            <Divider style={styles.divider} />
            <View style={styles.totalRow}>
              <Text variant="titleMedium">Total</Text>
              <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Payment Info (if paid) */}
        {isPaid && invoice.paidAt && (
          <Card style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Paiement effectué
              </Text>
              <View style={styles.detailRow}>
                <Text variant="bodyMedium" style={styles.detailLabel}>Date</Text>
                <Text variant="bodyMedium" style={styles.detailValue}>
                  {format(new Date(invoice.paidAt), 'dd MMM yyyy', { locale: fr })}
                </Text>
              </View>
              {invoice.paymentMethod && (
                <View style={styles.detailRow}>
                  <Text variant="bodyMedium" style={styles.detailLabel}>Méthode</Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    {PAYMENT_METHODS.find(m => m.value === invoice.paymentMethod)?.label || invoice.paymentMethod}
                  </Text>
                </View>
              )}
              <View style={styles.detailRow}>
                <Text variant="bodyMedium" style={styles.detailLabel}>Montant payé</Text>
                <Text variant="bodyMedium" style={styles.detailValue}>
                  {formatCurrency(invoice.paidAmount, invoice.currency)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Notes */}
        {invoice.notes && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Notes
              </Text>
              <Text variant="bodyMedium">{invoice.notes}</Text>
            </Card.Content>
          </Card>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {isPayable && (
            <Button
              mode="contained"
              onPress={() => setShowPayDialog(true)}
              icon="cash-check"
              style={styles.payButton}
            >
              Payer maintenant
            </Button>
          )}
          <Button
            mode="outlined"
            onPress={handleDownloadPdf}
            icon="file-pdf-box"
            loading={downloadMutation.isPending}
            style={styles.actionButton}
          >
            Télécharger PDF
          </Button>
        </View>
      </ScrollView>

      {/* Payment Method Dialog */}
      <Portal>
        <Dialog visible={showPayDialog} onDismiss={() => setShowPayDialog(false)}>
          <Dialog.Title>Choisir un mode de paiement</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={setSelectedPaymentMethod}
              value={selectedPaymentMethod}
            >
              {PAYMENT_METHODS.map((method) => (
                <RadioButton.Item
                  key={method.value}
                  label={method.label}
                  value={method.value}
                />
              ))}
            </RadioButton.Group>
            <View style={styles.paymentSummary}>
              <Text variant="bodyMedium">Montant à payer:</Text>
              <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                {formatCurrency(invoice.totalAmount - invoice.paidAmount, invoice.currency)}
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowPayDialog(false)}>Annuler</Button>
            <Button onPress={handlePay} loading={payMutation.isPending}>
              Payer
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    color: '#666',
    marginBottom: 4,
  },
  statusValue: {
    fontWeight: '700',
  },
  amount: {
    fontWeight: '700',
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    color: '#666',
  },
  detailValue: {
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemDescription: {
    flex: 1,
    paddingRight: 16,
  },
  itemTotal: {
    fontWeight: '600',
  },
  divider: {
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  payButton: {
    borderRadius: 8,
  },
  actionButton: {
    borderRadius: 8,
  },
  paymentSummary: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
});
