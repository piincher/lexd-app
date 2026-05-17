/**
 * GoodsPhotoUpload - Component for photo upload with preview
 * Improved with consistent styling and better visual feedback
 */
import React from 'react';
import { Card, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsPhotoUpload.styles';
import { PhotoPreview } from './PhotoPreview';
import { PhotoUploadButtons } from './PhotoUploadButtons';

interface GoodsPhotoUploadProps {
  photoUri: string | null;
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: () => void;
}

export const GoodsPhotoUpload: React.FC<GoodsPhotoUploadProps> = ({
  photoUri,
  onPhotoSelected,
  onPhotoRemoved,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const handleTakePhoto = async () => {
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

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Accès à la galerie nécessaire');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      onPhotoSelected(result.assets[0].uri);
    }
  };

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.sectionLabel}>Photo (optionnel)</Text>

        {photoUri ? (
          <PhotoPreview photoUri={photoUri} onPhotoRemoved={onPhotoRemoved} />
        ) : (
          <PhotoUploadButtons onTakePhoto={handleTakePhoto} onPickImage={handlePickImage} />
        )}
      </Card.Content>
    </Card>
  );
};

export default GoodsPhotoUpload;
