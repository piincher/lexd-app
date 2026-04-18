/**
 * ProcessTimeline
 * "How it works" vertical timeline with numbered steps
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { WORKFLOW_STEPS } from '../../constants/homeData';

export const ProcessTimeline: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Comment ca Marche ?
      </Text>

      <View style={styles.timeline}>
        {WORKFLOW_STEPS.map((step, index) => {
          const isLast = index === WORKFLOW_STEPS.length - 1;

          return (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(500 + index * 100).duration(400).springify()}
              style={styles.stepRow}
            >
              {/* Timeline column */}
              <View style={styles.timelineCol}>
                <View style={[styles.stepCircle, { backgroundColor: step.color }]}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                {!isLast && (
                  <View style={[styles.timelineLine, { backgroundColor: `${step.color}30` }]} />
                )}
              </View>

              {/* Content */}
              <View
                style={[
                  styles.stepCard,
                  { backgroundColor: colors.background.card },
                ]}
              >
                <View style={[styles.stepIconBg, { backgroundColor: `${step.color}12` }]}>
                  <FontAwesome6 name={step.icon} size={16} color={step.color} />
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
                    {step.title}
                  </Text>
                  <Text style={[styles.stepDesc, { color: colors.text.secondary }]}>
                    {step.description}
                  </Text>
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
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 16,
  },
  timeline: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
  },
  timelineCol: {
    alignItems: 'center',
    width: 40,
    marginRight: 12,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepNumber: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#FFF',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 2,
  },
  stepCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
    ...Theme.shadows.sm,
  },
  stepIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    marginBottom: 2,
  },
  stepDesc: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
  },
});
