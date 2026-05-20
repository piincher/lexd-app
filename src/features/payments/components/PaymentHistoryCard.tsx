import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AppTheme } from '@src/constants/Theme';
import type { PaymentHistoryItem } from '../types';
import { getPaymentHistoryCardStyles } from './PaymentHistoryCard.styles';
import { PaymentHistoryCardHeader } from './PaymentHistoryCardHeader';
import { PaymentHistoryCardDetails } from './PaymentHistoryCardDetails';
import { PaymentHistoryCardReceiptActions } from './PaymentHistoryCardReceiptActions';

interface PaymentHistoryCardProps {
  payment: PaymentHistoryItem;
  onPress?: () => void;
  onViewReceipt?: () => void;
  onDownloadReceipt?: () => void;
  onShareReceipt?: () => void;
}

const METHOD_ICONS: Record<string, string> = {
  CASH: 'cash',
  BANK_TRANSFER: 'bank',
  MOBILE_MONEY: 'cellphone',
  ORANGE_MONEY: 'cellphone',
  WAVE: 'wave',
  CARD: 'credit-card',
  REWARD_POINTS: 'ticket-percent',
};

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: 'Payé',
  PENDING: 'En attente',
  PROCESSING: 'En cours',
  FAILED: 'Échoué',
  CANCELLED: 'Annulé',
  REFUNDED: 'Remboursé',
};

type ThemeColors = AppTheme['colors'];

const getMethodColor = (method: string, colors: ThemeColors) => {
  switch (method) {
    case 'CASH': return colors.status.success;
    case 'BANK_TRANSFER': return colors.status.info;
    case 'MOBILE_MONEY': return colors.primary.main;
    case 'ORANGE_MONEY': return colors.status.warning;
    case 'WAVE': return colors.status.info;
    case 'CARD': return colors.status.info;
    case 'REWARD_POINTS': return colors.status.success;
    default: return colors.primary.main;
  }
};

const getStatusColor = (status: string, colors: ThemeColors) => {
  switch (status) {
    case 'COMPLETED': return colors.status.success;
    case 'PENDING': return colors.status.warning;
    case 'PROCESSING': return colors.status.info;
    case 'FAILED': return colors.status.error;
    case 'CANCELLED': return colors.text.disabled;
    case 'REFUNDED': return colors.primary.main;
    default: return colors.status.warning;
  }
};

export const PaymentHistoryCard: React.FC<PaymentHistoryCardProps> = ({
  payment, onPress, onViewReceipt, onDownloadReceipt, onShareReceipt,
}) => {
  const { colors } = useAppTheme();
  const methodIcon = METHOD_ICONS[payment.paymentMethod] || METHOD_ICONS.CASH;
  const methodColor = getMethodColor(payment.paymentMethod, colors);
  const statusColor = getStatusColor(payment.status, colors);
  const statusLabel = STATUS_LABELS[payment.status] || STATUS_LABELS.PENDING;
  const hasReceipt = !!(payment.receiptUrl || payment.metadata?.receiptUrl);

  const styles = useMemo(() => getPaymentHistoryCardStyles(colors), [colors]);

  const CardContent = (
    <Card style={styles.card} mode="elevated">
      <View style={styles.content}>
        <PaymentHistoryCardHeader
          methodIcon={methodIcon}
          methodColor={methodColor}
          statusColor={statusColor}
          statusLabel={statusLabel}
          colors={colors}
        />
        <Text style={styles.amount}>{payment.amountFCFA.toLocaleString('fr-FR')} FCFA</Text>
        <PaymentHistoryCardDetails payment={payment} colors={colors} />
        {hasReceipt && (
          <PaymentHistoryCardReceiptActions
            colors={colors}
            onViewReceipt={onViewReceipt}
            onDownloadReceipt={onDownloadReceipt}
            onShareReceipt={onShareReceipt}
          />
        )}
      </View>
    </Card>
  );

  return onPress ? <TouchableOpacity onPress={onPress} activeOpacity={0.7}>{CardContent}</TouchableOpacity> : CardContent;
};
