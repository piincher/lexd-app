import React, { useState, useMemo } from 'react';
import { View, Image, Pressable, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { imagesType } from '@src/api/order';
import { createStyles } from './OrderImageGallery.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface OrderImageGalleryProps {
  images?: imagesType;
}

export const OrderImageGallery: React.FC<OrderImageGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const hasImages = images && images.length > 0;

  if (!hasImages) {
    return (
      <Surface style={styles.container}>
        <View style={styles.placeholder}>
          <MaterialCommunityIcons name="package-variant" size={48} color={colors.text.disabled} />
          <Text style={styles.placeholderText}>Aucune photo disponible</Text>
        </View>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      {/* Main image */}
      <Image
        source={{ uri: images[activeIndex].url }}
        style={styles.mainImage}
        resizeMode="cover"
      />

      {/* Image count badge */}
      <View style={styles.countBadge}>
        <MaterialCommunityIcons name="image-multiple" size={14} color={colors.text.inverse} />
        <Text style={styles.countText}>
          {activeIndex + 1}/{images.length}
        </Text>
      </View>

      {/* Thumbnails (if multiple images) */}
      {images.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailRow}
        >
          {images.map((img, index) => (
            <Pressable
              key={img.public_id || index}
              onPress={() => setActiveIndex(index)}
              style={[
                styles.thumbnail,
                index === activeIndex && styles.thumbnailActive,
              ]}
            >
              <Image
                source={{ uri: img.url }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </ScrollView>
      )}
    </Surface>
  );
};

export default OrderImageGallery;
