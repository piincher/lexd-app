/* Hallmark · component: stat-card · genre: modern-minimal · theme: brand-aligned app theme
 * states: default · loading (progress bar + value)
 * pre-emit critique: P4 H5 E4 S4 R5 V4
 */
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { SkeletonBlock } from './GoodsListSkeleton';

interface GoodsListStatCardProps {
  value: number;
  label: string;
  icon: string;
  accentColor: string;
  progress?: number; // 0..1 — share of total
  loading?: boolean;
}

export const GoodsListStatCard: React.FC<GoodsListStatCardProps> = ({
  value,
  label,
  icon,
  accentColor,
  progress = 0,
  loading = false,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const pct = Math.max(0, Math.min(1, progress));
  const pctLabel = `${Math.round(pct * 100)}%`;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.labelGroup}>
          <Ionicons name={icon as any} size={15} color={accentColor} />
          <Text style={styles.label}>{label}</Text>
        </View>
        {!loading && <Text style={[styles.pct, { color: accentColor }]}>{pctLabel}</Text>}
      </View>

      {loading ? (
        <SkeletonBlock width={48} height={26} radius={Theme.radius.sm} style={styles.valueSkeleton} />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}

      <View style={styles.track}>
        <View style={[styles.fill, { backgroundColor: accentColor, width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.background.card,
      borderRadius: Theme.radius.xl,
      padding: Theme.spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      ...Theme.shadows.sm,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Theme.spacing.sm,
    },
    labelGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexShrink: 1,
    },
    label: {
      fontSize: 12.5,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    pct: {
      fontSize: 12,
      fontWeight: '800',
    },
    value: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.text.primary,
      marginBottom: Theme.spacing.sm,
    },
    valueSkeleton: {
      marginBottom: Theme.spacing.sm + 4,
      marginTop: 2,
    },
    track: {
      height: 5,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.neutral[200],
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: Theme.radius.full,
    },
  });

export default GoodsListStatCard;
