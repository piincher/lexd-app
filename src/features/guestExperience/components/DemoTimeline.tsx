import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoTimelineStep } from '../types';

interface Props {
  steps: DemoTimelineStep[];
}

export const DemoTimeline: React.FC<Props> = ({ steps }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Comment le suivi apparaît</Text>
      {steps.map((step, index) => {
        const active = step.status === 'active';
        const done = step.status === 'done';
        return (
          <View key={step.id} style={styles.stepRow}>
            <View style={styles.visualColumn}>
              <View style={[styles.dot, active && styles.dotActive, done && styles.dotDone]}>
                <FontAwesome5 name={step.icon} size={13} color={done || active ? '#FFFFFF' : colors.text.secondary} />
              </View>
              {index < steps.length - 1 && <View style={styles.line} />}
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDetail}>{step.detail}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 18,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginBottom: 14,
    },
    stepRow: {
      flexDirection: 'row',
      gap: 12,
      minHeight: 76,
    },
    visualColumn: {
      alignItems: 'center',
      width: 36,
    },
    dot: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2F7',
    },
    dotDone: {
      backgroundColor: colors.primary.main,
    },
    dotActive: {
      backgroundColor: colors.status.info,
    },
    line: {
      flex: 1,
      width: 2,
      backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : '#E5E7EB',
    },
    textBlock: {
      flex: 1,
      paddingBottom: 16,
    },
    stepTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 15,
    },
    stepDetail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 4,
    },
  });
