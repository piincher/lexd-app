import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';

interface GoodsPhotoGridProps {
  photoUris: string[];
  onRemove: (uri: string) => void;
  colors: any;
  styles: any;
}

export const GoodsPhotoGrid: React.FC<GoodsPhotoGridProps> = ({
  photoUris,
  onRemove,
  colors,
  styles,
}) => (
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
          onPress={() => onRemove(uri)}
        />
      </View>
    ))}
  </ScrollView>
);
