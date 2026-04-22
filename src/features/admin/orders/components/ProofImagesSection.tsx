/**
 * ProofImagesSection - Displays payment proof images in a grid
 * SRP: Show proof images with fullscreen view capability
 */

import React, { useState, useMemo } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions,
} from 'react-native';
import { Text, Surface, Modal, Portal, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProofImagesSectionProps {
  proofImages?: string[];
}

export const ProofImagesSection: React.FC<ProofImagesSectionProps> = ({
  proofImages,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { colors } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
      backgroundColor: colors.background.card,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginLeft: 8,
      color: colors.text.primary,
    },
    proofGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    proofImageContainer: {
      width: (SCREEN_WIDTH - 80) / 3,
      height: (SCREEN_WIDTH - 80) / 3,
      borderRadius: 8,
      overflow: 'hidden',
      position: 'relative',
    },
    proofImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    proofOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    },
    modalContent: {
      width: SCREEN_WIDTH,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullscreenImage: {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 16,
      zIndex: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  }), [colors]);

  if (!proofImages || proofImages.length === 0) {
    return null;
  }

  const openImageFullscreen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Surface style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="image-multiple" size={24} color={colors.primary.main} />
          <Text style={styles.cardTitle}>Payment Proof ({proofImages.length})</Text>
        </View>

        <View style={styles.proofGrid}>
          {proofImages.map((imageUrl, index) => (
            <TouchableOpacity
              key={index}
              style={styles.proofImageContainer}
              onPress={() => openImageFullscreen(imageUrl)}
            >
              <Image source={{ uri: imageUrl }} style={styles.proofImage} />
              <View style={styles.proofOverlay}>
                <MaterialCommunityIcons name="magnify-plus" size={20} color={colors.text.inverse} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Surface>

      <Portal>
        <Modal
          visible={!!selectedImage}
          onDismiss={closeImageModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <IconButton
              icon="close"
              size={28}
              onPress={closeImageModal}
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
    </>
  );
};
