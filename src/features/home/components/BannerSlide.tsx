import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import type { PromoBanner } from '@src/shared/api/promos';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './Banner.styles';

interface BannerSlideProps {
  banner: PromoBanner;
  onPress: (banner: PromoBanner) => void;
}

export const BannerSlide: React.FC<BannerSlideProps> = ({ banner, onPress }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <TouchableOpacity
      activeOpacity={banner.linkType === 'NONE' ? 1 : 0.8}
      onPress={() => onPress(banner)}
    >
      <Image
        source={{ uri: banner.imageUrl }}
        style={styles.bannerImage}
      />
    </TouchableOpacity>
  );
};
