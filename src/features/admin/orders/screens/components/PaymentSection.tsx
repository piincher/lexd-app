import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { styles } from './PaymentSection.styles';

interface PaymentSectionProps {
  order: any;
}

// Parsing helpers for price and CBM values
const parsePrice = (value: any): number => {
  if (value === null || value === undefined || value === '') return 0;
  const num = parseFloat(String(value));
  return isNaN(num) ? 0 : num;
};

const parseCBM = (value: any): string => {
  if (value === null || value === undefined || value === '' || value === '0') return '';
  return String(value);
};

export const PaymentSection: React.FC<PaymentSectionProps> = ({ order }) => {
  const navigation = useNavigation();

  // Parse prices safely
  const isAir = order?.shippingMode === 'air';
  const unitPrice = parsePrice(order?.unitPrice);
  const totalPrice = parsePrice(order?.calculatedTotal) ||
                     parsePrice(order?.priceTotal) ||
                     parsePrice(order?.totalCost);
  const cbm = parseCBM(order?.packageCBM) || parseCBM(order?.calculatedCBM);

  // Get payment info
  const paidAmount = parsePrice(order?.paidAmount);
  const balanceDue = parsePrice(order?.balanceDue) || Math.max(0, totalPrice - paidAmount);

  // Determine payment status
  // When totalPrice is 0 (no price set), treat as UNPAID
  let paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' = 'UNPAID';
  if (totalPrice > 0 && (balanceDue <= 0 || paidAmount >= totalPrice)) {
    paymentStatus = 'PAID';
  } else if (paidAmount > 0 && totalPrice > 0) {
    paymentStatus = 'PARTIAL';
  }

  const getStatusConfig = () => {
    switch (paymentStatus) {
      case 'PAID':
        return {
          color: '#4CAF50',
          bgColor: '#E8F5E9',
          icon: 'check-circle',
          label: 'Paid',
        };
      case 'PARTIAL':
        return {
          color: '#FF9800',
          bgColor: '#FFF3E0',
          icon: 'clock-outline',
          label: 'Partial Payment',
        };
      default:
        return {
          color: '#F44336',
          bgColor: '#FFEBEE',
          icon: 'alert-circle',
          label: 'Unpaid',
        };
    }
  };

  const statusConfig = getStatusConfig();

  const handleRecordPayment = () => {
    console.log('[PaymentSection] Navigating to RecordPaymentScreen', {
      orderId: order?._id,
      orderCode: order?.code,
      balanceDue,
      totalPrice,
    });
    navigation.navigate('RecordPaymentScreen' as never, {
      orderId: order?._id,
      orderCode: order?.code,
      clientName: order?.clientName,
      clientPhone: order?.clientPhone,
      currentBalance: balanceDue,
      totalAmount: totalPrice,
    } as never);
  };

  const handleViewHistory = () => {
    navigation.navigate('OrderPaymentHistory' as never, {
      orderId: order?._id,
      orderCode: order?.code,
      clientName: order?.clientName,
      clientPhone: order?.clientPhone,
    } as never);
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="credit-card" size={22} color={COLORS.blue} />
        <Text style={styles.title}>Payment Details</Text>
      </View>

      {/* Payment Status Card */}
      <View style={[styles.statusCard, { backgroundColor: statusConfig.bgColor }]}>
        <View style={styles.statusIconContainer}>
          <MaterialCommunityIcons
            name={statusConfig.icon as any}
            size={32}
            color={statusConfig.color}
          />
        </View>
        <View style={styles.statusContent}>
          <Text style={[styles.statusLabel, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
          {paymentStatus === 'PAID' ? (
            <Text style={styles.statusAmount}>
              Fully Paid
            </Text>
          ) : (
            <Text style={styles.statusAmount}>
              {balanceDue.toLocaleString()} FCFA due
            </Text>
          )}
        </View>
      </View>

      {/* Payment Breakdown */}
      <View style={styles.breakdown}>
        {/* Pricing Details */}
        {isAir ? (
          order?.packageWeight ? (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Poids</Text>
              <Text style={styles.breakdownValue}>{order.packageWeight} kg</Text>
            </View>
          ) : null
        ) : (
          cbm ? (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Volume (CBM)</Text>
              <Text style={styles.breakdownValue}>{cbm} m³</Text>
            </View>
          ) : null
        )}
        {unitPrice > 0 && (
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Prix unitaire</Text>
            <Text style={styles.breakdownValue}>
              {unitPrice.toLocaleString()} FCFA/{isAir ? 'kg' : 'm³'}
            </Text>
          </View>
        )}
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Prix total</Text>
          <Text style={styles.breakdownValue}>
            {totalPrice > 0 ? `${totalPrice.toLocaleString()} FCFA` : 'Non défini'}
          </Text>
        </View>

        <Divider style={{ marginVertical: 8 }} />

        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Total Order Amount</Text>
          <Text style={styles.breakdownValue}>
            {totalPrice > 0 ? `${totalPrice.toLocaleString()} FCFA` : 'Non défini'}
          </Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Amount Paid</Text>
          <Text style={[styles.breakdownValue, { color: '#4CAF50' }]}>
            {paidAmount.toLocaleString()} FCFA
          </Text>
        </View>
        {paymentStatus !== 'PAID' && (
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Balance Due</Text>
            <Text style={[styles.breakdownValue, { color: '#F44336' }]}>
              {balanceDue.toLocaleString()} FCFA
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {paymentStatus !== 'PAID' && (
          <Button
            mode="contained"
            onPress={handleRecordPayment}
            style={styles.payButton}
            buttonColor={COLORS.blue}
            icon="cash-plus"
            labelStyle={styles.buttonLabel}
          >
            Record Payment
          </Button>
        )}

        <Button
          mode="outlined"
          onPress={handleViewHistory}
          style={styles.historyButton}
          textColor={COLORS.blue}
          icon="history"
          labelStyle={styles.buttonLabel}
        >
          View Payment History
        </Button>
      </View>

      {/* Admin Note */}
      <View style={styles.adminNote}>
        <MaterialCommunityIcons name="information" size={16} color={COLORS.grey} />
        <Text style={styles.adminNoteText}>
          Record payments made by clients via cash, bank transfer, or mobile money.
          The client will receive a notification of the recorded payment.
        </Text>
      </View>
    </Surface>
  );
};

export default PaymentSection;
