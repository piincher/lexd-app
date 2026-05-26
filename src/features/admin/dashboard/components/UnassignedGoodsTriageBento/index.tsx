/* Hallmark · macrostructure: Bento Grid · genre: modern-minimal · tone: utilitarian
 * theme: brand-aligned app theme · irregular tile composition for triage
 * Surfaces the four signals an operator triages on before opening the queue:
 *   1. Total parcels in the queue (hero tile)
 *   2. Oldest waiting parcel — semantic urgency tint (red ≥8d, amber ≥4d, green <4d)
 *   3. AIR breakdown
 *   4. SEA breakdown
 * Tile sizes are intentionally varied (the hero spans 2 rows) — Bento's signature.
 * pre-emit critique: P5 H5 E4 S5 R5 V5
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface TriageBentoProps {
  total: number;
  oldestDays: number;
  airCount: number;
  seaCount: number;
}

const urgencyTone = (days: number, colors: any) => {
  if (days >= 8) return { fg: colors.status.error, bg: colors.feedback.errorBg, label: 'Urgent' };
  if (days >= 4) return { fg: colors.status.warning, bg: colors.feedback.warningBg, label: 'À traiter' };
  return { fg: colors.status.success, bg: colors.feedback.successBg, label: 'OK' };
};

export const UnassignedGoodsTriageBento: React.FC<TriageBentoProps> = ({
  total,
  oldestDays,
  airCount,
  seaCount,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const urgency = urgencyTone(oldestDays, colors);

  return (
    <View style={styles.bento}>
      {/* Left column — the hero tile (spans full column height). */}
      <View style={[styles.tile, styles.heroTile]}>
        <Text style={styles.heroLabel}>EN ATTENTE</Text>
        <Text style={styles.heroValue} numberOfLines={1}>{total}</Text>
        <Text style={styles.heroCaption}>
          marchandise{total > 1 ? 's' : ''} à assigner
        </Text>
        <View style={styles.heroFootRow}>
          <MaterialCommunityIcons name="package-variant-closed" size={14} color={colors.primary.main} />
          <Text style={styles.heroFoot}>Queue de réception</Text>
        </View>
      </View>

      {/* Right column — three stacked tiles (oldest, AIR, SEA). */}
      <View style={styles.rightCol}>
        <View style={[styles.tile, styles.urgencyTile, { backgroundColor: total > 0 ? urgency.bg : colors.background.card }]}>
          <Text style={[styles.smallLabel, { color: total > 0 ? urgency.fg : colors.text.secondary }]}>
            PLUS ANCIEN
          </Text>
          <View style={styles.urgencyValueRow}>
            <Text style={[styles.urgencyValue, { color: total > 0 ? urgency.fg : colors.text.disabled }]}>
              {total > 0 ? oldestDays : 0}
            </Text>
            <Text style={[styles.urgencyUnit, { color: total > 0 ? urgency.fg : colors.text.disabled }]}>
              {total > 0 ? 'jours' : '—'}
            </Text>
          </View>
          {total > 0 ? (
            <View style={[styles.urgencyBadge, { borderColor: urgency.fg }]}>
              <Text style={[styles.urgencyBadgeText, { color: urgency.fg }]}>{urgency.label}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.modeRow}>
          <View style={[styles.tile, styles.modeTile]}>
            <View style={styles.modeHeader}>
              <MaterialCommunityIcons name="airplane" size={14} color={colors.primary.main} />
              <Text style={styles.modeLabel}>AÉRIEN</Text>
            </View>
            <Text style={styles.modeValue}>{airCount}</Text>
          </View>
          <View style={[styles.tile, styles.modeTile]}>
            <View style={styles.modeHeader}>
              <MaterialCommunityIcons name="ferry" size={14} color={colors.primary.main} />
              <Text style={styles.modeLabel}>MARITIME</Text>
            </View>
            <Text style={styles.modeValue}>{seaCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any, _isDark?: boolean) =>
  StyleSheet.create({
    bento: {
      flexDirection: 'row',
      gap: 10,
      marginHorizontal: 16,
      marginTop: 12,
      marginBottom: 8,
    },
    tile: {
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 14,
      ...Theme.shadows.sm,
    },
    // Hero — spans full column on the left, larger padding, dominant number.
    heroTile: {
      flex: 1.15,
      justifyContent: 'space-between',
      minHeight: 168,
      borderColor: colors.primary[100],
      backgroundColor: colors.primary[50],
    },
    heroLabel: {
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.7,
      color: colors.primary[700],
    },
    heroValue: {
      fontSize: 52,
      fontWeight: '800',
      letterSpacing: -1.5,
      color: colors.primary.dark,
      marginTop: 4,
      fontVariant: ['tabular-nums'],
    },
    heroCaption: {
      fontSize: 12,
      color: colors.primary[700],
      marginTop: 2,
    },
    heroFootRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 12,
    },
    heroFoot: {
      fontSize: 11,
      color: colors.primary[700],
      fontWeight: '600',
    },
    rightCol: {
      flex: 1,
      gap: 10,
    },
    urgencyTile: {
      minHeight: 78,
      justifyContent: 'space-between',
    },
    smallLabel: {
      fontSize: 9.5,
      fontWeight: '800',
      letterSpacing: 0.6,
    },
    urgencyValueRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 4,
      marginTop: 4,
    },
    urgencyValue: {
      fontSize: 28,
      fontWeight: '800',
      letterSpacing: -0.5,
      fontVariant: ['tabular-nums'],
    },
    urgencyUnit: {
      fontSize: 12,
      fontWeight: '700',
    },
    urgencyBadge: {
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 8,
      paddingVertical: 2,
      marginTop: 6,
    },
    urgencyBadgeText: {
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.3,
    },
    modeRow: {
      flexDirection: 'row',
      gap: 10,
      flex: 1,
    },
    modeTile: {
      flex: 1,
      justifyContent: 'space-between',
      minHeight: 78,
    },
    modeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    modeLabel: {
      fontSize: 9.5,
      fontWeight: '800',
      letterSpacing: 0.5,
      color: colors.text.secondary,
    },
    modeValue: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text.primary,
      letterSpacing: -0.5,
      fontVariant: ['tabular-nums'],
    },
  });
