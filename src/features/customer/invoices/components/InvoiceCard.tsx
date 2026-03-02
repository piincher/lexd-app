import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme, Chip } from 'react-native-paper';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Invoice, INVOICE_STATUS_LABELS, INVOICE_STATUS_COLORS } from '../types';
import { formatCurrency } from '@src/shared/lib/currency';

interface InvoiceCardProps {
  invoice: Invoice;
  onPress?: () => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onPress }) => {
  const theme = useTheme();
  const isOverdue = invoice.status === 'SENT' && new Date(invoice.dueDate) < new Date();
  const status = isOverdue ? 'OVERDUE' : invoice.status;

  const statusColor = INVOICE_STATUS_COLORS[status];
  const statusLabel = INVOICE_STATUS_LABELS[status];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text variant="titleMedium" style={styles.invoiceNumber}>
              {invoice.invoiceNumber}
            </Text>
            <Chip
              mode="flat"
              textStyle={[styles.statusText, { color: statusColor }]}
              style={[styles.statusChip, { backgroundColor: `${statusColor}20` }]}
            >
              {statusLabel}
            </Chip>
          </View>

          {/* Amount */}
          <View style={styles.amountRow}>
            <Text variant="headlineSmall" style={[styles.amount, { color: theme.colors.primary }]}>
              {formatCurrency(invoice.totalAmount, invoice.currency)}
            </Text>
          </View>

          {/* Due Date */}
          <View style={styles.footerRow}>
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
  invoiceNumber: {
    fontWeight: '600',
    flex: 1,
  },
  statusChip: {
    borderRadius: 8,
    height: 28,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  amountRow: {
    marginBottom: 8,
  },
  amount: {
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dueDate: {
    fontStyle: 'italic',
    color: '#666',
  },
});
