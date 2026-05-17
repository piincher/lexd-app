import React from 'react';
import { Image } from 'react-native';
import { Portal, Modal, IconButton } from 'react-native-paper';
import { createPaymentImageModalStyles } from './PaymentImageModal.styles';

interface PaymentImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export const PaymentImageModal: React.FC<PaymentImageModalProps> = ({ imageUrl, onClose }) => {
  const { colors } = useAppTheme();
  const styles = createPaymentImageModalStyles(colors);

  return (
    <Portal>
      <Modal visible={!!imageUrl} onDismiss={onClose} contentContainerStyle={styles.modalContent}>
        <IconButton icon="close" size={24} onPress={onClose} style={styles.closeButton} />
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.fullImage} resizeMode="contain" />
        )}
      </Modal>
    </Portal>
  );
};
