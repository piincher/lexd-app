import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export type ProofImageSource = 'camera' | 'gallery';

export const usePaymentImagePicker = () => {
  const [proofImages, setProofImages] = useState<string[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  // How the proof photos were obtained (camera capture vs gallery import) —
  // recorded on the server-side attestation/audit trail for fraud protection.
  const [source, setSource] = useState<ProofImageSource | undefined>(undefined);
  const [capturedAt, setCapturedAt] = useState<string | undefined>(undefined);

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
        setSource(fromCamera ? 'camera' : 'gallery');
        setCapturedAt(new Date().toISOString());
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
    source,
    capturedAt,
  };
};
