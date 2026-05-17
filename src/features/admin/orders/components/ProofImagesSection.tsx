/**
 * ProofImagesSection - Displays payment proof images in a grid
 * SRP: Show proof images with fullscreen view capability
 */

import React, { useState, useMemo } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createProofImagesSectionStyles } from './ProofImagesSection.styles';
import { ImageViewerModal } from './ImageViewerModal';

interface ProofImagesSectionProps {
  proofImages?: string[];
}

export const ProofImagesSection: React.FC<ProofImagesSectionProps> = ({
  proofImages,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { colors } = useAppTheme();
  const styles = useMemo(() => createProofImagesSectionStyles(colors), [colors]);

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

      <ImageViewerModal selectedImage={selectedImage} onClose={closeImageModal} />
    </>
  );
};
