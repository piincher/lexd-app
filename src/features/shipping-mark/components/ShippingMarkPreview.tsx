import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ShippingMarkPreviewProps {
  imageUrl: string;
  isLoading?: boolean;
}

export const ShippingMarkPreview: React.FC<ShippingMarkPreviewProps> = ({ imageUrl, isLoading }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.paper }]}>
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
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
