/**
 * RewardVisuals — shared visual language for the "Articles de récompense" section.
 *
 * One source of truth for the loyalty look (gold points, stock meters, status
 * chips) so the catalogue list and the article form read as one designed
 * surface, not two screens that happen to live in the same folder.
 *
 * Hallmark · component-set · genre: premium-loyalty · theme: gold-on-green
 * tokens: useAppTheme() only — no inline hex. Motion: transform/opacity only.
 */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

// Gradients live on the static Theme export, not on useAppTheme()'s `colors`.
// Gold is theme-independent, so reading it statically is safe in light + dark.
const GOLD_GRADIENT = Theme.gradients.gold;

const frenchInt = (n: number) => n.toLocaleString('fr-FR');

/** Gold "prix en points" pill — the premium accent of the whole section. */
export const PointsPill: React.FC<{ points: number; size?: 'sm' | 'md' }> = ({ points, size = 'md' }) => {
  const { colors } = useAppTheme();
  const sm = size === 'sm';
  return (
    <LinearGradient
      colors={GOLD_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.pointsPill, sm && styles.pointsPillSm]}
    >
      <Ionicons name="star" size={sm ? 11 : 13} color={colors.text.inverse} />
      <Text style={[styles.pointsText, { color: colors.text.inverse }, sm && styles.pointsTextSm]}>
        {frenchInt(points)} pts
      </Text>
    </LinearGradient>
  );
};

/** Thin stock meter — colour shifts with depletion. `max` defaults to a sensible 50. */
export const StockMeter: React.FC<{ stock: number; max?: number }> = ({ stock, max = 50 }) => {
  const { colors } = useAppTheme();
  const tone =
    stock <= 0 ? colors.status.error : stock <= 10 ? colors.status.warning : colors.status.success;
  const pct = Math.max(0, Math.min(1, stock / Math.max(max, 1)));
  const label = stock <= 0 ? 'Rupture' : `Stock ${frenchInt(stock)}`;
  return (
    <View style={styles.meterWrap}>
      <View style={[styles.meterTrack, { backgroundColor: colors.neutral[200] }]}>
        <View style={[styles.meterFill, { width: `${pct * 100}%`, backgroundColor: tone }]} />
      </View>
      <Text style={[styles.meterLabel, { color: tone }]}>{label}</Text>
    </View>
  );
};

/** Actif / Inactif dot-pill. */
export const StatusPill: React.FC<{ active: boolean }> = ({ active }) => {
  const { colors } = useAppTheme();
  const tone = active ? colors.status.success : colors.text.disabled;
  const bg = active ? colors.feedback.successBg : colors.neutral[100];
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <View style={[styles.dot, { backgroundColor: tone }]} />
      <Text style={[styles.chipText, { color: tone }]}>{active ? 'Actif' : 'Inactif'}</Text>
    </View>
  );
};

/** Retrait / Livraison chip with mode icon. */
export const PickupPill: React.FC<{ method: 'PICKUP' | 'DELIVERY' }> = ({ method }) => {
  const { colors } = useAppTheme();
  const isPickup = method === 'PICKUP';
  return (
    <View style={[styles.chip, { backgroundColor: colors.feedback.infoBg }]}>
      <Ionicons
        name={isPickup ? 'storefront-outline' : 'bicycle-outline'}
        size={12}
        color={colors.status.info}
      />
      <Text style={[styles.chipText, { color: colors.status.info }]}>
        {isPickup ? 'Retrait' : 'Livraison'}
      </Text>
    </View>
  );
};

/** Reward image with a gift fallback. Square, rounded, theme-aware. */
export const RewardThumb: React.FC<{ uri?: string; size?: number; radius?: number }> = ({
  uri,
  size = 64,
  radius = 14,
}) => {
  const { colors } = useAppTheme();
  if (uri) {
    return <Image source={{ uri }} style={{ width: size, height: size, borderRadius: radius, backgroundColor: colors.neutral[200] }} />;
  }
  return (
    <View
      style={[
        styles.thumbFallback,
        { width: size, height: size, borderRadius: radius, backgroundColor: colors.primary[50] },
      ]}
    >
      <Ionicons name="gift-outline" size={size * 0.42} color={colors.primary.main} />
    </View>
  );
};

const styles = StyleSheet.create({
  pointsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pointsPillSm: { paddingHorizontal: 9, paddingVertical: 4 },
  pointsText: { fontFamily: Fonts.bold, fontSize: 13, letterSpacing: 0.2 },
  pointsTextSm: { fontSize: 11 },
  meterWrap: { gap: 5 },
  meterTrack: { height: 6, borderRadius: 999, overflow: 'hidden' },
  meterFill: { height: 6, borderRadius: 999 },
  meterLabel: { fontFamily: Fonts.medium, fontSize: 11 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
  },
  chipText: { fontFamily: Fonts.medium, fontSize: 11.5 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  thumbFallback: { justifyContent: 'center', alignItems: 'center' },
});
