import React, { useMemo } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface PhotoCardProps {
  photoUrls?: string[];
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photoUrls }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const urls = photoUrls?.filter(Boolean) || [];
  if (urls.length === 0) return null;

  return (
    <Card style={styles.photoCard}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {urls.map((url, index) => (
          <View key={`${url}_${index}`} style={styles.photoWrapper}>
            <Image source={{ uri: url }} style={styles.photo} resizeMode="cover" />
            {urls.length > 1 && (
              <View style={styles.photoBadge}>
                <Text style={styles.photoBadgeText}>
                  {index + 1}/{urls.length}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.photoOverlay}>
        <Text style={styles.photoLabel}>
          {urls.length > 1 ? 'Photos de la marchandise' : 'Photo de la marchandise'}
        </Text>
      </View>
    </Card>
  );
};
