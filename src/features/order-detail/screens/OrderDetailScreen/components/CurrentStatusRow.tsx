import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOrderTimelineStyles } from "./OrderTimeline.styles";

interface CurrentStatusRowProps {
  currentStatus: string;
}

export const CurrentStatusRow: React.FC<CurrentStatusRowProps> = ({
  currentStatus,
}) => {
  const { colors } = useAppTheme();
  const styles = useOrderTimelineStyles();

  return (
    <View style={styles.currentStatusRow}>
      <MaterialCommunityIcons
        name="map-marker"
        size={14}
        color={colors.status.success}
      />
      <Text style={styles.currentStatusText}>{currentStatus}</Text>
    </View>
  );
};
