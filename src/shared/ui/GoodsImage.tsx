/**
 * GoodsImage - Theme-aware image component with loading and error states
 *
 * Uses expo-image for optimized image rendering with blurhash placeholder,
 * shimmer loading state, and fallback UI on error or missing URI.
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface GoodsImageProps {
  uri?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  resizeMode?: 'cover' | 'contain' | 'fill';
  style?: ViewStyle;
  showPlaceholder?: boolean;
  placeholderSize?: 'small' | 'medium' | 'large';
}

const PLACEHOLDER_SIZES = {
  small: { icon: 24, fontSize: 12 },
  medium: { icon: 40, fontSize: 14 },
  large: { icon: 56, fontSize: 16 },
};

// Subtle neutral blurhash for loading placeholder
const BLURHASH_PLACEHOLDER = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

export const GoodsImage: React.FC<GoodsImageProps> = ({
  uri,
  width = 140,
  height = 140,
  borderRadius = 8,
  resizeMode = 'cover',
  style,
  showPlaceholder = true,
  placeholderSize = 'medium',
}) => {
  const { colors, isDark } = useAppTheme();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const shouldShowPlaceholder = !uri || hasError;

  const containerStyle: ViewStyle = {
    width,
    height,
    borderRadius,
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    overflow: 'hidden',
  };

  const { icon: iconSize, fontSize } = PLACEHOLDER_SIZES[placeholderSize];

  if (shouldShowPlaceholder && showPlaceholder) {
    return (
      <View style={[styles.placeholderContainer, containerStyle, style]}>
        <Ionicons
          name="cube-outline"
          size={iconSize}
          color={colors.text.secondary}
        />
        <Text
          style={[
            styles.placeholderText,
            { color: colors.text.secondary, fontSize },
          ]}
        >
          Image indisponible
        </Text>
      </View>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      <Image
        source={{ uri }}
        style={styles.image}
        contentFit={resizeMode}
        transition={300}
        placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        cachePolicy="memory-disk"
      />
      {isLoading && !hasError && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.shimmerOverlay,
            { backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100] },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  placeholderText: {
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  shimmerOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GoodsImage;
