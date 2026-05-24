/**
 * ProcessTimeline
 * "How it works" — animated vertical timeline with icon steps
 * and a drawing connector line effect.
 */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { WORKFLOW_STEPS } from '../../constants/homeData';
import { SectionHeader } from '../SectionHeader';
import { TimelineStep } from './TimelineStep';
import { createStyles } from './ProcessTimeline.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const ProcessTimeline: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const stepColors = [
    colors.status.info,
    colors.primary.main,
    colors.status.warning,
    colors.status.success,
    colors.primary.main,
  ];
  const lineProgress = useSharedValue(0);

  useEffect(() => {
    lineProgress.value = withTiming(1, { duration: 1500 });
  }, [lineProgress]);

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
        {WORKFLOW_STEPS.map((step, index) => (
          <TimelineStep
            key={index}
            step={{ ...step, color: stepColors[index] ?? colors.primary.main }}
            index={index}
            isLast={index === WORKFLOW_STEPS.length - 1}
            lineStyle={lineStyle}
          />
        ))}
      </View>
    </View>
  );
};
