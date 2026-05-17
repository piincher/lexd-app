import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getOrderShippingCardStyles } from "./OrderShippingCard.styles";

interface OrderShippingCardHeaderProps {
  colors: any;
}

export const OrderShippingCardHeader: React.FC<OrderShippingCardHeaderProps> = ({ colors }) => {
  const styles = getOrderShippingCardStyles(colors);
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons name="truck-fast" size={20} color={colors.status.success} />
      <Text style={styles.headerTitle}>Expédition</Text>
    </View>
  );
};
