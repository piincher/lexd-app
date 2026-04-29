import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const usePaymentImagePicker = () => {
  const [proofImages, setProofImages] = useState<string[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const pickImage = async (fromCamera: boolean) => {
    try {
      let result;

      if (fromCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Camera permission is required to take photos');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
          base64: true,
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Gallery permission is required to select photos');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
          base64: true,
        });
      }

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const base64Image = `data:image/jpeg;base64,${asset.base64}`;
        setProofImages((prev) => [...prev, base64Image]);
      }
    } catch (error) {
      console.error('[RecordPaymentScreen] Image picker error:', error);
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setShowImageModal(false);
    }
  };

  const removeImage = (index: number) => {
    setProofImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    proofImages,
    showImageModal,
    setShowImageModal,
    pickImage,
    removeImage,
  };
};
