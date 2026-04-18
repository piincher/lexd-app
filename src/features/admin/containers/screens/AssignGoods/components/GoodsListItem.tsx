import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { Badge } from '@src/components/ui/Badge/Badge';
import { Theme } from '@src/constants/Theme';
import { Goods } from '../../../../goods/types';

interface GoodsListItemProps {
  goods: Goods;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}

export const GoodsListItem: React.FC<GoodsListItemProps> = ({
  goods,
  isSelected,
  onToggle,
  index,
}) => {
  const clientName = (() => {
    if (typeof goods.clientId === 'object' && goods.clientId) {
      return `${goods.clientId.firstName} ${goods.clientId.lastName}`;
    }
    return 'Client inconnu';
  })();

  const hasPhoto = goods.photos && goods.photos.length > 0;

  return (
    <Animated.View entering={FadeInUp.delay(index * 50).springify()} layout={Layout.springify()}>
      <TouchableOpacity style={[styles.goodsCard, isSelected && styles.goodsCardSelected]} onPress={onToggle}>
        {/* Selection Checkbox */}
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <Ionicons name="checkmark" size={18} color="#FFF" />}
          </View>
        </View>
        {/* Goods Image */}
        <View style={styles.imageContainer}>
          {hasPhoto ? (
            <Image source={{ uri: goods.photos[0] }} style={styles.image} />
          ) : (
            <LinearGradient colors={['#F3F0FF', '#E8E4F3']} style={styles.placeholderImage}>
              <Ionicons name="cube" size={24} color={Theme.primary[400]} />
            </LinearGradient>
          )}
        </View>
        {/* Goods Info */}
        <View style={styles.goodsInfo}>
          <View style={styles.goodsHeader}>
            <Text style={styles.goodsId}>{goods.goodsId}</Text>
            <Badge label={goods.shippingMode === 'AIR' ? `${(parseFloat(String(goods.weight)) || 0).toFixed(2)} kg` : `${(goods.actualCBM || 0).toFixed(3)} m³`} variant="primary" size="small" />
          </View>
          <Text style={styles.description} numberOfLines={1}>{goods.description || 'Sans description'}</Text>
          <View style={styles.goodsMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="person-outline" size={12} color={Theme.neutral[400]} />
              <Text style={styles.metaText} numberOfLines={1}>{clientName}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="scale-outline" size={12} color={Theme.neutral[400]} />
              <Text style={styles.metaText}>{goods.weight} kg</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  goodsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goodsCardSelected: {
    borderColor: Theme.primary[500],
    backgroundColor: Theme.primary[50],
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Theme.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Theme.primary[500],
    borderColor: Theme.primary[500],
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goodsInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  goodsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  goodsId: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[900],
  },
  description: {
    fontSize: 12,
    color: Theme.neutral[600],
    marginBottom: 6,
  },
  goodsMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: Theme.neutral[500],
  },
});
