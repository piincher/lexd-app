/**
 * ComparisonCard
 * ChinaLink Express vs Other Cargo — premium visual feature comparison
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { COMPARISON_FEATURES, COMPARISON_SUMMARY } from '../../constants/homeData';

/* ── Icon Components ── */

const CheckIcon = ({ color }: { color: string }) => (
  <View style={[styles.iconBadge, { backgroundColor: `${color}18` }]}>
    <FontAwesome6 name="check" size={11} color={color} />
  </View>
);

const CrossIcon = () => (
  <View style={[styles.iconBadge, { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
    <FontAwesome6 name="xmark" size={11} color="#EF4444" />
  </View>
);

const PartialIcon = () => (
  <View style={[styles.iconBadge, { backgroundColor: 'rgba(245,158,11,0.1)' }]}>
    <FontAwesome6 name="minus" size={11} color="#F59E0B" />
  </View>
);

const StatusIcon = ({ status, accentColor }: { status: 'yes' | 'no' | 'partial'; accentColor: string }) => {
  if (status === 'yes') return <CheckIcon color={accentColor} />;
  if (status === 'partial') return <PartialIcon />;
  return <CrossIcon />;
};

/* ── Score Bar ── */

const ScoreBar = ({ score, total, color, label }: { score: number; total: number; color: string; label: string }) => (
  <View style={styles.scoreBarContainer}>
    <View style={styles.scoreBarHeader}>
      <Text style={[styles.scoreBarLabel, { color }]}>{label}</Text>
      <Text style={[styles.scoreBarValue, { color }]}>{score}/{total}</Text>
    </View>
    <View style={styles.scoreBarTrack}>
      <View
        style={[
          styles.scoreBarFill,
          { width: `${(score / total) * 100}%`, backgroundColor: color },
        ]}
      />
    </View>
  </View>
);

/* ── Main Component ── */

export const ComparisonCard: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <Animated.View entering={FadeInDown.delay(500).duration(500).springify()}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionBadge}>
            <FontAwesome6 name="scale-balanced" size={12} color="#22C55E" />
            <Text style={styles.sectionBadgeText}>COMPARATIF</Text>
          </View>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ChinaLink vs Autres Transporteurs
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Decouvrez pourquoi nos clients nous choisissent
          </Text>
        </View>
      </Animated.View>

      {/* Score Summary */}
      <Animated.View
        entering={FadeInDown.delay(550).duration(500).springify()}
        style={[styles.scoreCard, { backgroundColor: colors.background.card }]}
      >
        <ScoreBar
          score={COMPARISON_SUMMARY.chinalinkScore}
          total={COMPARISON_SUMMARY.totalFeatures}
          color="#22C55E"
          label="ChinaLink Express"
        />
        <View style={{ height: 12 }} />
        <ScoreBar
          score={COMPARISON_SUMMARY.othersScore}
          total={COMPARISON_SUMMARY.totalFeatures}
          color="#9CA3AF"
          label="Autres transporteurs"
        />
      </Animated.View>

      {/* Comparison Table */}
      <Animated.View
        entering={FadeInDown.delay(600).duration(500).springify()}
        style={[styles.card, { backgroundColor: colors.background.card }]}
      >
        {/* Table Header */}
        <View style={styles.headerRow}>
          <View style={styles.featureCol}>
            <Text style={[styles.headerLabel, { color: colors.text.secondary }]}>
              Criteres
            </Text>
          </View>
          <View style={styles.chinaLinkCol}>
            <LinearGradient
              colors={['#22C55E', '#15803D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.brandBadge}
            >
              <FontAwesome6 name="star" size={8} color="#FFF" />
              <Text style={styles.brandBadgeText}>ChinaLink</Text>
            </LinearGradient>
          </View>
          <View style={styles.othersCol}>
            <View style={[styles.othersBadge, { backgroundColor: isDark ? 'rgba(156,163,175,0.15)' : '#F3F4F6' }]}>
              <Text style={[styles.othersBadgeText, { color: colors.text.secondary }]}>
                Autres
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border ?? '#E5E7EB' }]} />

        {/* Feature Rows */}
        {COMPARISON_FEATURES.map((feature, index) => (
          <Animated.View
            key={feature.label}
            entering={FadeInDown.delay(700 + index * 50).duration(350).springify()}
          >
            <View
              style={[
                styles.featureRow,
                index % 2 === 0 && {
                  backgroundColor: isDark
                    ? 'rgba(74,222,128,0.04)'
                    : 'rgba(34,197,94,0.03)',
                },
              ]}
            >
              <View style={styles.featureCol}>
                <View style={styles.featureLabelRow}>
                  <View style={[styles.featureIconCircle, { backgroundColor: `${feature.color}14` }]}>
                    <FontAwesome6 name={feature.icon as any} size={10} color={feature.color} />
                  </View>
                  <View style={styles.featureTextCol}>
                    <Text
                      style={[styles.featureLabel, { color: colors.text.primary }]}
                      numberOfLines={1}
                    >
                      {feature.label}
                    </Text>
                    {feature.chinalinkDetail && (
                      <Text
                        style={[styles.featureDetail, { color: colors.text.secondary }]}
                        numberOfLines={1}
                      >
                        {feature.chinalinkDetail}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.chinaLinkCol}>
                <StatusIcon status={feature.chinalink} accentColor="#22C55E" />
              </View>
              <View style={styles.othersCol}>
                <StatusIcon status={feature.others} accentColor="#6B7280" />
              </View>
            </View>
          </Animated.View>
        ))}

        {/* Bottom CTA strip */}
        <LinearGradient
          colors={['#22C55E', '#16A34A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaStrip}
        >
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

  /* ── Section Header ── */
  sectionHeader: {
    marginBottom: 16,
  },
  sectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(34,197,94,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  sectionBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: '#22C55E',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },

  /* ── Score Card ── */
  scoreCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Theme.shadows.sm,
  },
  scoreBarContainer: {
    gap: 6,
  },
  scoreBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreBarLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
  scoreBarValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
  },
  scoreBarTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  /* ── Card ── */
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },

  /* ── Header ── */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  featureCol: {
    flex: 1,
  },
  chinaLinkCol: {
    width: 80,
    alignItems: 'center',
  },
  othersCol: {
    width: 70,
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

  /* ── Feature Rows ── */
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
  featureTextCol: {
    flexShrink: 1,
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
  },
  featureDetail: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    marginTop: 1,
  },

  /* ── Status Icons ── */
  iconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ── CTA Strip ── */
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
