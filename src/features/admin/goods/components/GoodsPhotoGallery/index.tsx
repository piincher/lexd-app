/**
 * GoodsPhotoGallery - Display goods photos
 * SRP: Show photo grid with upload functionality
 */

import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './GoodsPhotoGallery.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsPhotoGalleryProps {
  photos: string[];
  onUpload?: () => void;
  onView?: (index: number) => void;
}

export const GoodsPhotoGallery: React.FC<GoodsPhotoGalleryProps> = ({
  photos,
  onUpload,
  onView,
}) => {
  const safePhotos = Array.isArray(photos) ? photos : [];
  const hasPhotos = safePhotos.length > 0;

  const { colors, isDark } = useAppTheme();

  const styles = createStyles(colors, isDark);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="image-multiple" size={20} color={colors.primary[600]} />
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.count}>({safePhotos.length})</Text>
        </View>

        {hasPhotos ? (
          <View style={styles.gallery}>
            {safePhotos.slice(0, 4).map((photo, index) => (
              <TouchableOpacity
                key={index}
                style={styles.photoContainer}
                onPress={() => onView?.(index)}
              >
                <Image source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
                {index === 3 && safePhotos.length > 4 && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>+{safePhotos.length - 4}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="image-off" size={48} color={colors.neutral[300]} />
            <Text style={styles.emptyText}>Aucune photo</Text>
          </View>
        )}

        {onUpload && (
          <Button
            mode="outlined"
            onPress={onUpload}
            style={styles.uploadButton}
            icon="camera"
            textColor={colors.primary[600]}
          >
            Ajouter une photo
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};
