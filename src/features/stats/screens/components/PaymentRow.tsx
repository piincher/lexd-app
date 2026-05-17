import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RecentPayment } from '../../types';
import { getStyles } from './PaymentRow.styles';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

const METHOD_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
  orange_money: { icon: 'phone-portrait-outline', color: '', bg: '' },
  wave: { icon: 'water-outline', color: '', bg: '' },
  cash: { icon: 'cash-outline', color: '', bg: '' },
  card: { icon: 'card-outline', color: '', bg: '' },
};

interface PaymentRowProps {
  payment: RecentPayment;
  index: number;
  isLast: boolean;
  colors: any;
}

export const PaymentRow: React.FC<PaymentRowProps> = ({ payment, index, isLast, colors }) => {
  const styles = getStyles(colors);
  const methodKey = payment.paymentMethod?.toLowerCase() || 'cash';
  const base = METHOD_CONFIG[methodKey] || METHOD_CONFIG.cash;
  const method = {
    icon: base.icon,
    color: colors.status[methodKey === 'orange_money' ? 'warning' : methodKey === 'wave' || methodKey === 'card' ? 'info' : 'success'],
    bg: colors.feedback[methodKey === 'orange_money' ? 'warningBg' : methodKey === 'wave' || methodKey === 'card' ? 'infoBg' : 'successBg'],
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify().damping(15)}
      style={[styles.row, !isLast && styles.rowBorder]}
    >
      <View style={[styles.methodIcon, { backgroundColor: method.bg }]}>
        <Ionicons name={method.icon as any} size={16} color={method.color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.customerName} numberOfLines={1}>
          {payment.customer?.name || 'Client'}
        </Text>
        <Text style={styles.date}>{formatDate(payment.paidAt)}</Text>
      </View>
      <Text style={styles.amount}>+{formatAmount(payment.amountFCFA)} F</Text>
    </Animated.View>
  );
};
