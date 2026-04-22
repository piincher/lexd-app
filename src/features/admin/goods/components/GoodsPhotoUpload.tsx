/**
 * GoodsPhotoUpload - Component for photo upload with preview
 * Improved with consistent styling and better visual feedback
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors, isDark } = useAppTheme();

  /**
   * Request permissions and pick image from camera
   */
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

  /**
   * Request permissions and pick image from gallery
   */
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

  const styles = useMemo(() => StyleSheet.create({
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
    photoContainer: {
      alignItems: 'center',
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
      width: 240,
      height: 180,
      resizeMode: 'cover',
    },
    removeButton: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
  }), [colors, isDark]);

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.sectionLabel}>Photo (optionnel)</Text>

        {photoUri ? (
          <View style={styles.photoContainer}>
            <View style={styles.photoWrapper}>
              <Image source={{ uri: photoUri }} style={styles.photo} />
              <IconButton
                icon="close-circle"
                size={28}
                iconColor={colors.text.inverse}
                style={styles.removeButton}
                containerColor={colors.status.error}
                onPress={onPhotoRemoved}
              />
            </View>
          </View>
        ) : (
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
                onPress={handlePickImage}
                style={styles.button}
                contentStyle={styles.buttonContent}
                icon="image"
                textColor={colors.status.success}
              >
                Galerie
              </Button>
            </View>
            <Text style={styles.hintText}>
              Ajoutez une photo pour faciliter l'identification
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default GoodsPhotoUpload;
