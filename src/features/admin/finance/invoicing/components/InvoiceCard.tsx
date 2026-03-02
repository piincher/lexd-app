import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Invoice, INVOICE_TYPE_LABELS, INVOICE_TYPE_COLORS } from '../types';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import { formatCurrency } from '@src/shared/lib/currency';

interface InvoiceCardProps {
  invoice: Invoice;
  onPress?: () => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onPress }) => {
  const theme = useTheme();
  const isOverdue = invoice.status === 'SENT' && new Date(invoice.dueDate) < new Date();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'GOODS':
        return 'package-variant';
      case 'SHIPPING':
        return 'truck-delivery';
      case 'CUSTOMS':
        return 'file-document';
      case 'STORAGE':
        return 'warehouse';
      case 'INSURANCE':
        return 'shield-check';
      default:
        return 'file-outline';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.invoiceNumberContainer}>
              <Text variant="titleMedium" style={styles.invoiceNumber}>
                {invoice.invoiceNumber}
              </Text>
              <InvoiceStatusBadge status={invoice.status} size="small" />
            </View>
            <Text
              variant="titleMedium"
              style={[styles.amount, { color: theme.colors.primary }]}
            >
              {formatCurrency(invoice.totalAmount, invoice.currency)}
            </Text>
          </View>

          {/* Customer Info */}
          {invoice.user && (
            <View style={styles.customerRow}>
              <Text variant="bodyMedium" style={styles.customerName}>
                {invoice.user.firstName} {invoice.user.lastName}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                {invoice.user.phoneNumber}
              </Text>
            </View>
          )}

          {/* Type & Date Row */}
          <View style={styles.footerRow}>
            <View style={styles.typeContainer}>
              <Text
                variant="bodySmall"
                style={[
                  styles.typeLabel,
                  { color: INVOICE_TYPE_COLORS[invoice.type] },
                ]}
              >
                {INVOICE_TYPE_LABELS[invoice.type]}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text
                variant="bodySmall"
                style={[
                  styles.dueDate,
                  isOverdue && { color: theme.colors.error },
                ]}
              >
                {isOverdue ? 'Échue le ' : 'Échéance: '}
                {format(new Date(invoice.dueDate), 'dd MMM yyyy', { locale: fr })}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
  },
  content: {
    paddingVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  invoiceNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  invoiceNumber: {
    fontWeight: '600',
  },
  amount: {
    fontWeight: '700',
  },
  customerRow: {
    marginBottom: 8,
  },
  customerName: {
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeLabel: {
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    fontStyle: 'italic',
  },
});
