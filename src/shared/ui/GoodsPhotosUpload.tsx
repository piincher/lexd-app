/**
 * GoodsPhotosUpload - Shared photo upload component
 * Camera and gallery image selection with multiple photos support
 * Pure UI - no business logic
 */

import React from 'react';
import { View, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsPhotosUploadProps } from './GoodsPhotosUpload.types';
import { createStyles } from './GoodsPhotosUpload.styles';
import { GoodsPhotoGrid } from './GoodsPhotoGrid';

export { type GoodsPhotosUploadProps } from './GoodsPhotosUpload.types';

const MAX_PHOTOS = 5;

export const GoodsPhotosUpload: React.FC<GoodsPhotosUploadProps> = ({
  photoUris,
  onPhotoSelected,
  onPhotoRemoved,
  maxPhotos = MAX_PHOTOS,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

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
      onPhotoSelected(result.assets[0].uri);
    }
  };

  const handlePickImages = async () => {
    if (photoUris.length >= maxPhotos) {
      Alert.alert('Limite atteinte', `Vous pouvez ajouter jusqu'à ${maxPhotos} photos`);
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Accès à la galerie nécessaire');
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
      result.assets.forEach((asset) => onPhotoSelected(asset.uri));
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
              >
                Galerie
              </Button>
            </View>
            <Text style={styles.hintText}>
              {photoUris.length === 0
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
