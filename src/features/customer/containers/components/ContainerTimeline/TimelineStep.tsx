import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CUSTOMER_STATUS_COLORS } from "../../types";
import type { ContainerTimeline as ContainerTimelineType, CustomerContainerStatus } from "../../types";
import type { createTimelineStyles } from "./ContainerTimeline.styles";

type TimelineStyles = ReturnType<typeof createTimelineStyles>;

interface TimelineStepProps {
  stepKey: keyof ContainerTimelineType;
  label: string;
  timeline: ContainerTimelineType;
  currentStatus: CustomerContainerStatus;
  primaryColor: string;
  styles: TimelineStyles;
  isStepCompleted: (key: keyof ContainerTimelineType) => boolean;
  isCurrentStep: (key: keyof ContainerTimelineType) => boolean;
  formatDate: (date?: string) => string;
  getStepIcon: (key: keyof ContainerTimelineType) => React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  estimatedArrival?: string;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  stepKey, label, timeline, currentStatus, primaryColor, styles,
  isStepCompleted, isCurrentStep, formatDate, getStepIcon, estimatedArrival,
}) => {
  const completed = isStepCompleted(stepKey);
  const current = isCurrentStep(stepKey);
  const dateValue = timeline[stepKey];
  const futureIconColor = styles.stepLabelFuture.color || "#64748B";

  return (
    <View style={styles.stepWrapper}>
      <View style={[
        styles.stepDot,
        completed && styles.stepDotCompleted,
        current && [styles.stepDotCurrent, { borderColor: primaryColor }],
        !completed && !current && styles.stepDotFuture,
        completed && { backgroundColor: CUSTOMER_STATUS_COLORS[currentStatus] },
      ]}>
        {completed ? (
          <MaterialCommunityIcons name="check" size={14} color="#FFFFFF" />
        ) : (
          <MaterialCommunityIcons name={getStepIcon(stepKey)} size={14} color={futureIconColor} />
        )}
      </View>
      <Text style={[
        styles.stepLabel,
        current && [styles.stepLabelCurrent, { color: primaryColor }],
        !completed && !current && styles.stepLabelFuture,
      ]} numberOfLines={1}>{label}</Text>
      <Text style={[
        styles.stepDate,
        completed && styles.stepDateCompleted,
        !completed && styles.stepDateFuture,
      ]}>{formatDate(dateValue)}</Text>
      {stepKey === "departedAt" && currentStatus === "IN_TRANSIT" && estimatedArrival && (
        <Text style={[styles.estimatedText, { color: primaryColor }]}>Est. arrivée: {formatDate(estimatedArrival)}</Text>
      )}
    </View>
  );
};
