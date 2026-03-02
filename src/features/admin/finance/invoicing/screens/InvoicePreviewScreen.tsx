import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Button,
  useTheme,
  Divider,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Invoice } from '../types';
import { InvoiceStatusBadge } from '../components/InvoiceStatusBadge';
import { formatCurrency } from '@src/shared/lib/currency';
import { RootStackParamList } from '@src/navigations/type';

type InvoicePreviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AdminInvoicePreview'
>;

type InvoicePreviewScreenRouteProp = RouteProp<RootStackParamList, 'AdminInvoicePreview'>;

interface InvoicePreviewScreenProps {
  invoice?: Invoice;
}

export const InvoicePreviewScreen: React.FC<InvoicePreviewScreenProps> = () => {
  const theme = useTheme();
  const navigation = useNavigation<InvoicePreviewScreenNavigationProp>();
  const route = useRoute<InvoicePreviewScreenRouteProp>();
  const invoice = route.params?.invoice;

  if (!invoice) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Aperçu de la facture" />
        </Appbar.Header>
        <View style={styles.emptyContainer}>
          <Text>Aucune facture à prévisualiser</Text>
        </View>
      </View>
    );
  }

  const handleShare = async () => {
    // Implement PDF sharing
  };

  const handlePrint = async () => {
    // Implement printing
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Aperçu" />
        <Appbar.Action icon="share-variant" onPress={handleShare} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        {/* Invoice Page */}
        <Card style={[styles.invoicePage, { backgroundColor: '#fff' }]}>
          <Card.Content>
            {/* Header */}
            <View style={styles.invoiceHeader}>
              <View>
                <Text variant="headlineSmall" style={styles.companyName}>
                  ChinaLink Express
                </Text>
                <Text variant="bodySmall" style={styles.companyInfo}>
                  Votre partenaire logistique{'\n'}
                  de confiance
                </Text>
              </View>
              <View style={styles.invoiceTitle}>
                <Text variant="headlineMedium" style={styles.factureText}>
                  FACTURE
                </Text>
                <InvoiceStatusBadge status={invoice.status} />
              </View>
            </View>

            <Divider style={styles.headerDivider} />

            {/* Invoice Info Row */}
            <View style={styles.invoiceInfoRow}>
              <View>
                <Text variant="bodySmall" style={styles.label}>N° Facture</Text>
                <Text variant="bodyMedium" style={styles.value}>
                  {invoice.invoiceNumber}
                </Text>
              </View>
              <View>
                <Text variant="bodySmall" style={styles.label}>Date</Text>
                <Text variant="bodyMedium" style={styles.value}>
                  {format(new Date(invoice.createdAt), 'dd/MM/yyyy', { locale: fr })}
                </Text>
              </View>
              <View>
                <Text variant="bodySmall" style={styles.label}>Échéance</Text>
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.value,
                    new Date(invoice.dueDate) < new Date() && invoice.status !== 'PAID' &&
                      styles.overdue,
                  ]}
                >
                  {format(new Date(invoice.dueDate), 'dd/MM/yyyy', { locale: fr })}
                </Text>
              </View>
            </View>

            {/* Customer Info */}
            <View style={styles.customerSection}>
              <Text variant="bodySmall" style={styles.label}>FACTURER À</Text>
              {invoice.user ? (
                <>
                  <Text variant="bodyLarge" style={styles.customerName}>
                    {invoice.user.firstName} {invoice.user.lastName}
                  </Text>
                  <Text variant="bodyMedium" style={styles.customerDetail}>
                    {invoice.user.phoneNumber}
                  </Text>
                  {invoice.user.email && (
                    <Text variant="bodyMedium" style={styles.customerDetail}>
                      {invoice.user.email}
                    </Text>
                  )}
                </>
              ) : (
                <Text variant="bodyMedium">Client #{invoice.userId}</Text>
              )}
            </View>

            {/* Items Table */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.descriptionCol]}>Description</Text>
                <Text style={[styles.tableCell, styles.qtyCol]}>Qté</Text>
                <Text style={[styles.tableCell, styles.priceCol]}>Prix unit.</Text>
                <Text style={[styles.tableCell, styles.totalCol]}>Total</Text>
              </View>

              {/* Table Rows */}
              {invoice.items.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.descriptionCol]}>
                    {item.description}
                  </Text>
                  <Text style={[styles.tableCell, styles.qtyCol]}>{item.quantity}</Text>
                  <Text style={[styles.tableCell, styles.priceCol]}>
                    {formatCurrency(item.unitPrice, invoice.currency)}
                  </Text>
                  <Text style={[styles.tableCell, styles.totalCol]}>
                    {formatCurrency(item.total, invoice.currency)}
                  </Text>
                </View>
              ))}
            </View>

            <Divider style={styles.tableDivider} />

            {/* Totals */}
            <View style={styles.totalsSection}>
              <View style={styles.totalsRow}>
                <Text variant="bodyMedium">Sous-total</Text>
                <Text variant="bodyMedium">
                  {formatCurrency(invoice.subtotal, invoice.currency)}
                </Text>
              </View>
              {invoice.taxAmount > 0 && (
                <View style={styles.totalsRow}>
                  <Text variant="bodyMedium">TVA ({invoice.taxRate}%)</Text>
                  <Text variant="bodyMedium">
                    {formatCurrency(invoice.taxAmount, invoice.currency)}
                  </Text>
                </View>
              )}
              {invoice.discountAmount > 0 && (
                <View style={styles.totalsRow}>
                  <Text variant="bodyMedium">Remise</Text>
                  <Text variant="bodyMedium" style={{ color: '#F44336' }}>
                    -{formatCurrency(invoice.discountAmount, invoice.currency)}
                  </Text>
                </View>
              )}
              <Divider style={styles.totalDivider} />
              <View style={styles.grandTotalRow}>
                <Text variant="titleMedium">TOTAL</Text>
                <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: '700' }}>
                  {formatCurrency(invoice.totalAmount, invoice.currency)}
                </Text>
              </View>
            </View>

            {/* Notes */}
            {invoice.notes && (
              <View style={styles.notesSection}>
                <Text variant="bodySmall" style={styles.label}>NOTES</Text>
                <Text variant="bodyMedium">{invoice.notes}</Text>
              </View>
            )}

            {/* Terms */}
            {invoice.terms && (
              <View style={styles.termsSection}>
                <Text variant="bodySmall" style={styles.label}>CONDITIONS</Text>
                <Text variant="bodyMedium">{invoice.terms}</Text>
              </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
              <Text variant="bodySmall" style={styles.footerText}>
                Merci de votre confiance !
              </Text>
              <Text variant="bodySmall" style={styles.footerText}>
                ChinaLink Express - Votre partenaire logistique
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            icon="share-variant"
            onPress={handleShare}
            style={styles.actionButton}
          >
            Partager
          </Button>
          <Button
            mode="outlined"
            icon="printer"
            onPress={handlePrint}
            style={styles.actionButton}
          >
            Imprimer
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoicePage: {
    margin: 16,
    borderRadius: 4,
    elevation: 4,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  companyName: {
    fontWeight: '700',
    color: '#1a237e',
  },
  companyInfo: {
    color: '#666',
    marginTop: 4,
  },
  invoiceTitle: {
    alignItems: 'flex-end',
  },
  factureText: {
    fontWeight: '700',
    color: '#1a237e',
  },
  headerDivider: {
    marginBottom: 16,
    backgroundColor: '#1a237e',
    height: 2,
  },
  invoiceInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  label: {
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontWeight: '500',
  },
  overdue: {
    color: '#F44336',
  },
  customerSection: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  customerName: {
    fontWeight: '600',
    marginTop: 4,
  },
  customerDetail: {
    color: '#666',
  },
  table: {
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableHeader: {
    backgroundColor: '#1a237e',
    borderBottomWidth: 0,
  },
  tableCell: {
    paddingHorizontal: 4,
    fontSize: 12,
  },
  descriptionCol: {
    flex: 3,
  },
  qtyCol: {
    flex: 1,
    textAlign: 'center',
  },
  priceCol: {
    flex: 1.5,
    textAlign: 'right',
  },
  totalCol: {
    flex: 1.5,
    textAlign: 'right',
  },
  tableDivider: {
    marginVertical: 16,
  },
  totalsSection: {
    marginLeft: '40%',
    marginBottom: 24,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalDivider: {
    marginVertical: 12,
    height: 1,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notesSection: {
    marginBottom: 16,
  },
  termsSection: {
    marginBottom: 24,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
  },
});
