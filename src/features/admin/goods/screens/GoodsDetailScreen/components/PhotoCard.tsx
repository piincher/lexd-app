import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { styles } from '../GoodsDetailScreen.styles';

interface PhotoCardProps {
  photoUrl?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photoUrl }) => {
  if (!photoUrl) return null;

  return (
    <Card style={styles.photoCard}>
      <Image source={{ uri: photoUrl }} style={styles.photo} resizeMode="cover" />
      <View style={styles.photoOverlay}>
        <Text style={styles.photoLabel}>Photo de la marchandise</Text>
      </View>
    </Card>
  );
};
