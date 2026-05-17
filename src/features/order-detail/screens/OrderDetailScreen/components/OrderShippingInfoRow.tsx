import React from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getOrderShippingCardStyles } from "./OrderShippingCard.styles";

interface OrderShippingInfoRowProps {
  icon: string;
  label: string;
  value?: string | null;
  optional?: boolean;
  colors: any;
}

export const OrderShippingInfoRow: React.FC<OrderShippingInfoRowProps> = ({
  icon,
  label,
  value,
  optional,
  colors,
}) => {
  const styles = getOrderShippingCardStyles(colors);

  if (optional && !value) return null;
  return (
    <>
      <View style={styles.infoRow}>
        <View style={styles.infoRowLeft}>
          <MaterialCommunityIcons name={icon as any} size={18} color={colors.text.secondary} />
          <Text style={styles.infoLabel}>{label}</Text>
        </View>
        <Text style={styles.infoValue} numberOfLines={1}>
          {value || "—"}
        </Text>
      </View>
      <Divider style={styles.divider} />
    </>
  );
};
