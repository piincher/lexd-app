import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import type { PaymentHistoryItem } from '../types';

interface PaymentHistoryCardProps {
  payment: PaymentHistoryItem;
  onPress?: () => void;
  onViewReceipt?: () => void;
  onDownloadReceipt?: () => void;
  onShareReceipt?: () => void;
}

const METHOD_CONFIG: Record<string, { icon: string; color: string; bgColor: string }> = {
  CASH: { icon: 'cash', color: '#10B981', bgColor: '#F0FDF4' },
  BANK_TRANSFER: { icon: 'bank', color: '#3B82F6', bgColor: '#EEF2FF' },
  MOBILE_MONEY: { icon: 'cellphone', color: '#8B5CF6', bgColor: '#F5F3FF' },
  ORANGE_MONEY: { icon: 'cellphone', color: '#F97316', bgColor: '#FFF7ED' },
  WAVE: { icon: 'wave', color: '#06B6D4', bgColor: '#ECFEFF' },
  CARD: { icon: 'credit-card', color: '#6366F1', bgColor: '#EEF2FF' },
};

const STATUS_CONFIG: Record<string, { color: string; bgColor: string; label: string }> = {
  COMPLETED: { color: '#10B981', bgColor: '#F0FDF4', label: 'Complété' },
  PENDING: { color: '#F59E0B', bgColor: '#FEF3C7', label: 'En attente' },
  PROCESSING: { color: '#3B82F6', bgColor: '#DBEAFE', label: 'En cours' },
  FAILED: { color: '#EF4444', bgColor: '#FEE2E2', label: 'Échoué' },
  CANCELLED: { color: '#6B7280', bgColor: '#F3F4F6', label: 'Annulé' },
  REFUNDED: { color: '#8B5CF6', bgColor: '#F5F3FF', label: 'Remboursé' },
};

export const PaymentHistoryCard: React.FC<PaymentHistoryCardProps> = ({
  payment, onPress, onViewReceipt, onDownloadReceipt, onShareReceipt,
}) => {
  const methodConfig = METHOD_CONFIG[payment.paymentMethod] || METHOD_CONFIG.CASH;
  const statusConfig = STATUS_CONFIG[payment.status] || STATUS_CONFIG.PENDING;
  const hasReceipt = !!(payment.receiptUrl || payment.metadata?.receiptUrl);

  const CardContent = (
    <Card style={styles.card} mode="elevated">
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: methodConfig.bgColor }]}>
            <MaterialCommunityIcons name={methodConfig.icon as any} size={20} color={methodConfig.color} />
          </View>
          <Chip style={[styles.chip, { backgroundColor: statusConfig.bgColor }]} textStyle={{ color: statusConfig.color, fontFamily: Fonts.bold, fontSize: 11 }}>
            {statusConfig.label}
          </Chip>
        </View>
        <Text style={styles.amount}>{payment.amountFCFA.toLocaleString('fr-FR')} FCFA</Text>
        <View style={styles.details}>
          {payment.goodsIds?.[0] && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="package-variant" size={14} color={COLORS.grey} />
              <Text style={styles.label}>Commande:</Text>
              <Text style={styles.value}>{payment.goodsIds[0]}</Text>
            </View>
          )}
          {payment.orderCode && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="file-document" size={14} color={COLORS.grey} />
              <Text style={styles.label}>Commande:</Text>
              <Text style={styles.value}>{payment.orderCode}</Text>
            </View>
          )}
          <View style={styles.row}>
            <MaterialCommunityIcons name="calendar" size={14} color={COLORS.grey} />
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{format(new Date(payment.paidAt || payment.createdAt), 'dd MMMM yyyy', { locale: fr })}</Text>
          </View>
          {payment.referenceNumber && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="identifier" size={14} color={COLORS.grey} />
              <Text style={styles.label}>Référence:</Text>
              <Text style={styles.value}>{payment.referenceNumber}</Text>
            </View>
          )}
          {payment.receiptNumber && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="receipt" size={14} color={COLORS.grey} />
              <Text style={styles.label}>N° Reçu:</Text>
              <Text style={styles.value}>{payment.receiptNumber}</Text>
            </View>
          )}
          {payment.transactionReference && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="identifier" size={14} color={COLORS.grey} />
              <Text style={styles.label}>Référence:</Text>
              <Text style={styles.value}>{payment.transactionReference}</Text>
            </View>
          )}
        </View>
        {hasReceipt && (
          <View style={styles.actions}>
            {onViewReceipt && (
              <Button mode="text" onPress={onViewReceipt} textColor={COLORS.success} icon="file-document-outline" style={styles.actionBtn}>
                Voir le reçu
              </Button>
            )}
            <View style={styles.secondaryActions}>
              {onDownloadReceipt && (
                <Button mode="outlined" onPress={onDownloadReceipt} style={styles.outlinedBtn} textColor={COLORS.success}>Télécharger</Button>
              )}
              {onShareReceipt && (
                <Button mode="outlined" onPress={onShareReceipt} style={styles.outlinedBtn} textColor={COLORS.success}>Partager</Button>
              )}
            </View>
          </View>
        )}
      </View>
    </Card>
  );

  return onPress ? <TouchableOpacity onPress={onPress} activeOpacity={0.7}>{CardContent}</TouchableOpacity> : CardContent;
};

const styles = StyleSheet.create({
  card: { borderRadius: 12, elevation: 2, backgroundColor: COLORS.white, marginBottom: 12 },
  content: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  iconContainer: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  chip: { height: 28, borderRadius: 6 },
  amount: { fontFamily: Fonts.bold, fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  details: { gap: 8, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontFamily: Fonts.medium, fontSize: 13, color: COLORS.grey, minWidth: 90 },
  value: { fontFamily: Fonts.medium, fontSize: 13, color: '#1F2937', flex: 1 },
  actions: { gap: 8, borderTopWidth: 1, borderTopColor: COLORS.lightergray, paddingTop: 12 },
  actionBtn: { alignSelf: 'flex-start' },
  secondaryActions: { flexDirection: 'row', gap: 8 },
  outlinedBtn: { flex: 1, borderColor: COLORS.success },
});
