import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, interpolate } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import type { DemoTimelineStep } from '../types';

interface Props {
  steps: DemoTimelineStep[];
}

export const DemoTimeline: React.FC<Props> = ({ steps }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(withTiming(1.3, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1, true
    );
  }, [pulse]);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.3], [0.5, 0]),
  }));
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const done = step.status === 'done';
        const active = step.status === 'active';
        return (
          <Animated.View
            key={step.id}
            entering={FadeInDown.delay(index * 80)}
            style={[styles.stepRow, done && styles.stepRowDone]}
          >
            <View style={styles.leftColumn}>
              <View style={styles.circleWrapper}>
                {active && <Animated.View style={[styles.pulseRing, pulseStyle]} />}
                <View style={[
                  styles.dot,
                  done && { backgroundColor: colors.status.success },
                  active && { backgroundColor: colors.status.info },
                  !done && !active && { backgroundColor: colors.neutral[200] },
                ]}>
                  <FontAwesome6 name={step.icon as any} size={13} color={done || active ? colors.text.inverse : colors.text.secondary} />
                </View>
              </View>
              {index < steps.length - 1 && (
                <Animated.View
                  entering={FadeInDown.delay((index + 0.5) * 80)}
                  style={[styles.line, done && { backgroundColor: colors.status.success }]}
                />
              )}
            </View>
            <View style={[styles.textBlock, active && styles.textBlockActive]}>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.detail}>{step.detail}</Text>
              {(step.date || step.location) && (
                <Text style={styles.meta}>{[step.date, step.location].filter(Boolean).join(' · ')}</Text>
              )}
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16, marginTop: 16,
      borderRadius: 24, padding: 16,
      backgroundColor: colors.background.card, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
    },
    stepRow: { flexDirection: 'row', gap: 12 },
    stepRowDone: { opacity: 0.8 },
    leftColumn: { width: 36, alignItems: 'center' },
    circleWrapper: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    pulseRing: { position: 'absolute', width: 36, height: 36, borderRadius: 18, backgroundColor: colors.status.info, top: 0, left: 0 },
    dot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
    line: { flex: 1, width: 2, marginTop: 4, backgroundColor: colors.neutral[300] },
    textBlock: { flex: 1, paddingBottom: 16 },
    textBlockActive: {
      borderLeftWidth: 3, borderLeftColor: colors.status.info, paddingLeft: 12,
      backgroundColor: colors.status.info + '0A',
      borderRadius: 8, marginBottom: 12, paddingVertical: 8,
    },
    title: { fontFamily: Fonts.bold, fontSize: 15, color: colors.text.primary },
    detail: { fontFamily: Fonts.regular, fontSize: 13, color: colors.text.secondary, lineHeight: 19, marginTop: 4 },
    meta: { fontFamily: Fonts.medium, fontSize: 11, color: colors.text.muted, marginTop: 6 },
  });
