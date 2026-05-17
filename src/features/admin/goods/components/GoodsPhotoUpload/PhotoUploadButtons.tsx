import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsPhotoUpload.styles';

interface PhotoUploadButtonsProps {
  onTakePhoto: () => void;
  onPickImage: () => void;
}

export const PhotoUploadButtons: React.FC<PhotoUploadButtonsProps> = ({ onTakePhoto, onPickImage }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.uploadContainer}>
      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          onPress={onTakePhoto}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="camera"
          textColor={colors.status.success}
        >
          Prendre photo
        </Button>
        <Button
          mode="outlined"
          onPress={onPickImage}
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
  );
};
