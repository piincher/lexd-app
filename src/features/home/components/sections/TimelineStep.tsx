import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ProcessTimeline.styles';

interface TimelineStepProps {
  step: {
    icon: React.ComponentProps<typeof FontAwesome6>['name'];
    title: string;
    description: string;
    color: string;
  };
  index: number;
  isLast: boolean;
  lineStyle: Record<string, unknown>;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  index,
  isLast,
  lineStyle,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Animated.View
      entering={FadeInDown.delay(300 + index * 120).duration(400).springify()}
      style={styles.stepRow}
    >
      <View style={styles.timelineCol}>
        <View style={[styles.stepCircle, { backgroundColor: step.color }]}>
          <FontAwesome6 name={step.icon} size={14} color={colors.neutral.white} />
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
};
