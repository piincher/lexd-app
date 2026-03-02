import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface ExpenseReceiptUploadProps {
  currentReceiptUrl?: string;
  onImageSelected: (uri: string, base64?: string) => void;
  onRemove?: () => void;
  isUploading?: boolean;
}

export const ExpenseReceiptUpload: React.FC<ExpenseReceiptUploadProps> = ({
  currentReceiptUrl,
  onImageSelected,
  onRemove,
  isUploading = false,
}) => {
  const [previewUri, setPreviewUri] = useState<string | null>(null);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission d\'accès à la galerie requise');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setPreviewUri(asset.uri);
      onImageSelected(asset.uri, asset.base64 || undefined);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission d\'accès à la caméra requise');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setPreviewUri(asset.uri);
      onImageSelected(asset.uri, asset.base64 || undefined);
    }
  };

  const handleRemove = () => {
    setPreviewUri(null);
    onRemove?.();
  };

  const displayUri = previewUri || currentReceiptUrl;

  if (displayUri) {
    return (
      <View style={styles.container}>
        <Text variant="labelLarge" style={styles.label}>
          Reçu
        </Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: displayUri }} style={styles.image} resizeMode="cover" />
          {isUploading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <IconButton
            icon="close"
            size={20}
            iconColor="#fff"
            style={styles.removeButton}
            containerColor="rgba(239, 68, 68, 0.9)"
            onPress={handleRemove}
            disabled={isUploading}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="labelLarge" style={styles.label}>
        Ajouter un reçu (optionnel)
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
          <View style={[styles.iconContainer, { backgroundColor: '#3B82F620' }]}>
            <MaterialCommunityIcons name="camera" size={28} color="#3B82F6" />
          </View>
          <Text variant="bodySmall" style={styles.optionText}>
            Prendre une photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
          <View style={[styles.iconContainer, { backgroundColor: '#10B98120' }]}>
            <MaterialCommunityIcons name="image" size={28} color="#10B981" />
          </View>
          <Text variant="bodySmall" style={styles.optionText}>
            Choisir une image
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 8,
    color: '#374151',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
