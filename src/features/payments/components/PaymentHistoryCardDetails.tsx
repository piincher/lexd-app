import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import type { PaymentHistoryItem } from '../types';
import { getPaymentHistoryCardStyles } from './PaymentHistoryCard.styles';

interface PaymentHistoryCardDetailsProps {
  payment: PaymentHistoryItem;
  colors: any;
}

export const PaymentHistoryCardDetails: React.FC<PaymentHistoryCardDetailsProps> = ({ payment, colors }) => {
  const styles = getPaymentHistoryCardStyles(colors);
  return (
    <View style={styles.details}>
      {payment.goodsIds?.[0] && (
        <View style={styles.row}>
          <MaterialCommunityIcons name="package-variant" size={14} color={colors.text.secondary} />
          <Text style={styles.label}>Commande:</Text>
          <Text style={styles.value}>{payment.goodsIds[0]}</Text>
        </View>
      )}
      {payment.orderCode && (
        <View style={styles.row}>
          <MaterialCommunityIcons name="file-document" size={14} color={colors.text.secondary} />
          <Text style={styles.label}>Commande:</Text>
          <Text style={styles.value}>{payment.orderCode}</Text>
        </View>
      )}
      <View style={styles.row}>
        <MaterialCommunityIcons name="calendar" size={14} color={colors.text.secondary} />
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>
          {format(new Date(payment.paidAt || payment.createdAt), 'dd MMMM yyyy', { locale: fr })}
        </Text>
      </View>
      {payment.referenceNumber && (
        <View style={styles.row}>
          <MaterialCommunityIcons name="identifier" size={14} color={colors.text.secondary} />
          <Text style={styles.label}>Référence:</Text>
          <Text style={styles.value}>{payment.referenceNumber}</Text>
        </View>
      )}
      {payment.receiptNumber && (
        <View style={styles.row}>
          <MaterialCommunityIcons name="receipt" size={14} color={colors.text.secondary} />
          <Text style={styles.label}>N° Reçu:</Text>
          <Text style={styles.value}>{payment.receiptNumber}</Text>
        </View>
      )}
      {payment.transactionReference && (
        <View style={styles.row}>
          <MaterialCommunityIcons name="identifier" size={14} color={colors.text.secondary} />
          <Text style={styles.label}>Référence:</Text>
          <Text style={styles.value}>{payment.transactionReference}</Text>
        </View>
      )}
    </View>
  );
};
