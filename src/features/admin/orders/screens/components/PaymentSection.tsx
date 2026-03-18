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

export const PaymentSection: React.FC<PaymentSectionProps> = ({ order }) => {
  const navigation = useNavigation();
  
  const orderPrice = order?.calculatedTotal || parseFloat(order?.priceTotal) || 0;
  
  // Get payment status - check both paymentStatus field and paidAmount
  const paidAmount = order?.paidAmount || 0;
  const balanceDue = order?.balanceDue || Math.max(0, orderPrice - paidAmount);
  
  // Determine payment status
  let paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' = 'UNPAID';
  if (balanceDue <= 0 || paidAmount >= orderPrice) {
    paymentStatus = 'PAID';
  } else if (paidAmount > 0) {
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
      orderPrice,
    });
    navigation.navigate('RecordPaymentScreen' as never, {
      orderId: order?._id,
      orderCode: order?.code,
      clientName: order?.clientName,
      currentBalance: balanceDue,
      totalAmount: orderPrice,
    } as never);
  };

  const handleViewHistory = () => {
    navigation.navigate('OrderPaymentHistory' as never, {
      orderId: order?._id,
      orderCode: order?.code,
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
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Total Order Amount</Text>
          <Text style={styles.breakdownValue}>{orderPrice.toLocaleString()} FCFA</Text>
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
