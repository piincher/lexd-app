import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { PhotoGallery } from '@src/shared/ui/PhotoGallery';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface GoodsPhotoSectionProps {
  photoUrls?: string[];
  goodsId?: string;
}

export const GoodsPhotoSection: React.FC<GoodsPhotoSectionProps> = ({ photoUrls }) => {
  const { colors } = useAppTheme();
  const urls = photoUrls?.filter(Boolean) || [];

  return (
    <Card style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Card.Content>
        <View style={styles.header}>
          <Ionicons name="images-outline" size={20} color={Theme.primary[600]} />
          <Text style={[styles.title, { color: colors.text.primary }]}>
            Photos de la marchandise
          </Text>
        </View>
        {urls.length > 0 ? (
          <PhotoGallery photoUrls={urls} imageHeight={140} showCounter />
        ) : (
          <View style={[styles.empty, { backgroundColor: colors.neutral[50] }]}>
            <Ionicons name="images-outline" size={40} color={colors.text.disabled} />
            <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
              Aucune photo disponible
            </Text>
            <View style={styles.ctaRow}>
              <Ionicons name="cloud-upload-outline" size={16} color={Theme.primary[600]} />
              <Text style={[styles.ctaText, { color: Theme.primary[600] }]}>
                Ajouter des photos
              </Text>
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12, borderRadius: Theme.radius.lg },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '700', marginLeft: 10 },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    borderRadius: Theme.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  emptyText: { fontSize: 14, fontWeight: '500', marginTop: 8 },
  ctaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 },
  ctaText: { fontSize: 13, fontWeight: '600' },
});
