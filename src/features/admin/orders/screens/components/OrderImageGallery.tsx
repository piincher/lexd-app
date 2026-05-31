import React, { useState } from 'react';
import { View, Image, Pressable, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { imagesType } from '@src/shared/types/order';
import { createStyles } from './OrderImageGallery.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface OrderImageGalleryProps {
  images?: imagesType;
  /** Goods photos (URLs) used when the order has no images of its own. */
  fallbackPhotos?: string[];
}

export const OrderImageGallery: React.FC<OrderImageGalleryProps> = ({ images, fallbackPhotos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  // Prefer the order's own images; otherwise fall back to aggregated goods photos
  // so warehouse-intake pictures still surface on the order.
  const galleryImages: imagesType =
    images && images.length > 0
      ? images
      : (fallbackPhotos || []).map((url, index) => ({ url, public_id: `goods-${index}` }));
  const fromGoods = !(images && images.length > 0) && galleryImages.length > 0;
  const hasImages = galleryImages.length > 0;

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

  const safeIndex = Math.min(activeIndex, galleryImages.length - 1);

  return (
    <Surface style={styles.container}>
      {/* Main image */}
      <Image
        source={{ uri: galleryImages[safeIndex].url }}
        style={styles.mainImage}
        resizeMode="cover"
      />

      {/* Image count badge */}
      <View style={styles.countBadge}>
        <MaterialCommunityIcons name="image-multiple" size={14} color={colors.text.inverse} />
        <Text style={styles.countText}>
          {safeIndex + 1}/{galleryImages.length}
        </Text>
      </View>

      {/* Source caption when photos come from the linked goods */}
      {fromGoods && (
        <View style={styles.sourceBadge}>
          <MaterialCommunityIcons name="package-variant-closed" size={12} color={colors.text.inverse} />
          <Text style={styles.countText}>Photos des marchandises</Text>
        </View>
      )}

      {/* Thumbnails (if multiple images) */}
      {galleryImages.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailRow}
        >
          {galleryImages.map((img, index) => (
            <Pressable
              key={img.public_id || index}
              onPress={() => setActiveIndex(index)}
              style={[
                styles.thumbnail,
                index === safeIndex && styles.thumbnailActive,
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
