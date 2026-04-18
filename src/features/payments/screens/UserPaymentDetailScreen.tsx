/**
 * UserPaymentDetailScreen
 * Shows the full detail of a payment recorded by admin on user's behalf.
 * Users can view and open their receipt PDF from this screen.
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Text, Surface, Divider, Chip } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import type { PaymentHistoryItem } from '../types';

const METHOD_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  CASH: { icon: 'cash', color: '#10B981', label: 'Espèces' },
  BANK_TRANSFER: { icon: 'bank', color: '#3B82F6', label: 'Virement Bancaire' },
  MOBILE_MONEY: { icon: 'cellphone', color: '#8B5CF6', label: 'Mobile Money' },
  ORANGE_MONEY: { icon: 'cellphone', color: '#F97316', label: 'Orange Money' },
  WAVE: { icon: 'wave', color: '#06B6D4', label: 'Wave' },
  CARD: { icon: 'credit-card', color: '#6366F1', label: 'Carte Bancaire' },
};

const STATUS_CONFIG: Record<string, { color: string; bgColor: string; label: string }> = {
  COMPLETED: { color: '#10B981', bgColor: '#F0FDF4', label: 'Complété' },
  PENDING: { color: '#F59E0B', bgColor: '#FEF3C7', label: 'En attente' },
  PROCESSING: { color: '#3B82F6', bgColor: '#DBEAFE', label: 'En cours' },
  FAILED: { color: '#EF4444', bgColor: '#FEE2E2', label: 'Échoué' },
  CANCELLED: { color: '#6B7280', bgColor: '#F3F4F6', label: 'Annulé' },
  REFUNDED: { color: '#8B5CF6', bgColor: '#F5F3FF', label: 'Remboursé' },
};

interface RouteParams {
  payment: PaymentHistoryItem;
}

const InfoRow: React.FC<{ icon: string; label: string; value: string; color?: string }> = ({
  icon,
  label,
  value,
  color,
}) => (
  <View style={styles.infoRow}>
    <MaterialCommunityIcons name={icon as any} size={16} color={COLORS.grey} style={styles.infoIcon} />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, color ? { color } : {}]}>{value}</Text>
  </View>
);

const UserPaymentDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { payment } = (route.params as RouteParams);

  const methodConfig = METHOD_CONFIG[payment.paymentMethod] || { icon: 'cash', color: '#10B981', label: payment.paymentMethod };
  const statusConfig = STATUS_CONFIG[payment.status] || STATUS_CONFIG.PENDING;
  const receiptUrl = payment.receiptUrl || payment.metadata?.receiptUrl;

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'N/A';
    try {
      return format(new Date(dateStr), "dd MMMM yyyy 'à' HH:mm", { locale: fr });
    } catch {
      return dateStr;
    }
  };

  const handleOpenReceipt = async () => {
    if (!receiptUrl) {
      Alert.alert('Reçu non disponible', 'Le reçu n\'est pas encore généré pour ce paiement.');
      return;
    }
    try {
      const canOpen = await Linking.canOpenURL(receiptUrl);
      if (canOpen) {
        await Linking.openURL(receiptUrl);
      } else {
        Alert.alert('Erreur', 'Impossible d\'ouvrir le reçu. Vérifiez votre connexion.');
      }
    } catch {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ouverture du reçu.');
    }
  };

  return (
    <Screen
      header={{
        title: 'Détail du paiement',
        showBack: true,
        onBackPress: () => navigation.goBack(),
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Amount Hero Card */}
        <Surface style={styles.heroCard}>
          <View style={[styles.methodIcon, { backgroundColor: methodConfig.color + '15' }]}>
            <MaterialCommunityIcons name={methodConfig.icon as any} size={32} color={methodConfig.color} />
          </View>
          <Text style={styles.amountText}>
            {payment.amountFCFA.toLocaleString('fr-FR')} FCFA
          </Text>
          <Chip
            style={[styles.statusChip, { backgroundColor: statusConfig.bgColor }]}
            textStyle={{ color: statusConfig.color, fontFamily: Fonts.bold, fontSize: 13 }}
          >
            {statusConfig.label}
          </Chip>
          <Text style={styles.methodText}>{methodConfig.label}</Text>
          <Text style={styles.dateText}>{formatDate(payment.paidAt || payment.createdAt)}</Text>
        </Surface>

        {/* Receipt Card */}
        <Surface style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="file-document-outline" size={22} color={COLORS.blue} />
            <Text style={styles.cardTitle}>Reçu</Text>
          </View>
          {receiptUrl ? (
            <>
              <View style={styles.receiptPreview}>
                <MaterialCommunityIcons name="file-pdf-box" size={56} color="#F44336" />
                {payment.receiptNumber && (
                  <Text style={styles.receiptNumber}>N° {payment.receiptNumber}</Text>
                )}
                <Text style={styles.receiptLabel}>Reçu de paiement PDF</Text>
              </View>
              <TouchableOpacity style={styles.viewReceiptBtn} onPress={handleOpenReceipt}>
                <MaterialCommunityIcons name="eye" size={18} color="#fff" />
                <Text style={styles.viewReceiptText}>Voir / Télécharger le Reçu</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.noReceiptContainer}>
              <MaterialCommunityIcons name="file-hidden" size={40} color={COLORS.grey} />
              <Text style={styles.noReceiptText}>Reçu en cours de génération</Text>
            </View>
          )}
        </Surface>

        {/* Payment Details Card */}
        <Surface style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="cash-check" size={22} color={COLORS.blue} />
            <Text style={styles.cardTitle}>Détails du paiement</Text>
          </View>
          <Divider style={styles.divider} />
          <InfoRow icon="cash" label="Montant" value={`${payment.amountFCFA.toLocaleString('fr-FR')} FCFA`} color="#10B981" />
          <InfoRow icon={methodConfig.icon} label="Méthode" value={methodConfig.label} />
          <InfoRow icon="calendar" label="Date" value={formatDate(payment.paidAt || payment.createdAt)} />
          {payment.orderCode && (
            <InfoRow icon="file-document" label="N° Commande" value={payment.orderCode} />
          )}
          {payment.receiptNumber && (
            <InfoRow icon="receipt" label="N° Reçu" value={payment.receiptNumber} />
          )}
          {payment.referenceNumber && (
            <InfoRow icon="identifier" label="Référence" value={payment.referenceNumber} />
          )}
          {payment.transactionReference && !payment.referenceNumber && (
            <InfoRow icon="identifier" label="Référence" value={payment.transactionReference} />
          )}
          {payment.paymentId && (
            <InfoRow icon="tag" label="ID Paiement" value={payment.paymentId} />
          )}
        </Surface>

        {/* Notes Card */}
        {payment.notes && (
          <Surface style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="note-text" size={22} color={COLORS.blue} />
              <Text style={styles.cardTitle}>Notes</Text>
            </View>
            <Divider style={styles.divider} />
            <Text style={styles.notesText}>{payment.notes}</Text>
          </Surface>
        )}

        {/* Recorded By Card */}
        {payment.createdBy && (
          <Surface style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="account-check" size={22} color={COLORS.blue} />
              <Text style={styles.cardTitle}>Enregistré par</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.adminRow}>
              <View style={styles.adminAvatar}>
                <MaterialCommunityIcons name="account" size={24} color={COLORS.blue} />
              </View>
              <Text style={styles.adminName}>{payment.createdBy.name || 'Administrateur'}</Text>
            </View>
          </Surface>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  heroCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
  },
  methodIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountText: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: '#1F2937',
    marginBottom: 10,
  },
  statusChip: {
    marginBottom: 8,
    height: 30,
  },
  methodText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: COLORS.grey,
    marginTop: 4,
  },
  dateText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: '#1A1A2E',
    marginLeft: 8,
  },
  divider: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoIcon: {
    marginRight: 8,
    width: 20,
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: COLORS.grey,
    width: 110,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    color: '#1F2937',
    flex: 1,
    textAlign: 'right',
  },
  receiptPreview: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    marginBottom: 12,
  },
  receiptNumber: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: '#1A1A2E',
    marginTop: 8,
  },
  receiptLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  viewReceiptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    paddingVertical: 12,
    gap: 8,
  },
  viewReceiptText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#fff',
  },
  noReceiptContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  noReceiptText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 8,
  },
  notesText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#374151',
    lineHeight: 20,
  },
  adminRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  adminName: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#1F2937',
  },
  bottomSpacer: {
    height: 32,
  },
});

export default UserPaymentDetailScreen;
