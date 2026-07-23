import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@src/shared/ui/Button';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { uploadAnnouncementImage } from '../../../api/uploadAnnouncementImage';

interface Props {
  label?: string;
  value?: string | null;
  onChange: (url: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

export const AnnouncementImagePicker: React.FC<Props> = ({ label, value, onChange, onClear, disabled, onUploadingChange }) => {
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
    onUploadingChange?.(true);
    try {
      const url = await uploadAnnouncementImage(pickedUri);
      onChange(url);
    } catch {
      Alert.alert('Erreur', "Impossible d'envoyer l'image. Veuillez réessayer.");
    } finally {
      setIsUploading(false);
      setLocalPreview(null);
      onUploadingChange?.(false);
    }
  };

  const previewUri = value || localPreview;

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>}
      {previewUri ? (
        <View style={styles.previewWrapper}>
          <Image source={{ uri: previewUri }} style={styles.image} resizeMode="cover" />
          {isUploading && (
            <View style={styles.overlay}>
              <ActivityIndicator color={colors.text.inverse} />
            </View>
          )}
          <View style={styles.actions}>
            <Button
              title={isUploading ? 'Envoi…' : "Changer"}
              variant="outline"
              size="small"
              onPress={handlePick}
              disabled={disabled || isUploading}
            />
            {!!onClear && !isUploading && (
              <Pressable onPress={onClear} hitSlop={8} style={styles.clear} accessibilityLabel="Retirer l'image">
                <Ionicons name="trash-outline" size={18} color={colors.status.error} />
                <Text style={[styles.clearText, { color: colors.status.error }]}>Retirer</Text>
              </Pressable>
            )}
          </View>
        </View>
      ) : (
        <Button
          title={isUploading ? 'Envoi…' : 'Ajouter une image'}
          variant="outline"
          size="small"
          onPress={handlePick}
          disabled={disabled || isUploading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 4, gap: 6 },
  label: { fontSize: 13, fontWeight: '600' },
  previewWrapper: { borderRadius: 10, overflow: 'hidden' },
  image: { width: '100%', height: 150, borderRadius: 10, backgroundColor: '#e5e7eb' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 8 },
  clear: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  clearText: { fontSize: 13, fontWeight: '600' },
});
