/**
 * GoodsPhotoGallery - Display goods photos
 * SRP: Show photo grid with upload functionality
 */

import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './GoodsPhotoGallery.styles';

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
  const hasPhotos = photos && photos.length > 0;

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="image-multiple" size={20} color={Theme.primary[600]} />
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.count}>({photos?.length || 0})</Text>
        </View>

        {hasPhotos ? (
          <View style={styles.gallery}>
            {photos.slice(0, 4).map((photo, index) => (
              <TouchableOpacity
                key={index}
                style={styles.photoContainer}
                onPress={() => onView?.(index)}
              >
                <Image source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
                {index === 3 && photos.length > 4 && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>+{photos.length - 4}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="image-off" size={48} color={Theme.neutral[300]} />
            <Text style={styles.emptyText}>Aucune photo</Text>
          </View>
        )}

        {onUpload && (
          <Button
            mode="outlined"
            onPress={onUpload}
            style={styles.uploadButton}
            icon="camera"
            textColor={Theme.primary[600]}
          >
            Ajouter une photo
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};
