import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOrderTimelineStyles } from "./OrderTimeline.styles";

export const TimelineHeader: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useOrderTimelineStyles();

  return (
    <View style={styles.header}>
      <MaterialCommunityIcons
        name="timeline-clock"
        size={20}
        color={colors.status.success}
      />
      <Text style={styles.headerTitle}>Suivi du statut</Text>
    </View>
  );
};
