/**
 * PaymentInfoCard - Displays payment information details
 * SRP: Show payment ID, amount, method, status, date, reference, and notes
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface PaymentInfoCardProps {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  paidAt: string;
  referenceNumber?: string;
  notes?: string;
}

const PAYMENT_METHODS: Record<string, { label: string; icon: string; color: string }> = {
  CASH: { label: 'Cash', icon: 'cash', color: '#4CAF50' },
  BANK_TRANSFER: { label: 'Bank Transfer', icon: 'bank', color: '#2196F3' },
  MOBILE_MONEY: { label: 'Mobile Money', icon: 'cellphone', color: '#FF9800' },
  ORANGE_MONEY: { label: 'Orange Money', icon: 'cellphone', color: '#FF6600' },
  WAVE: { label: 'Wave', icon: 'wave', color: '#1E88E5' },
  CARD: { label: 'Card', icon: 'credit-card', color: '#9C27B0' },
};

const getStatusConfig = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'COMPLETED':
    case 'PAID':
    case 'SUCCESS':
      return { color: '#4CAF50', bgColor: '#E8F5E9', label: 'Completed' };
    case 'PENDING':
      return { color: '#FF9800', bgColor: '#FFF3E0', label: 'Pending' };
    case 'FAILED':
      return { color: '#F44336', bgColor: '#FFEBEE', label: 'Failed' };
    default:
      return { color: COLORS.grey, bgColor: '#F5F5F5', label: status || 'Unknown' };
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({
  paymentId,
  amount,
  paymentMethod,
  status,
  paidAt,
  referenceNumber,
  notes,
}) => {
  const methodConfig = PAYMENT_METHODS[paymentMethod] || { 
    label: paymentMethod, 
    icon: 'cash', 
    color: COLORS.grey 
  };
  const statusConfig = getStatusConfig(status);

  return (
    <Surface style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="receipt" size={24} color={COLORS.blue} />
        <Text style={styles.cardTitle}>Payment Information</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Amount Paid</Text>
        <Text style={styles.amountValue}>{amount?.toLocaleString() || 0} FCFA</Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Payment ID</Text>
        <Text style={styles.infoValue}>{paymentId || 'N/A'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Payment Method</Text>
        <View style={styles.methodContainer}>
          <MaterialCommunityIcons 
            name={methodConfig.icon as any} 
            size={18} 
            color={methodConfig.color} 
          />
          <Text style={[styles.methodText, { color: methodConfig.color }]}>
            {methodConfig.label}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Status</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Paid At</Text>
        <Text style={styles.infoValue}>{formatDate(paidAt)}</Text>
      </View>

      {referenceNumber && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Reference Number</Text>
          <Text style={styles.infoValue}>{referenceNumber}</Text>
        </View>
      )}

      {notes && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{notes}</Text>
          </View>
        </>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    backgroundColor: '#FFF',
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
    color: '#1A1A2E',
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    color: COLORS.success,
  },
  divider: {
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: '#1A1A2E',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
  notesContainer: {
    marginTop: 8,
  },
  notesLabel: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#1A1A2E',
    lineHeight: 20,
  },
});
