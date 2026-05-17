import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './PaymentSection.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { PaymentStatusCard } from './PaymentStatusCard';
import { PaymentBreakdown } from './PaymentBreakdown';
import { PaymentActions } from './PaymentActions';
import { PaymentAdminNote } from './PaymentAdminNote';

interface PaymentSectionProps {
  order: any;
}

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
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const isAir = order?.shippingMode === 'air';
  const unitPrice = parsePrice(order?.unitPrice);
  const totalPrice =
    parsePrice(order?.calculatedTotal) ||
    parsePrice(order?.priceTotal) ||
    parsePrice(order?.totalCost);
  const cbm = parseCBM(order?.packageCBM) || parseCBM(order?.calculatedCBM);

  const paidAmount = parsePrice(order?.paidAmount);
  const balanceDue = parsePrice(order?.balanceDue) || Math.max(0, totalPrice - paidAmount);

  let paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' = 'UNPAID';
  if (totalPrice > 0 && (balanceDue <= 0 || paidAmount >= totalPrice)) {
    paymentStatus = 'PAID';
  } else if (paidAmount > 0 && totalPrice > 0) {
    paymentStatus = 'PARTIAL';
  }

  const statusConfig =
    paymentStatus === 'PAID'
      ? { color: colors.status.success, bgColor: colors.background.paper, icon: 'check-circle', label: 'Paid' }
      : paymentStatus === 'PARTIAL'
      ? { color: colors.status.warning, bgColor: colors.background.paper, icon: 'clock-outline', label: 'Partial Payment' }
      : { color: colors.status.error, bgColor: colors.background.paper, icon: 'alert-circle', label: 'Unpaid' };

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
        <MaterialCommunityIcons name="credit-card" size={22} color={colors.primary.main} />
        <Text style={styles.title}>Payment Details</Text>
      </View>

      <PaymentStatusCard
        statusConfig={statusConfig}
        paymentStatus={paymentStatus}
        balanceDue={balanceDue}
        styles={styles}
      />

      <PaymentBreakdown
        isAir={isAir}
        packageWeight={order?.packageWeight}
        cbm={cbm}
        unitPrice={unitPrice}
        totalPrice={totalPrice}
        paidAmount={paidAmount}
        balanceDue={balanceDue}
        paymentStatus={paymentStatus}
        colors={colors}
        styles={styles}
      />

      <PaymentActions
        paymentStatus={paymentStatus}
        primaryColor={colors.primary.main}
        onRecordPayment={handleRecordPayment}
        onViewHistory={handleViewHistory}
        styles={styles}
      />

      <PaymentAdminNote noteColor={colors.text.secondary} styles={styles} />
    </Surface>
  );
};

export default PaymentSection;
