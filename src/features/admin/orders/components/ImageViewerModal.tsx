import React from 'react';
import { View, Image } from 'react-native';
import { Modal, Portal, IconButton } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createProofImagesSectionStyles } from './ProofImagesSection.styles';

interface ImageViewerModalProps {
  selectedImage: string | null;
  onClose: () => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  selectedImage,
  onClose,
}) => {
  const { colors } = useAppTheme();
  const styles = createProofImagesSectionStyles(colors);

  return (
    <Portal>
      <Modal
        visible={!!selectedImage}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <IconButton
            icon="close"
            size={28}
            onPress={onClose}
            style={styles.closeButton}
            iconColor={colors.text.inverse}
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </Portal>
  );
};
