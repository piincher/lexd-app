/**
 * GoodsCardImage - Photo thumbnail with GoodsImage and status badge
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GoodsImage } from '@src/shared/ui/GoodsImage';
import { Badge } from '@src/components/ui/Badge/Badge';
import { Theme } from '@src/constants/Theme';
import { getStatusConfig } from './GoodsCardStatus';

interface GoodsCardImageProps {
  photoUrls: string[];
  status: string;
}

export const GoodsCardImage: React.FC<GoodsCardImageProps> = ({ photoUrls, status }) => {
  const hasPhoto = photoUrls.length > 0;
  const statusConfig = getStatusConfig(status);

  return (
    <View style={styles.container}>
      {hasPhoto ? (
        <GoodsImage
          uri={photoUrls[0]}
          width={140}
          height={140}
          borderRadius={Theme.radius.lg}
          resizeMode="cover"
          showPlaceholder
          placeholderSize="medium"
        />
      ) : (
        <LinearGradient
          colors={['#F3F0FF', '#E8E4F3']}
          style={styles.placeholder}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="cube" size={28} color={Theme.primary[500]} />
          </View>
        </LinearGradient>
      )}

      <View style={styles.badge}>
        <Badge
          label={statusConfig.label}
          variant={statusConfig.variant}
          size="small"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: Theme.neutral[200],
  },
  placeholder: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  badge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});
