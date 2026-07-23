/**
 * ComparisonCard
 * LEXD vs Others — visually scannable feature comparison
 * with score bars and clean row layout.
 */
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { COMPARISON_FEATURES, COMPARISON_SUMMARY } from '../../../constants/homeData';
import { SectionHeader } from '../../SectionHeader';
import { ComparisonScoreBar } from '../ComparisonScoreBar';
import { createStyles } from './ComparisonCard.styles';
import { ComparisonTableHeader } from './ComparisonTableHeader';
import { ComparisonTableRow } from './ComparisonTableRow';
import { ComparisonCTAStrip } from './ComparisonCTAStrip';

export const ComparisonCard: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <SectionHeader
        title="LEXD vs Autres"
        subtitle="Decouvrez pourquoi nos clients nous choisissent"
      />

      <Animated.View
        entering={FadeInDown.delay(200).duration(500).springify()}
        style={[styles.scoreCard, { backgroundColor: colors.background.card }]}
      >
        <ComparisonScoreBar
          score={COMPARISON_SUMMARY.lexdScore}
          total={COMPARISON_SUMMARY.totalFeatures}
          color={colors.status.success}
          label="LEXD"
        />
        <View style={{ height: 14 }} />
        <ComparisonScoreBar
          score={COMPARISON_SUMMARY.othersScore}
          total={COMPARISON_SUMMARY.totalFeatures}
          color={colors.text.muted}
          label="Autres transporteurs"
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(500).springify()}
        style={[styles.card, { backgroundColor: colors.background.card }]}
      >
        <ComparisonTableHeader />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        {COMPARISON_FEATURES.map((feature, index) => (
          <ComparisonTableRow key={feature.label} feature={feature} index={index} />
        ))}
        <ComparisonCTAStrip />
      </Animated.View>
    </View>
  );
};
