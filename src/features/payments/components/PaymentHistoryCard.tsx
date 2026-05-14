import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { Fonts } from '@src/constants/Fonts';
import type { PaymentHistoryItem } from '../types';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
};

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: 'Complété',
  PENDING: 'En attente',
  PROCESSING: 'En cours',
  FAILED: 'Échoué',
  CANCELLED: 'Annulé',
  REFUNDED: 'Remboursé',
};

const getMethodColor = (method: string, colors: any) => {
  switch (method) {
    case 'CASH': return colors.status.success;
    case 'BANK_TRANSFER': return colors.status.info;
    case 'MOBILE_MONEY': return colors.primary.main;
    case 'ORANGE_MONEY': return colors.status.warning;
    case 'WAVE': return colors.status.info;
    case 'CARD': return colors.status.info;
    default: return colors.primary.main;
  }
};

const getStatusColor = (status: string, colors: any) => {
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

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: { borderRadius: 12, elevation: 2, backgroundColor: colors.background.card, marginBottom: 12 },
        content: { padding: 16 },
        header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
        iconContainer: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
        chip: { height: 28, borderRadius: 6 },
        amount: { fontFamily: Fonts.bold, fontSize: 18, fontWeight: '700', color: colors.text.primary, marginBottom: 12 },
        details: { gap: 8, marginBottom: 16 },
        row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
        label: { fontFamily: Fonts.medium, fontSize: 13, color: colors.text.secondary, minWidth: 90 },
        value: { fontFamily: Fonts.medium, fontSize: 13, color: colors.text.primary, flex: 1 },
        actions: { gap: 8, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12 },
        actionBtn: { alignSelf: 'flex-start' },
        secondaryActions: { flexDirection: 'row', gap: 8 },
        outlinedBtn: { flex: 1, borderColor: colors.status.success },
      }),
    [colors]
  );

  const CardContent = (
    <Card style={styles.card} mode="elevated">
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: methodColor + '20' }]}>
            <MaterialCommunityIcons name={methodIcon as any} size={20} color={methodColor} />
          </View>
          <Chip
            style={[styles.chip, { backgroundColor: statusColor + '20' }]}
            textStyle={{ color: statusColor, fontFamily: Fonts.bold, fontSize: 11 }}
          >
            {statusLabel}
          </Chip>
        </View>
        <Text style={styles.amount}>{payment.amountFCFA.toLocaleString('fr-FR')} FCFA</Text>
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
            <Text style={styles.value}>{format(new Date(payment.paidAt || payment.createdAt), 'dd MMMM yyyy', { locale: fr })}</Text>
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
        {hasReceipt && (
          <View style={styles.actions}>
            {onViewReceipt && (
              <Button mode="text" onPress={onViewReceipt} textColor={colors.status.success} icon="file-document-outline" style={styles.actionBtn}>
                Voir le reçu
              </Button>
            )}
            <View style={styles.secondaryActions}>
              {onDownloadReceipt && (
                <Button mode="outlined" onPress={onDownloadReceipt} style={styles.outlinedBtn} textColor={colors.status.success}>Télécharger</Button>
              )}
              {onShareReceipt && (
                <Button mode="outlined" onPress={onShareReceipt} style={styles.outlinedBtn} textColor={colors.status.success}>Partager</Button>
              )}
            </View>
          </View>
        )}
      </View>
    </Card>
  );

  return onPress ? <TouchableOpacity onPress={onPress} activeOpacity={0.7}>{CardContent}</TouchableOpacity> : CardContent;
};
