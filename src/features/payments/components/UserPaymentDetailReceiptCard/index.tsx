import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './styles';

interface UserPaymentDetailReceiptCardProps {
  receiptUrl: string | null | undefined;
  receiptNumber: string | null | undefined;
  onOpenReceipt: () => void;
}

export const UserPaymentDetailReceiptCard: React.FC<UserPaymentDetailReceiptCardProps> = ({
  receiptUrl,
  receiptNumber,
  onOpenReceipt,
}) => {
  const { colors } = useAppTheme();

  return (
    <Surface style={[styles.card, { backgroundColor: colors.background.default }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="file-document-outline" size={22} color={colors.primary.main} />
        <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Reçu</Text>
      </View>
      {receiptUrl ? (
        <>
          <View style={[styles.receiptPreview, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name="file-pdf-box" size={56} color={colors.status.error} />
            {receiptNumber && (
              <Text style={[styles.receiptNumber, { color: colors.text.primary }]}>
                N° {receiptNumber}
              </Text>
            )}
            <Text style={[styles.receiptLabel, { color: colors.text.secondary }]}>
              Reçu de paiement PDF
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.viewReceiptBtn, { backgroundColor: colors.primary.main }]}
            onPress={onOpenReceipt}
          >
            <MaterialCommunityIcons name="eye" size={18} color={colors.text.inverse} />
            <Text style={styles.viewReceiptText}>Voir / Télécharger le Reçu</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.noReceiptContainer}>
          <MaterialCommunityIcons name="file-hidden" size={40} color={colors.text.secondary} />
          <Text style={[styles.noReceiptText, { color: colors.text.secondary }]}>
            Reçu en cours de génération
          </Text>
        </View>
      )}
    </Surface>
  );
};
