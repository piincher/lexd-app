import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { createStyles } from "./ActiveShipmentCard.styles";
import { SHIP_COLORS, STEPS, ShipmentStep } from "./ActiveShipmentCard.constants";

const styles = createStyles(SHIP_COLORS);

interface ShipmentTimelineProps {
  currentStep: ShipmentStep;
  progress: number;
  colors: any;
}

export const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({
  currentStep,
  progress,
  colors,
}) => (
  <>
    {/* Route dashed line */}
    <View style={styles.routeLine}>
      <View style={styles.dashContainer}>
        {Array.from({ length: 35 }).map((_, i) => (
          <View key={i} style={[styles.dash, { backgroundColor: SHIP_COLORS.grayText }]} />
        ))}
      </View>
      <MaterialCommunityIcons name="arrow-right" size={20} color={SHIP_COLORS.navyLight} />
    </View>

    {/* Progress steps */}
    <View style={styles.stepsContainer}>
      {STEPS.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const circleStyle = isActive
          ? [styles.stepCircle, styles.stepCircleActive]
          : isCompleted
          ? [styles.stepCircle, styles.stepCircleCompleted]
          : [styles.stepCircle, styles.stepCircleInactive];
        const iconColor = isActive || isCompleted ? "#FFFFFF" : SHIP_COLORS.grayText;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <View
                style={[
                  styles.stepLine,
                  { backgroundColor: index <= currentStep ? SHIP_COLORS.navy : SHIP_COLORS.progressTrack },
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
                    color: isActive ? SHIP_COLORS.navy : colors.text.secondary,
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
      <View style={[styles.progressTrack, { backgroundColor: SHIP_COLORS.progressTrack }]}>
        <View style={[styles.progressFill, { backgroundColor: SHIP_COLORS.navy, width: `${progress}%` }]} />
      </View>
      <Text style={[styles.progressText, { color: colors.text.secondary }]}>
        {progress}% complété
      </Text>
    </View>
  </>
);
