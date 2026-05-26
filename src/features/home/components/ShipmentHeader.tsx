import React from 'react';
import { View, Text } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ActiveShipmentCard.styles";
import { SHIP_COLORS } from "./ActiveShipmentCard.constants";

interface ShipmentHeaderProps {
  code?: string;
  statusText: string;
  shippingMode?: string;
  colors: any;
}

export const ShipmentHeader: React.FC<ShipmentHeaderProps> = ({
  code,
  statusText,
  shippingMode,
  colors,
}) => {
  const styles = createStyles(colors);

  return (
  <View style={styles.headerRow}>
    <View style={styles.headerLeft}>
      <View style={[styles.shipIcon, { backgroundColor: SHIP_COLORS.grayLight }]}>
        <MaterialCommunityIcons
          name={shippingMode === "air" ? "airplane" : "ferry"}
          size={24}
          color={SHIP_COLORS.navy}
        />
      </View>
      <View style={styles.headerInfo}>
        <Text style={[styles.orderCode, { color: colors.text.primary }]}>
          {code || "---"}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: colors.background.paper }]}>
          <Text style={[styles.statusText, { color: colors.text.secondary }]}>{statusText}</Text>
        </View>
      </View>
    </View>
    <Feather name="chevron-right" size={20} color={colors.text.secondary} />
  </View>
);
};
