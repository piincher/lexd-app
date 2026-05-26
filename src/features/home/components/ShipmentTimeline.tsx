import React from 'react';
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { createStyles } from "./ActiveShipmentCard.styles";
import { STEPS, ShipmentStep } from "./ActiveShipmentCard.constants";

interface ShipmentTimelineProps {
  currentStep: ShipmentStep;
  progress: number;
  colors: any;
}

export const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({
  currentStep,
  progress,
  colors,
}) => {
  const styles = createStyles(colors);

  return (
  <>
    {/* Route dashed line */}
    <View style={styles.routeLine}>
      <View style={styles.dashContainer}>
        {Array.from({ length: 35 }).map((_, i) => (
          <View key={i} style={[styles.dash, { backgroundColor: colors.border }]} />
        ))}
      </View>
      <MaterialCommunityIcons name="arrow-right" size={20} color={colors.primary.main} />
    </View>

    {/* Progress steps */}
    <View style={styles.stepsContainer}>
      {STEPS.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const circleStyle = isActive
          ? [styles.stepCircle, styles.stepCircleActive, { backgroundColor: colors.primary.main }]
          : isCompleted
          ? [styles.stepCircle, styles.stepCircleCompleted, { backgroundColor: colors.primary.main }]
          : [styles.stepCircle, styles.stepCircleInactive, { borderColor: colors.border }];
        const iconColor = isActive || isCompleted ? colors.neutral.white : colors.text.secondary;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <View
                style={[
                  styles.stepLine,
                  { backgroundColor: index <= currentStep ? colors.primary.main : colors.border }
                ]}
              />
            )}
            <View style={styles.stepItem}>
              <View style={circleStyle}>
                {step.lib === "feather" ? (
                  <Feather name={step.icon} size={16} color={iconColor} />
                ) : (
                  <MaterialCommunityIcons name={step.icon} size={16} color={iconColor} />
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  {
                    color: isActive ? colors.text.primary : colors.text.secondary,
                    fontWeight: isActive ? "700" : "400",
                  },
                ]}
              >
                {step.label}
              </Text>
            </View>
          </React.Fragment>
        );
      })}
    </View>

    {/* Progress bar */}
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
        <View style={[styles.progressFill, { backgroundColor: colors.primary.main, width: `${progress}%` }]} />
      </View>
      <Text style={[styles.progressText, { color: colors.text.secondary }]}>
        {progress}% complété
      </Text>
    </View>
  </>
);
};
