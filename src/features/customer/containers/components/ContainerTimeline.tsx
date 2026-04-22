/**
 * Container Timeline Component
 * Maersk-style visual timeline showing container journey
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { ContainerTimeline as ContainerTimelineType, CustomerContainerStatus, CUSTOMER_STATUS_COLORS, CUSTOMER_TIMELINE_STEPS } from '../types';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ContainerTimelineProps {
  timeline: ContainerTimelineType;
  currentStatus: CustomerContainerStatus;
  estimatedArrival?: string;
}

/**
 * Determine if a timeline step is completed
 */
const isStepCompleted = (
  stepKey: keyof ContainerTimelineType,
  currentStatus: CustomerContainerStatus
): boolean => {
  const statusOrder: CustomerContainerStatus[] = [
    'BOOKED',
    'IN_TRANSIT',
    'ARRIVED',
    'READY_FOR_PICKUP',
    'DELIVERED',
  ];
  const stepStatusMap: Record<keyof ContainerTimelineType, CustomerContainerStatus> = {
    bookedAt: 'BOOKED',
    departedAt: 'IN_TRANSIT',
    arrivedAt: 'ARRIVED',
    readyForPickupAt: 'READY_FOR_PICKUP',
    deliveredAt: 'DELIVERED',
    loadingStartedAt: 'BOOKED',
    loadingCompletedAt: 'BOOKED',
  };

  const stepIndex = statusOrder.indexOf(stepStatusMap[stepKey]);
  const currentIndex = statusOrder.indexOf(currentStatus);

  return stepIndex <= currentIndex;
};

/**
 * Determine if a timeline step is the current active step
 */
const isCurrentStep = (
  stepKey: keyof ContainerTimelineType,
  currentStatus: CustomerContainerStatus
): boolean => {
  const statusStepMap: Record<CustomerContainerStatus, keyof ContainerTimelineType> = {
    BOOKED: 'bookedAt',
    IN_TRANSIT: 'departedAt',
    ARRIVED: 'arrivedAt',
    READY_FOR_PICKUP: 'readyForPickupAt',
    DELIVERED: 'deliveredAt',
  };

  return statusStepMap[currentStatus] === stepKey;
};

/**
 * Format date for display
 */
const formatDate = (dateString?: string): string => {
  if (!dateString) return 'En attente';
  try {
    return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
};

/**
 * Get step icon based on step key
 */
const getStepIcon = (
  stepKey: keyof ContainerTimelineType
): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
  const iconMap: Record<keyof ContainerTimelineType, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
    bookedAt: 'calendar-check',
    departedAt: 'airplane-takeoff',
    arrivedAt: 'map-marker-check',
    readyForPickupAt: 'package-variant',
    deliveredAt: 'check-circle',
    loadingStartedAt: 'loading',
    loadingCompletedAt: 'archive-check',
  };
  return iconMap[stepKey];
};

/**
 * Get progress bar width based on current status
 */
const getProgressWidth = (status: CustomerContainerStatus) => {
  const widths = {
    BOOKED: '0%',
    IN_TRANSIT: '25%',
    ARRIVED: '50%',
    READY_FOR_PICKUP: '75%',
    DELIVERED: '100%',
  } as const;
  return widths[status] || '0%';
};

export const ContainerTimeline: React.FC<ContainerTimelineProps> = ({
  timeline,
  currentStatus,
  estimatedArrival,
}) => {
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();
  const primaryColor = theme.colors.primary;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      marginVertical: 16,
    },
    progressBarContainer: {
      height: 4,
      marginHorizontal: 24,
      marginBottom: -14,
      position: 'relative',
    },
    progressBarBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.neutral[200],
      borderRadius: 2,
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 2,
    },
    stepsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    stepWrapper: {
      alignItems: 'center',
      flex: 1,
    },
    stepDot: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.neutral[200],
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    stepDotCompleted: {
      backgroundColor: colors.status.success,
    },
    stepDotCurrent: {
      backgroundColor: colors.background.card,
      borderWidth: 3,
      transform: [{ scale: 1.1 }],
    },
    stepDotFuture: {
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    stepLabel: {
      fontSize: 11,
      fontFamily: Fonts.meduim,
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: 4,
    },
    stepLabelCurrent: {
      fontFamily: Fonts.bold,
    },
    stepLabelFuture: {
      color: colors.text.secondary,
    },
    stepDate: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      textAlign: 'center',
    },
    stepDateCompleted: {
      color: colors.text.primary,
    },
    stepDateFuture: {
      color: colors.text.secondary,
    },
    estimatedText: {
      fontSize: 9,
      fontFamily: Fonts.meduim,
      marginTop: 4,
      textAlign: 'center',
    },
  }), [colors, isDark]);

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground} />
        <View
          style={[
            styles.progressBarFill,
            {
              width: getProgressWidth(currentStatus),
              backgroundColor: primaryColor,
            },
          ]}
        />
      </View>

      {/* Timeline Steps */}
      <View style={styles.stepsContainer}>
        {CUSTOMER_TIMELINE_STEPS.map((step, index) => {
          const isCompleted = isStepCompleted(step.key, currentStatus);
          const isCurrent = isCurrentStep(step.key, currentStatus);
          const dateValue = timeline[step.key];

          return (
            <View key={step.key} style={styles.stepWrapper}>
              {/* Step Dot/Icon */}
              <View
                style={[
                  styles.stepDot,
                  isCompleted && styles.stepDotCompleted,
                  isCurrent && [
                    styles.stepDotCurrent,
                    { borderColor: primaryColor },
                  ],
                  !isCompleted && !isCurrent && styles.stepDotFuture,
                  isCompleted && { backgroundColor: CUSTOMER_STATUS_COLORS[currentStatus] },
                ]}
              >
                {isCompleted ? (
                  <MaterialCommunityIcons
                    name="check"
                    size={14}
                    color="#FFFFFF"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={getStepIcon(step.key)}
                    size={14}
                    color={colors.text.secondary}
                  />
                )}
              </View>

              {/* Step Label */}
              <Text
                style={[
                  styles.stepLabel,
                  isCurrent && [styles.stepLabelCurrent, { color: primaryColor }],
                  !isCompleted && !isCurrent && styles.stepLabelFuture,
                ]}
                numberOfLines={1}
              >
                {step.label}
              </Text>

              {/* Step Date */}
              <Text
                style={[
                  styles.stepDate,
                  isCompleted && styles.stepDateCompleted,
                  !isCompleted && styles.stepDateFuture,
                ]}
              >
                {formatDate(dateValue)}
              </Text>

              {/* Estimated indicator for in-transit */}
              {step.key === 'departedAt' &&
                currentStatus === 'IN_TRANSIT' &&
                estimatedArrival && (
                  <Text style={[styles.estimatedText, { color: primaryColor }]}>
                    Est. arrivée: {formatDate(estimatedArrival)}
                  </Text>
                )}
            </View>
          );
        })}
      </View>
    </View>
  );
};
