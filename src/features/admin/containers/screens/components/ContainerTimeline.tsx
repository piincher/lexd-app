/**
 * ContainerTimeline - Timeline section showing container status progression
 * Displays TIMELINE_STEPS with current status highlighted
 */

import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ContainerStatus,
  TIMELINE_STEPS,
  CONTAINER_STATUS_COLORS,
} from '../../types';
import {  createStyles  } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ContainerTimelineProps {
  currentStatus: ContainerStatus;
  currentStatusIndex: number;
}

export const ContainerTimeline: React.FC<ContainerTimelineProps> = ({
  currentStatus,
  currentStatusIndex,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const resolvedStatusIndex = TIMELINE_STEPS.findIndex((step) => step.status === currentStatus);
  const activeStatusIndex = resolvedStatusIndex >= 0 ? resolvedStatusIndex : currentStatusIndex;

  return (
    <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="time" size={20} color="#7C3AED" />
        <Text style={styles.cardTitle}>Chronologie</Text>
      </View>

      <View style={styles.timeline}>
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = index <= activeStatusIndex;
          const isCurrent = index === activeStatusIndex;
          const stepColor = CONTAINER_STATUS_COLORS[step.status];

          return (
            <View key={step.status} style={styles.timelineStep}>
              {/* Step Dot with Icon */}
              <View
                style={[
                  styles.timelineDot,
                  isCompleted && { backgroundColor: stepColor },
                  isCurrent && styles.timelineDotCurrent,
                ]}
              >
                {isCompleted && (
                  <Ionicons name="checkmark" size={12} color="#FFF" />
                )}
              </View>

              {/* Step Label */}
              <Text
                style={[
                  styles.timelineLabel,
                  isCompleted && styles.timelineLabelActive,
                  isCurrent && styles.timelineLabelCurrent,
                ]}
              >
                {step.label}
              </Text>

              {/* Connector Line */}
              {index < TIMELINE_STEPS.length - 1 && (
                <View
                  style={[
                    styles.timelineConnector,
                    index < activeStatusIndex && {
                      backgroundColor: stepColor,
                    },
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default ContainerTimeline;
