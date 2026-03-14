// GoodsDetailPhoto - Photo display section

import React from 'react';
import { View, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';

interface GoodsDetailPhotoProps {
  photoUrl?: string;
}

export const GoodsDetailPhoto: React.FC<GoodsDetailPhotoProps> = ({ photoUrl }) => {
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

const styles = {
  photoCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden' as const,
    elevation: 3,
  },
  photo: {
    width: '100%' as const,
    height: 200,
  },
  photoOverlay: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
  },
  photoLabel: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600' as const,
  },
};
