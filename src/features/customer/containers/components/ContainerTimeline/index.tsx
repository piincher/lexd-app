import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { CUSTOMER_TIMELINE_STEPS } from "../../types";
import type { ContainerTimeline as ContainerTimelineType, CustomerContainerStatus } from "../../types";
import { useTimelineLogic } from "./useTimelineLogic";
import { createTimelineStyles } from "./ContainerTimeline.styles";
import { TimelineStep } from "./TimelineStep";

interface ContainerTimelineProps {
  timeline: ContainerTimelineType;
  currentStatus: CustomerContainerStatus;
  estimatedArrival?: string;
}

export const ContainerTimeline: React.FC<ContainerTimelineProps> = ({
  timeline, currentStatus, estimatedArrival,
}) => {
  const theme = useTheme();
  const { colors } = useAppTheme();
  const primaryColor = theme.colors.primary;
  const styles = createTimelineStyles(colors, primaryColor);
  const { isStepCompleted, isCurrentStep, formatDate, getStepIcon, getProgressWidth } = useTimelineLogic(currentStatus);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground} />
        <View style={[styles.progressBarFill, { width: getProgressWidth(currentStatus), backgroundColor: primaryColor }]} />
      </View>
      <View style={styles.stepsContainer}>
        {CUSTOMER_TIMELINE_STEPS.map((step) => (
          <TimelineStep
            key={step.key}
            stepKey={step.key}
            label={step.label}
            timeline={timeline}
            currentStatus={currentStatus}
            primaryColor={primaryColor}
            styles={styles}
            isStepCompleted={isStepCompleted}
            isCurrentStep={isCurrentStep}
            formatDate={formatDate}
            getStepIcon={getStepIcon}
            estimatedArrival={estimatedArrival}
          />
        ))}
      </View>
    </View>
  );
};

export default ContainerTimeline;
