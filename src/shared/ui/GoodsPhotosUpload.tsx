/**
 * GoodsPhotosUpload - Shared photo upload component
 * Camera and gallery image selection with multiple photos support
 * Pure UI - no business logic
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useAppTheme } from '@src/providers/ThemeProvider';

const MAX_PHOTOS = 5;

export interface GoodsPhotosUploadProps {
  photoUris: string[];
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: (uri: string) => void;
  maxPhotos?: number;
}

export const GoodsPhotosUpload: React.FC<GoodsPhotosUploadProps> = ({
  photoUris,
  onPhotoSelected,
  onPhotoRemoved,
  maxPhotos = MAX_PHOTOS,
}) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginVertical: 8,
          borderRadius: 12,
          backgroundColor: colors.background.card,
        },
        cardContent: {
          padding: 16,
        },
        sectionLabel: {
          fontSize: 14,
          fontWeight: '700',
          marginBottom: 16,
          color: colors.text.primary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        photosContainer: {
          gap: 12,
          paddingBottom: 16,
        },
        photoWrapper: {
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        },
        photo: {
          width: 160,
          height: 120,
          borderRadius: 12,
        },
        removeButton: {
          position: 'absolute',
          top: 6,
          right: 6,
          margin: 0,
        },
        uploadContainer: {
          alignItems: 'center',
        },
        buttonRow: {
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        },
        button: {
          flex: 1,
          marginHorizontal: 8,
          borderColor: colors.status.success,
          borderRadius: 8,
          borderWidth: 1.5,
        },
        buttonContent: {
          paddingVertical: 8,
        },
        hintText: {
          fontSize: 12,
          color: colors.text.disabled,
          marginTop: 12,
          textAlign: 'center',
          fontStyle: 'italic',
        },
      }),
    [colors, isDark]
  );

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
      result.assets.forEach((asset) => {
        onPhotoSelected(asset.uri);
      });
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photosContainer}
          >
            {photoUris.map((uri, index) => (
              <View key={`${uri}_${index}`} style={styles.photoWrapper}>
                <Image source={{ uri }} style={styles.photo} />
                <IconButton
                  icon="close-circle"
                  size={22}
                  iconColor={colors.text.inverse}
                  style={styles.removeButton}
                  containerColor={colors.status.error}
                  onPress={() => onPhotoRemoved(uri)}
                />
              </View>
            ))}
          </ScrollView>
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
