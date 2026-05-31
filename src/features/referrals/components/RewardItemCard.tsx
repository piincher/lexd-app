import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardItem } from '../types';
import { createStyles } from './RewardItemCard.styles';

interface RewardItemCardProps {
  item: RewardItem;
  userPoints: number;
  onPress: (item: RewardItem) => void;
}

const PICKUP_CONFIG: Record<string, { label: string; icon: string; colorKey: string }> = {
  PICKUP: { label: 'Retrait', icon: 'store-outline', colorKey: 'info' },
  DELIVERY: { label: 'Livraison', icon: 'truck-delivery-outline', colorKey: 'success' },
};

export const RewardItemCard: React.FC<RewardItemCardProps> = ({
  item,
  userPoints,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const canAfford = userPoints >= item.pointsRequired;
  const missing = item.pointsRequired - userPoints;
  const inStock = item.stock > 0;
  const affordable = canAfford && inStock;
  // Progress toward this reward (0–1), for the "saving toward it" state.
  const progress = item.pointsRequired > 0
    ? Math.max(0, Math.min(1, userPoints / item.pointsRequired))
    : 0;
  const pickup = PICKUP_CONFIG[item.pickupMethod] || PICKUP_CONFIG.PICKUP;
  const pickupColor =
    (colors.status as Record<string, string>)[pickup.colorKey] ||
    colors.text.secondary;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
      disabled={!canAfford || item.stock <= 0}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      {affordable && (
        <View style={{ position: 'absolute', top: 8, left: 8, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.status.success, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 }}>
          <MaterialCommunityIcons name="check-circle" size={11} color={colors.text.inverse} />
          <Text style={{ color: colors.text.inverse, fontSize: 10, fontWeight: '800' }}>Échangeable</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.metaRow}>
          <View
            style={[styles.badge, { backgroundColor: pickupColor + '18' }]}
          >
            <MaterialCommunityIcons
              name={pickup.icon as any}
              size={10}
              color={pickupColor}
            />
            <Text style={[styles.badgeLabel, { color: pickupColor }]}>
              {pickup.label}
            </Text>
          </View>
          <Text style={styles.stock}>Stock: {item.stock}</Text>
        </View>
        <Text style={styles.points}>{item.pointsRequired} pts</Text>
      </View>

      {item.stock <= 0 && (
        <View style={styles.lockedOverlay}>
          <MaterialCommunityIcons name="lock-outline" size={20} color={colors.text.inverse} />
          <Text style={styles.lockedText}>Rupture de stock</Text>
        </View>
      )}

      {item.stock > 0 && !canAfford && (
        <View style={styles.lockedOverlay}>
          <Text style={styles.lockedText}>Encore {missing} pts</Text>
          <View style={{ width: '78%', height: 5, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.3)', marginTop: 8, overflow: 'hidden' }}>
            <View style={{ width: `${progress * 100}%`, height: 5, borderRadius: 999, backgroundColor: colors.status.warning }} />
          </View>
          <Text style={[styles.lockedText, { fontSize: 11, marginTop: 6, opacity: 0.9 }]}>
            {userPoints} / {item.pointsRequired} pts
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
