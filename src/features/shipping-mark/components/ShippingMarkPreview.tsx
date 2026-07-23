import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE } from '@src/shared/ui/designLanguage';

interface ShippingMarkPreviewProps {
  imageUrl: string;
  isLoading?: boolean;
}

export const ShippingMarkPreview: React.FC<ShippingMarkPreviewProps> = ({ imageUrl, isLoading }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.paper, borderColor: colors.border }]}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary.main} />
      ) : (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: HAIRLINE,
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
