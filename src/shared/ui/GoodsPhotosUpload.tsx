/**
 * GoodsPhotosUpload - Shared photo upload component
 * Camera and gallery image selection with multiple photos support
 * Pure UI - no business logic
 */

import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsPhotosUploadProps } from './GoodsPhotosUpload.types';
import { createStyles } from './GoodsPhotosUpload.styles';
import { GoodsPhotoGrid } from './GoodsPhotoGrid';

export { type GoodsPhotosUploadProps } from './GoodsPhotosUpload.types';

const MAX_PHOTOS = 5;
// Modern phone cameras produce 3–8 MB images even at picker quality 0.7. Anything
// above ~1 MB gets rejected by the API's nginx layer with a 413. Downscaling to
// 1600px wide + JPEG 0.7 gives ~200–400 KB per photo — well within budget — and
// is more than enough resolution for warehouse intake identification.
const MAX_DIMENSION_PX = 1600;
const COMPRESS_QUALITY = 0.7;

const compressImage = async (uri: string): Promise<string> => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: MAX_DIMENSION_PX } }],
      { compress: COMPRESS_QUALITY, format: ImageManipulator.SaveFormat.JPEG },
    );
    return result.uri;
  } catch {
    // Manipulation failures (corrupt asset, OOM, etc.) shouldn't block the user.
    // Fall back to the original URI — if it's too large, upload will fail and the
    // user gets the existing error path. Better than silently dropping the photo.
    return uri;
  }
};

export const GoodsPhotosUpload: React.FC<GoodsPhotosUploadProps> = ({
  photoUris,
  onPhotoSelected,
  onPhotoRemoved,
  maxPhotos = MAX_PHOTOS,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTakePhoto = async () => {
    if (photoUris.length >= maxPhotos) {
      Alert.alert('Limite atteinte', `Vous pouvez ajouter jusqu'à ${maxPhotos} photos`);
      return;
    }
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Accès à la caméra nécessaire');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setIsProcessing(true);
      const compressedUri = await compressImage(result.assets[0].uri);
      setIsProcessing(false);
      onPhotoSelected(compressedUri, 'camera');
    }
  };

  const handlePickImages = async () => {
    if (photoUris.length >= maxPhotos) {
      Alert.alert('Limite atteinte', `Vous pouvez ajouter jusqu'à ${maxPhotos} photos`);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
      allowsMultipleSelection: true,
      selectionLimit: maxPhotos - photoUris.length,
    });
    if (!result.canceled && result.assets) {
      setIsProcessing(true);
      const compressedUris = await Promise.all(
        result.assets.map((asset) => compressImage(asset.uri)),
      );
      setIsProcessing(false);
      compressedUris.forEach((uri) => onPhotoSelected(uri, 'gallery'));
    }
  };

  const remainingSlots = maxPhotos - photoUris.length;

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.sectionLabel}>
          Photos {photoUris.length > 0 && `(${photoUris.length}/${maxPhotos})`}
        </Text>

        {photoUris.length > 0 && (
          <GoodsPhotoGrid
            photoUris={photoUris}
            onRemove={onPhotoRemoved}
            colors={colors}
            styles={styles}
          />
        )}

        {remainingSlots > 0 && (
          <View style={styles.uploadContainer}>
            <View style={styles.buttonRow}>
              <Button
                mode="outlined"
                onPress={handleTakePhoto}
                style={styles.button}
                contentStyle={styles.buttonContent}
                icon="camera"
                textColor={colors.status.success}
                disabled={isProcessing}
                loading={isProcessing}
              >
                Prendre photo
              </Button>
              <Button
                mode="outlined"
                onPress={handlePickImages}
                style={styles.button}
                contentStyle={styles.buttonContent}
                icon="image"
                textColor={colors.status.success}
                disabled={isProcessing}
                loading={isProcessing}
              >
                Galerie
              </Button>
            </View>
            <Text style={styles.hintText}>
              {isProcessing
                ? 'Optimisation des photos…'
                : photoUris.length === 0
                ? "Ajoutez des photos pour faciliter l'identification"
                : `Encore ${remainingSlots} photo${remainingSlots > 1 ? 's' : ''} possible${remainingSlots > 1 ? 's' : ''}`}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default GoodsPhotosUpload;
