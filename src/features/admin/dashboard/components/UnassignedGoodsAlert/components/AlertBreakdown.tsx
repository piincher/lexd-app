import React from "react";
import { View, StyleSheet } from "react-native";
import { ShippingModeBreakdown } from "./ShippingModeBreakdown";
import { AgeBreakdown } from "./AgeBreakdown";

interface AlertBreakdownProps {
  byShippingMode: { AIR: number; SEA: number };
  byAge: { "0-3": number; "4-7": number; "8+": number };
}

export const AlertBreakdown: React.FC<AlertBreakdownProps> = ({
  byShippingMode,
  byAge,
}) => {
  const styles = StyleSheet.create({
    breakdown: {
      padding: 14,
    },
  });

  return (
    <View style={styles.breakdown}>
      <ShippingModeBreakdown byShippingMode={byShippingMode} />
      <AgeBreakdown byAge={byAge} />
    </View>
  );
};
