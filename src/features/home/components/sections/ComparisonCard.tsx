/**
 * ComparisonCard
 * ChinaLink vs Others — visually scannable feature comparison
 * with score bars and clean row layout.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { COMPARISON_FEATURES, COMPARISON_SUMMARY } from '../../constants/homeData';
import { SectionHeader } from '../SectionHeader';
import { ComparisonStatusIcon } from './ComparisonStatusIcon';
import { ComparisonScoreBar } from './ComparisonScoreBar';

/* ── Main ── */
export const ComparisonCard: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={styles.container}>
      <SectionHeader
        title="ChinaLink vs Autres"
        subtitle="Decouvrez pourquoi nos clients nous choisissent"
      />

      {/* Score Summary */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(500).springify()}
        style={[styles.scoreCard, { backgroundColor: colors.background.card }]}
      >
        <ComparisonScoreBar score={COMPARISON_SUMMARY.chinalinkScore} total={COMPARISON_SUMMARY.totalFeatures} color="#22C55E" label="ChinaLink Express" />
        <View style={{ height: 14 }} />
        <ComparisonScoreBar score={COMPARISON_SUMMARY.othersScore} total={COMPARISON_SUMMARY.totalFeatures} color="#9CA3AF" label="Autres transporteurs" />
      </Animated.View>

      {/* Table */}
      <Animated.View
        entering={FadeInDown.delay(300).duration(500).springify()}
        style={[styles.card, { backgroundColor: colors.background.card }]}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.featureCol}>
            <Text style={[styles.headerLabel, { color: colors.text.secondary }]}>Criteres</Text>
          </View>
          <View style={styles.brandCol}>
            <LinearGradient colors={['#22C55E', '#15803D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.brandBadge}>
              <FontAwesome6 name="star" size={8} color="#FFF" />
              <Text style={styles.brandBadgeText}>ChinaLink</Text>
            </LinearGradient>
          </View>
          <View style={styles.brandCol}>
            <View style={[styles.othersBadge, { backgroundColor: isDark ? 'rgba(156,163,175,0.12)' : '#F3F4F6' }]}>
              <Text style={[styles.othersBadgeText, { color: colors.text.secondary }]}>Autres</Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Rows */}
        {COMPARISON_FEATURES.map((feature, index) => (
          <View
            key={feature.label}
            style={[
              styles.featureRow,
              index % 2 === 0 && { backgroundColor: isDark ? 'rgba(74,222,128,0.04)' : 'rgba(34,197,94,0.025)' },
            ]}
          >
            <View style={styles.featureCol}>
              <View style={styles.featureLabelRow}>
                <View style={[styles.featureIconCircle, { backgroundColor: `${feature.color}14` }]}>
                  <FontAwesome6 name={feature.icon as any} size={10} color={feature.color} />
                </View>
                <Text style={[styles.featureLabel, { color: colors.text.primary }]} numberOfLines={1}>
                  {feature.label}
                </Text>
              </View>
            </View>
            <View style={styles.brandCol}>
              <ComparisonStatusIcon status={feature.chinalink} />
            </View>
            <View style={styles.brandCol}>
              <ComparisonStatusIcon status={feature.others} />
            </View>
          </View>
        ))}

        {/* Bottom CTA */}
        <LinearGradient colors={['#22C55E', '#16A34A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaStrip}>
          <FontAwesome6 name="trophy" size={14} color="#FFF" />
          <Text style={styles.ctaText}>Le choix #1 Chine → Mali</Text>
          <View style={styles.ctaScore}>
            <Text style={styles.ctaScoreText}>10/10</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Theme.shadows.sm,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  featureCol: {
    flex: 1,
  },
  brandCol: {
    width: 76,
    alignItems: 'center',
  },
  headerLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  brandBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: '#FFF',
    letterSpacing: 0.3,
  },
  othersBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  othersBadgeText: {
    fontFamily: Fonts.meduim,
    fontSize: 10,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    marginHorizontal: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  featureLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    flexShrink: 1,
  },
  ctaStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginTop: 4,
  },
  ctaText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: '#FFF',
    letterSpacing: 0.3,
  },
  ctaScore: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ctaScoreText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    color: '#FFF',
  },
});
