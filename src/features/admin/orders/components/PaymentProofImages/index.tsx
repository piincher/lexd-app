import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Surface, Portal, Modal, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentProofImagesStyles } from './PaymentProofImages.styles';

interface PaymentProofImagesProps {
  proofImages: string[];
  onPickImage: (fromCamera: boolean) => void;
  onRemoveImage: (index: number) => void;
  showImageModal: boolean;
  onShowImageModal: () => void;
  onHideImageModal: () => void;
}

export const PaymentProofImages: React.FC<PaymentProofImagesProps> = ({
  proofImages,
  onPickImage,
  onRemoveImage,
  showImageModal,
  onShowImageModal,
  onHideImageModal,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentProofImagesStyles(colors);

  return (
    <Surface style={styles.formCard}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Payment Proof (Optional)</Text>
        <Text style={styles.hint}>Add photos of receipts, screenshots, etc.</Text>

        <View style={styles.imageContainer}>
          {proofImages.map((imageData, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image
                source={{ uri: imageData.startsWith('data:') ? imageData : imageData }}
                style={styles.proofImage}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemoveImage(index)}
              >
                <MaterialCommunityIcons name="close-circle" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          ))}

          {proofImages.length < 3 && (
            <TouchableOpacity style={styles.addImageButton} onPress={onShowImageModal}>
              <MaterialCommunityIcons name="camera-plus" size={32} color={colors.primary.main} />
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Portal>
        <Modal
          visible={showImageModal}
          onDismiss={onHideImageModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Add Payment Proof</Text>
          <Button
            mode="contained"
            onPress={() => onPickImage(true)}
            style={styles.modalButton}
            icon="camera"
          >
            Take Photo
          </Button>
          <Button
            mode="outlined"
            onPress={() => onPickImage(false)}
            style={styles.modalButton}
            icon="image"
          >
            Choose from Gallery
          </Button>
          <Button mode="text" onPress={onHideImageModal} style={styles.modalButton}>
            Cancel
          </Button>
        </Modal>
      </Portal>
    </Surface>
  );
};

export default PaymentProofImages;
