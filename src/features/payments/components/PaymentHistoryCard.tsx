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

const METHOD_CONFIG: Record<string, { icon: string; color: string }> = {
  CASH: { icon: 'cash', color: '#10B981' },
  BANK_TRANSFER: { icon: 'bank', color: '#3B82F6' },
  MOBILE_MONEY: { icon: 'cellphone', color: '#8B5CF6' },
  ORANGE_MONEY: { icon: 'cellphone', color: '#F97316' },
  WAVE: { icon: 'wave', color: '#06B6D4' },
  CARD: { icon: 'credit-card', color: '#6366F1' },
};

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  COMPLETED: { color: '#10B981', label: 'Complété' },
  PENDING: { color: '#F59E0B', label: 'En attente' },
  PROCESSING: { color: '#3B82F6', label: 'En cours' },
  FAILED: { color: '#EF4444', label: 'Échoué' },
  CANCELLED: { color: '#6B7280', label: 'Annulé' },
  REFUNDED: { color: '#8B5CF6', label: 'Remboursé' },
};

export const PaymentHistoryCard: React.FC<PaymentHistoryCardProps> = ({
  payment, onPress, onViewReceipt, onDownloadReceipt, onShareReceipt,
}) => {
  const { colors } = useAppTheme();
  const methodConfig = METHOD_CONFIG[payment.paymentMethod] || METHOD_CONFIG.CASH;
  const statusConfig = STATUS_CONFIG[payment.status] || STATUS_CONFIG.PENDING;
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
          <View style={[styles.iconContainer, { backgroundColor: methodConfig.color + '20' }]}>
            <MaterialCommunityIcons name={methodConfig.icon as any} size={20} color={methodConfig.color} />
          </View>
          <Chip
            style={[styles.chip, { backgroundColor: statusConfig.color + '20' }]}
            textStyle={{ color: statusConfig.color, fontFamily: Fonts.bold, fontSize: 11 }}
          >
            {statusConfig.label}
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
