import React from "react";
import { View, Text } from "react-native";
import { getStyles } from "./AirwayBillCard.styles";

interface AirwayBillCapacityBarProps {
  totalWeight: number;
  capacityWeight: number;
  capacityPercentage: number;
  capacityColor: string;
  colors: { status: { success: string; warning: string; error: string }; text: { muted: string }; neutral: Record<string, string>; border: string };
}

export const AirwayBillCapacityBar: React.FC<AirwayBillCapacityBarProps> = ({
  totalWeight, capacityWeight, capacityPercentage, capacityColor, colors,
}) => {
  const styles = getStyles(colors);
  return (
  <View style={styles.capacityContainer}>
    <View style={[styles.capacityTrack, { backgroundColor: colors.neutral[200] }]}>
      <View
        style={[
          styles.capacityBar,
          {
            width: `${Math.min(capacityPercentage, 100)}%`,
            backgroundColor: capacityColor,
          },
        ]}
      />
    </View>
    <Text style={[styles.capacityText, { color: colors.text.muted }]}>
      {totalWeight.toFixed(1)} / {capacityWeight} kg
    </Text>
  </View>
  );
};
