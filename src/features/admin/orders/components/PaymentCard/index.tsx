import React, { useMemo } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, Divider, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatDate } from '@src/utils/formatDate';
import { PAYMENT_METHOD_ICONS, PAYMENT_METHOD_LABELS } from '../../constants/paymentMethods';
import { createPaymentCardStyles } from './PaymentCard.styles';

interface PaymentCardProps {
  payment: any;
  clientPhone?: string;
  sharingPaymentId: string | null;
  onViewReceipt: (url: string) => void;
  onShareWhatsApp: (payment: any) => void;
  onImagePress: (url: string) => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  clientPhone,
  sharingPaymentId,
  onViewReceipt,
  onShareWhatsApp,
  onImagePress,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createPaymentCardStyles(colors), [colors]);
  const hasReceipt = !!payment.receiptUrl;
  const hasPhone = !!(clientPhone || payment.clientPhone);
  const isSharing = sharingPaymentId === payment._id;

  return (
    <Surface style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.methodContainer}>
          <View style={styles.methodIcon}>
            <MaterialCommunityIcons
              name={(PAYMENT_METHOD_ICONS[payment.paymentMethod] || 'cash') as any}
              size={20}
              color={colors.primary.main}
            />
          </View>
          <View>
            <Text style={styles.methodText}>
              {PAYMENT_METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod}
            </Text>
            <Text style={styles.dateText}>{formatDate(payment.recordedAt)}</Text>
          </View>
        </View>
        <Text style={styles.amountText}>
          {(payment.amount || 0).toLocaleString('fr-FR')} FCFA
        </Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.detailsContainer}>
        {payment.referenceNumber && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="identifier" size={16} color={colors.text.secondary} />
            <Text style={styles.detailLabel}>Référence:</Text>
            <Text style={styles.detailValue}>{payment.referenceNumber}</Text>
          </View>
        )}

        {payment.receiptNumber && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="receipt" size={16} color={colors.text.secondary} />
            <Text style={styles.detailLabel}>N° Reçu:</Text>
            <Text style={styles.detailValue}>{payment.receiptNumber}</Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="account" size={16} color={colors.text.secondary} />
          <Text style={styles.detailLabel}>Enregistré par:</Text>
          <Text style={styles.detailValue}>
            {payment.recordedBy?.firstName} {payment.recordedBy?.lastName}
          </Text>
        </View>

        {payment.notes && (
          <View style={styles.notesContainer}>
            <MaterialCommunityIcons name="note-text" size={16} color={colors.text.secondary} />
            <Text style={styles.notesText}>{payment.notes}</Text>
          </View>
        )}
      </View>

      {(hasReceipt || hasPhone) && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.actionsContainer}>
            {hasReceipt && (
              <Button
                mode="outlined"
                onPress={() => onViewReceipt(payment.receiptUrl)}
                style={styles.actionButton}
                icon="file-pdf-box"
                textColor={colors.primary.main}
                compact
              >
                Voir le reçu
              </Button>
            )}

            {hasPhone && (
              <Button
                mode="contained"
                onPress={() => onShareWhatsApp(payment)}
                style={styles.whatsappButton}
                buttonColor="#25D366"
                icon={isSharing ? undefined : 'whatsapp'}
                compact
                disabled={isSharing}
                loading={isSharing}
              >
                {isSharing ? 'Envoi...' : 'Partager'}
              </Button>
            )}
          </View>
        </>
      )}

      {payment.proofImages && payment.proofImages.length > 0 && (
        <View style={styles.imagesContainer}>
          <Text style={styles.imagesLabel}>Preuve de paiement:</Text>
          <View style={styles.imagesRow}>
            {payment.proofImages.map((url: string, imgIndex: number) => (
              <TouchableOpacity key={imgIndex} onPress={() => onImagePress(url)}>
                <Image source={{ uri: url }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </Surface>
  );
};
