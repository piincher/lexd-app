import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export interface TrackingStep {
  id?: string;
  title?: string;
  time?: string;
}

export interface TrackingTimelineProps {
  steps: Array<TrackingStep | string>;
  currentStep: number;
}

const formatLocalDateTime = (iso?: string): string | null => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const normalizeStep = (step: TrackingStep | string, index: number): TrackingStep => {
  if (typeof step === 'string') {
    return { id: `step-${index}`, title: step };
  }
  return { id: step.id ?? `step-${index}`, title: step.title, time: step.time };
};

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ steps, currentStep }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingVertical: 8,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
        rail: {
          width: 32,
          alignItems: 'center',
        },
        circle: {
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
        },
        line: {
          width: 2,
          flex: 1,
          minHeight: 24,
          marginVertical: 2,
        },
        stepContent: {
          flex: 1,
          paddingBottom: 20,
          paddingLeft: 12,
          paddingTop: 2,
        },
        stepTitle: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        stepTitleInactive: {
          color: colors.text.disabled,
          fontFamily: Fonts.meduim,
        },
        stepTime: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container} accessibilityRole="list">
      {steps.map((raw, index) => {
        const step = normalizeStep(raw, index);
        const isDone = index < currentStep;
        const isCurrent = index === currentStep - 1;
        const isLast = index === steps.length - 1;
        const active = isDone || isCurrent;

        const circleBg = active ? colors.primary.main : 'transparent';
        const circleBorder = active ? colors.primary.main : colors.border;
        const lineColor = index < currentStep - 1 ? colors.primary.main : colors.border;
        const formattedTime = formatLocalDateTime(step.time);

        return (
          <View key={step.id} style={styles.row} accessibilityRole="listitem">
            <View style={styles.rail}>
              <View style={[styles.circle, { backgroundColor: circleBg, borderColor: circleBorder }]}>
                {isDone ? (
                  <MaterialCommunityIcons name="check" size={16} color={colors.text.inverse} />
                ) : (
                  <Text
                    style={{
                      fontFamily: Fonts.bold,
                      fontSize: 12,
                      color: active ? colors.text.inverse : colors.text.disabled,
                    }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              {!isLast && <View style={[styles.line, { backgroundColor: lineColor }]} />}
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, !active && styles.stepTitleInactive]} numberOfLines={2}>
                {step.title ?? `Étape ${index + 1}`}
              </Text>
              {formattedTime ? <Text style={styles.stepTime}>{formattedTime}</Text> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TrackingTimeline;
