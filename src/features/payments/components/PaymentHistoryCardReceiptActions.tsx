import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { getPaymentHistoryCardStyles } from './PaymentHistoryCard.styles';

interface PaymentHistoryCardReceiptActionsProps {
  colors: any;
  onViewReceipt?: () => void;
  onDownloadReceipt?: () => void;
  onShareReceipt?: () => void;
}

export const PaymentHistoryCardReceiptActions: React.FC<PaymentHistoryCardReceiptActionsProps> = ({
  colors,
  onViewReceipt,
  onDownloadReceipt,
  onShareReceipt,
}) => {
  const styles = getPaymentHistoryCardStyles(colors);
  return (
    <View style={styles.actions}>
      {onViewReceipt && (
        <Button mode="text" onPress={onViewReceipt} textColor={colors.status.success} icon="file-document-outline" style={styles.actionBtn}>
          Voir le reçu
        </Button>
      )}
      <View style={styles.secondaryActions}>
        {onDownloadReceipt && (
          <Button mode="outlined" onPress={onDownloadReceipt} style={styles.outlinedBtn} textColor={colors.status.success}>
            Télécharger
          </Button>
        )}
        {onShareReceipt && (
          <Button mode="outlined" onPress={onShareReceipt} style={styles.outlinedBtn} textColor={colors.status.success}>
            Partager
          </Button>
        )}
      </View>
    </View>
  );
};
