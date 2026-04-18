/**
 * Container Timeline Component
 * Maersk-style visual timeline showing container journey
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { ContainerTimeline as ContainerTimelineType, CustomerContainerStatus, CUSTOMER_STATUS_COLORS, CUSTOMER_TIMELINE_STEPS } from '../types';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

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

export const ContainerTimeline: React.FC<ContainerTimelineProps> = ({
  timeline,
  currentStatus,
  estimatedArrival,
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;

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
                    color={COLORS.DimGray}
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

/**
 * Get progress bar width based on current status
 */
const getProgressWidth = (status: CustomerContainerStatus): string => {
  const widths: Record<CustomerContainerStatus, string> = {
    BOOKED: '0%',
    IN_TRANSIT: '25%',
    ARRIVED: '50%',
    READY_FOR_PICKUP: '75%',
    DELIVERED: '100%',
  };
  return widths[status] || '0%';
};

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.Silver,
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
    transitionProperty: 'width',
    transitionDuration: '300ms',
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
    backgroundColor: COLORS.Silver,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepDotCompleted: {
    backgroundColor: COLORS.green,
  },
  stepDotCurrent: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  stepDotFuture: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: COLORS.Silver,
  },
  stepLabel: {
    fontSize: 11,
    fontFamily: Fonts.meduim,
    color: COLORS.DarkGrey,
    textAlign: 'center',
    marginBottom: 4,
  },
  stepLabelCurrent: {
    fontFamily: Fonts.bold,
  },
  stepLabelFuture: {
    color: COLORS.DimGray,
  },
  stepDate: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },
  stepDateCompleted: {
    color: COLORS.DarkGrey,
  },
  stepDateFuture: {
    color: COLORS.SlateGray,
  },
  estimatedText: {
    fontSize: 9,
    fontFamily: Fonts.meduim,
    marginTop: 4,
    textAlign: 'center',
  },
});
