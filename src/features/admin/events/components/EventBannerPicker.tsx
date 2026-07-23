import React, { useState } from 'react';
import { View, Image, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Button } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { eventAdminService } from '../api/eventAdminApi';

interface Props {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

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
    return uri;
  }
};

export const EventBannerPicker: React.FC<Props> = ({ value, onChange, disabled }) => {
  const { colors } = useAppTheme();
  const [isUploading, setIsUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const handlePick = async () => {
    if (disabled || isUploading) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]) return;

    const pickedUri = result.assets[0].uri;
    setLocalPreview(pickedUri);
    setIsUploading(true);

    try {
      const compressedUri = await compressImage(pickedUri);
      const url = await eventAdminService.uploadEventBanner(compressedUri);
      onChange(url);
    } catch (error) {
      console.error('[EventBannerPicker] Upload failed:', error);
      Alert.alert('Erreur', "Impossible d'envoyer la bannière. Veuillez réessayer.");
    } finally {
      setIsUploading(false);
      setLocalPreview(null);
    }
  };

  const previewUri = value || localPreview;

  return (
    <View style={styles.container}>
      {previewUri ? (
        <View style={styles.previewWrapper}>
          <Image source={{ uri: previewUri }} style={styles.image} resizeMode="cover" />
          {isUploading && (
            <View style={styles.overlay}>
              <ActivityIndicator color={colors.text.inverse} />
            </View>
          )}
          <View style={styles.buttonRow}>
            <Button
              title={isUploading ? 'Envoi…' : 'Changer l\'image'}
              variant="outline"
              onPress={handlePick}
              disabled={disabled || isUploading}
            />
          </View>
        </View>
      ) : (
        <Button
          title="Choisir une image dans la galerie"
          variant="outline"
          onPress={handlePick}
          disabled={disabled || isUploading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 8 },
  previewWrapper: { borderRadius: 8, overflow: 'hidden' },
  image: { width: '100%', height: 160, borderRadius: 8, backgroundColor: '#e5e7eb' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: { marginTop: 8 },
});
