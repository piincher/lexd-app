import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOrderTimelineStyles } from "./OrderTimeline.styles";

interface TimelineStepProps {
  icon: string;
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
  showConnector: boolean;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  icon,
  label,
  isCompleted,
  isCurrent,
  showConnector,
}) => {
  const { colors } = useAppTheme();
  const styles = useOrderTimelineStyles();

  return (
    <View style={styles.step}>
      {showConnector && (
        <View
          style={[
            styles.connector,
            {
              backgroundColor: isCompleted
                ? colors.status.success
                : colors.border,
            },
          ]}
        />
      )}
      <View
        style={[
          styles.circle,
          {
            backgroundColor: isCompleted
              ? colors.status.success
              : colors.background.paper,
            borderColor: isCurrent ? colors.status.warning : "transparent",
            borderWidth: isCurrent ? 2 : 0,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={icon as any}
          size={16}
          color={isCompleted ? colors.text.inverse : colors.text.disabled}
        />
      </View>
      <Text
        style={[
          styles.stepLabel,
          {
            color: isCompleted ? colors.text.primary : colors.text.disabled,
            fontFamily: isCurrent ? Fonts.bold : Fonts.regular,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};
