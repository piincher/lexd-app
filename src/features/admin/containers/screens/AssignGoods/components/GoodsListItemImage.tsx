import React from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './GoodsListItem.styles';

interface GoodsListItemImageProps {
  photoUrls: string[];
}

export const GoodsListItemImage: React.FC<GoodsListItemImageProps> = ({ photoUrls }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const hasPhoto = photoUrls.length > 0;
  return (
    <View style={styles.imageContainer}>
      {hasPhoto ? (
        <Image source={{ uri: photoUrls[0] }} style={styles.image} />
      ) : (
        <LinearGradient colors={[colors.background.paper, colors.background.default]} style={styles.placeholderImage}>
          <Ionicons name="cube" size={24} color={colors.primary[400]} />
        </LinearGradient>
      )}
    </View>
  );
};
