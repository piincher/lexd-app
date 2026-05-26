import React from 'react';
import { View, Text } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { createStyles } from "./ActiveShipmentCard.styles";
import { formatDate } from "./ActiveShipmentCard.constants";

interface ShipmentFooterProps {
  departureDate?: string;
  quantity?: number;
  updatedAt?: string;
  colors: any;
}

export const ShipmentFooter: React.FC<ShipmentFooterProps> = ({
  departureDate,
  quantity,
  updatedAt,
  colors,
}) => {
  const styles = createStyles(colors);

  return (
  <>
    <View style={[styles.bottomDivider, { borderTopColor: colors.border }]} />
    <View style={styles.bottomRow}>
      <View style={styles.bottomItem}>
        <Feather name="calendar" size={16} color={colors.text.secondary} />
        <Text style={[styles.bottomText, { color: colors.text.secondary }]}>
          Arrivée: {formatDate(departureDate)}
        </Text>
      </View>
      <View style={styles.bottomItem}>
        <MaterialCommunityIcons name="package-variant" size={16} color={colors.text.secondary} />
        <Text style={[styles.bottomText, { color: colors.text.secondary }]}>
          {quantity || 1} articles
        </Text>
      </View>
    </View>
    {updatedAt && (
      <View style={styles.updatedRow}>
        <Feather name="refresh-cw" size={12} color={colors.text.disabled} />
        <Text style={[styles.updatedText, { color: colors.text.disabled }]}>
          Mis à jour: {formatDate(updatedAt)}
        </Text>
      </View>
    )}
  </>
);
};
