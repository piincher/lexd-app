/**
 * PaymentHistoryScreen - Shows payment history for a specific order
 * For admin manual payment recording system
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, Divider, ActivityIndicator, IconButton, Portal, Modal } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { getPaymentHistory } from '@src/api/order';
import { formatDate } from '@src/utils/formatDate';

const PAYMENT_METHOD_ICONS: Record<string, string> = {
  CASH: 'cash',
  BANK_TRANSFER: 'bank',
  MOBILE_MONEY: 'cellphone',
  ORANGE_MONEY: 'cellphone',
  WAVE: 'wave',
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH: 'Cash',
  BANK_TRANSFER: 'Bank Transfer',
  MOBILE_MONEY: 'Mobile Money',
  ORANGE_MONEY: 'Orange Money',
  WAVE: 'Wave',
};

const PaymentHistoryScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderId, orderCode } = route.params as { orderId: string; orderCode: string };
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { data: payments, isLoading, error, refetch } = useQuery({
    queryKey: ['paymentHistory', orderId],
    queryFn: () => getPaymentHistory(orderId),
    enabled: !!orderId,
  });

  const renderPaymentCard = (payment: any, index: number) => (
    <Surface key={payment._id || index} style={styles.paymentCard}>
      {/* Header */}
      <View style={styles.paymentHeader}>
        <View style={styles.methodContainer}>
          <View style={styles.methodIcon}>
            <MaterialCommunityIcons 
              name={PAYMENT_METHOD_ICONS[payment.paymentMethod] || 'cash'} 
              size={20} 
              color={COLORS.blue} 
            />
          </View>
          <View>
            <Text style={styles.methodText}>
              {PAYMENT_METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod}
            </Text>
            <Text style={styles.dateText}>
              {formatDate(payment.recordedAt)}
            </Text>
          </View>
        </View>
        <Text style={styles.amountText}>
          {payment.amount.toLocaleString()} FCFA
        </Text>
      </View>

      <Divider style={styles.divider} />

      {/* Details */}
      <View style={styles.detailsContainer}>
        {payment.referenceNumber && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="identifier" size={16} color={COLORS.grey} />
            <Text style={styles.detailLabel}>Reference:</Text>
            <Text style={styles.detailValue}>{payment.referenceNumber}</Text>
          </View>
        )}
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="account" size={16} color={COLORS.grey} />
          <Text style={styles.detailLabel}>Recorded by:</Text>
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

      {/* Proof Images */}
      {payment.proofImages && payment.proofImages.length > 0 && (
        <View style={styles.imagesContainer}>
          <Text style={styles.imagesLabel}>Payment Proof:</Text>
          <View style={styles.imagesRow}>
            {payment.proofImages.map((url: string, imgIndex: number) => (
              <TouchableOpacity 
                key={imgIndex} 
                onPress={() => setSelectedImage(url)}
              >
                <Image source={{ uri: url }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </Surface>
  );

  if (isLoading) {
    return (
      <Screen header={{ title: 'Payment History' }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={styles.loadingText}>Loading payments...</Text>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen header={{ title: 'Payment History' }}>
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={48} color={COLORS.redShade} />
          <Text style={styles.errorTitle}>Failed to Load</Text>
          <Text style={styles.errorText}>{error.message}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={{ title: 'Payment History', subtitle: orderCode }}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {payments && payments.length > 0 ? (
          <>
            <Text style={styles.summaryText}>
              {payments.length} payment{payments.length > 1 ? 's' : ''} recorded
            </Text>
            {payments.map((payment: any, index: number) => renderPaymentCard(payment, index))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cash-remove" size={64} color={COLORS.lightGray} />
            <Text style={styles.emptyTitle}>No Payments Yet</Text>
            <Text style={styles.emptyText}>
              No payments have been recorded for this order yet.
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
  summaryText: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
    marginBottom: 12,
  },
  paymentCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
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
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    color: '#333',
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
