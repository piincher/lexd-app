/**
 * ShipmentHero — gradient identity header shared by the Airway Bill and
 * Cargo Bag detail screens.
 *
 * One glance answers: what is this, what's its status, where is it on the
 * journey, and where is it going. Designed to replace the old plain back-bar +
 * buried info card so the screen has a single, clear anchor.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export interface HeroMetaChip {
  icon: MaterialIconName;
  label: string;
}

interface ShipmentHeroProps {
  icon: MaterialIconName;
  /** Small uppercase eyebrow, e.g. "Airway Bill" or "Sac de cargo". */
  eyebrow: string;
  /** Primary identifier — AWB number / bag number. */
  title: string;
  statusLabel: string;
  statusColor: string;
  /** Optional route endpoints, rendered as "FROM ✈ TO". */
  routeFrom?: string;
  routeTo?: string;
  /** Secondary line under the route (airline · flight, parent AWB, route name). */
  subtitle?: string;
  /** Journey progress 0–100. */
  progress?: number;
  progressLabel?: string;
  metaChips?: HeroMetaChip[];
  onBack: () => void;
  rightSlot?: React.ReactNode;
}

const ON_HERO = '#FFFFFF';
const ON_HERO_DIM = 'rgba(255,255,255,0.78)';
const ON_HERO_TRACK = 'rgba(255,255,255,0.25)';

export const ShipmentHero: React.FC<ShipmentHeroProps> = ({
  icon,
  eyebrow,
  title,
  statusLabel,
  statusColor,
  routeFrom,
  routeTo,
  subtitle,
  progress,
  progressLabel,
  metaChips = [],
  onBack,
  rightSlot,
}) => {
  const { colors } = useAppTheme();
  const hasRoute = !!routeFrom && !!routeTo;
  const clampedProgress = Math.max(0, Math.min(100, Math.round(progress ?? 0)));

  return (
    <LinearGradient
      colors={[colors.primary[700], colors.primary[500]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} hitSlop={10} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color={ON_HERO} />
        </TouchableOpacity>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <View style={styles.rightSlot}>{rightSlot}</View>
      </View>

      <View style={styles.identityRow}>
        <View style={styles.iconBadge}>
          <MaterialCommunityIcons name={icon} size={24} color={ON_HERO} />
        </View>
        <View style={styles.identityText}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {!!subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        <View style={[styles.statusPill, { backgroundColor: ON_HERO }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]} numberOfLines={1}>
            {statusLabel}
          </Text>
        </View>
      </View>

      {hasRoute && (
        <View style={styles.routeRow}>
          <Text style={styles.routeEndpoint} numberOfLines={1}>
            {routeFrom}
          </Text>
          <View style={styles.routeLine}>
            <View style={styles.routeDash} />
            <MaterialCommunityIcons name="airplane" size={16} color={ON_HERO} />
            <View style={styles.routeDash} />
          </View>
          <Text style={[styles.routeEndpoint, styles.routeEndpointEnd]} numberOfLines={1}>
            {routeTo}
          </Text>
        </View>
      )}

      {typeof progress === 'number' && (
        <View style={styles.progressBlock}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>{progressLabel || 'Progression'}</Text>
            <Text style={styles.progressPct}>{clampedProgress}%</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: ON_HERO_TRACK }]}>
            <View style={[styles.progressFill, { width: `${clampedProgress}%`, backgroundColor: ON_HERO }]} />
          </View>
        </View>
      )}

      {metaChips.length > 0 && (
        <View style={styles.chipsRow}>
          {metaChips.map((chip, i) => (
            <View key={`${chip.label}-${i}`} style={styles.chip}>
              <MaterialCommunityIcons name={chip.icon} size={13} color={ON_HERO_DIM} />
              <Text style={styles.chipText} numberOfLines={1}>
                {chip.label}
              </Text>
            </View>
          ))}
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 18,
    paddingTop: 14,
    gap: 16,
  },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  eyebrow: {
    flex: 1,
    color: ON_HERO_DIM,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  rightSlot: { minWidth: 32, alignItems: 'flex-end' },
  identityRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  identityText: { flex: 1 },
  title: { color: ON_HERO, fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
  subtitle: { color: ON_HERO_DIM, fontSize: 13, marginTop: 2, fontWeight: '500' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    maxWidth: 130,
  },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: '800' },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  routeEndpoint: { color: ON_HERO, fontSize: 16, fontWeight: '800', flex: 1 },
  routeEndpointEnd: { textAlign: 'right' },
  routeLine: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1.4, justifyContent: 'center' },
  routeDash: { flex: 1, height: 1.5, backgroundColor: ON_HERO_TRACK, borderRadius: 1 },
  progressBlock: { gap: 7 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { color: ON_HERO_DIM, fontSize: 12, fontWeight: '600' },
  progressPct: { color: ON_HERO, fontSize: 12, fontWeight: '800' },
  progressTrack: { height: 7, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 999 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { color: ON_HERO, fontSize: 12, fontWeight: '600' },
});

export default ShipmentHero;
