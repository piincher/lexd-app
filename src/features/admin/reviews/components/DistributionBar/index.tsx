import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./DistributionBar.styles";

interface DistributionBarProps {
  star: number;
  count: number;
  total: number;
}

export const DistributionBar: React.FC<DistributionBarProps> = ({
  star,
  count,
  total,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <View style={styles.distributionRow}>
      <Text style={styles.distributionStar}>{star}</Text>
      <Ionicons name="star" size={12} color={colors.primary.main} />
      <View style={styles.distributionTrack}>
        <View style={[styles.distributionFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.distributionCount}>{count}</Text>
    </View>
  );
};
