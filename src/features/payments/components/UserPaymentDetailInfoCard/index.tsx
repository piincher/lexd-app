import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE } from '@src/shared/ui/designLanguage';
import type { PaymentHistoryItem } from '../../types';
import { UserPaymentDetailInfoRow } from '../UserPaymentDetailInfoRow';
import { styles } from './styles';

interface MethodConfig {
  icon: string;
  color: string;
  label: string;
}

interface UserPaymentDetailInfoCardProps {
  payment: PaymentHistoryItem;
  methodConfig: MethodConfig;
  formattedDate: string;
}

export const UserPaymentDetailInfoCard: React.FC<UserPaymentDetailInfoCardProps> = ({
  payment,
  methodConfig,
  formattedDate,
}) => {
  const { colors } = useAppTheme();

  return (
    <Surface
      style={[
        styles.card,
        {
          backgroundColor: colors.background.default,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="cash-check" size={22} color={colors.primary.main} />
        <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Détails du paiement</Text>
      </View>
      <Divider style={styles.divider} />
      <UserPaymentDetailInfoRow
        icon="cash"
        label="Montant"
        value={`${payment.amountFCFA.toLocaleString('fr-FR')} FCFA`}
        color={colors.status.success}
      />
      <UserPaymentDetailInfoRow icon={methodConfig.icon} label="Méthode" value={methodConfig.label} />
      <UserPaymentDetailInfoRow icon="calendar" label="Date" value={formattedDate} />
      {payment.orderCode && (
        <UserPaymentDetailInfoRow icon="file-document" label="N° Commande" value={payment.orderCode} />
      )}
      {payment.receiptNumber && (
        <UserPaymentDetailInfoRow icon="receipt" label="N° Reçu" value={payment.receiptNumber} />
      )}
      {payment.referenceNumber && (
        <UserPaymentDetailInfoRow icon="identifier" label="Référence" value={payment.referenceNumber} />
      )}
      {payment.transactionReference && !payment.referenceNumber && (
        <UserPaymentDetailInfoRow
          icon="identifier"
          label="Référence"
          value={payment.transactionReference}
        />
      )}
      {payment.paymentId && (
        <UserPaymentDetailInfoRow icon="tag" label="ID Paiement" value={payment.paymentId} />
      )}
    </Surface>
  );
};
