/**
 * ProcessTimeline
 * "How it works" — animated vertical timeline with icon steps
 * and a drawing connector line effect.
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { WORKFLOW_STEPS } from '../../constants/homeData';
import { SectionHeader } from '../SectionHeader';

export const ProcessTimeline: React.FC = () => {
  const { colors } = useAppTheme();
  const lineProgress = useSharedValue(0);

  useEffect(() => {
    lineProgress.value = withTiming(1, { duration: 1500 });
  }, []);

  const lineStyle = useAnimatedStyle(() => ({
    opacity: lineProgress.value,
    transform: [{ scaleY: lineProgress.value }],
  }));

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Comment ca Marche ?"
        subtitle="5 etapes simples pour expedier vos marchandises"
      />

      <View style={styles.timeline}>
        {WORKFLOW_STEPS.map((step, index) => {
          const isLast = index === WORKFLOW_STEPS.length - 1;

          return (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(300 + index * 120).duration(400).springify()}
              style={styles.stepRow}
            >
              {/* Timeline column */}
              <View style={styles.timelineCol}>
                <View style={[styles.stepCircle, { backgroundColor: step.color }]}>
                  <FontAwesome6 name={step.icon} size={14} color="#FFF" />
                </View>
                {!isLast && (
                  <Animated.View
                    style={[
                      styles.timelineLine,
                      { backgroundColor: `${step.color}35` },
                      lineStyle,
                    ]}
                  />
                )}
              </View>

              {/* Content card */}
              <View
                style={[
                  styles.stepCard,
                  { backgroundColor: colors.background.card },
                ]}
              >
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
                    {step.title}
                  </Text>
                  <Text style={[styles.stepDesc, { color: colors.text.secondary }]}>
                    {step.description}
                  </Text>
                </View>
                <View style={[styles.stepIndexBadge, { backgroundColor: `${step.color}14` }]}>
                  <Text style={[styles.stepIndexText, { color: step.color }]}>{index + 1}</Text>
                </View>
              </View>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  timeline: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
  },
  timelineCol: {
    alignItems: 'center',
    width: 44,
    marginRight: 12,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 2,
    transformOrigin: 'top',
  },
  stepCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    ...Theme.shadows.sm,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    marginBottom: 3,
  },
  stepDesc: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
  },
  stepIndexBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndexText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
});
