import React from 'react';
import { View, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsPhotoUpload.styles';

interface PhotoPreviewProps {
  photoUri: string;
  onPhotoRemoved: () => void;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photoUri, onPhotoRemoved }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
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
  );
};
