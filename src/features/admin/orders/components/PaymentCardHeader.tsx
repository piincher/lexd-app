import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createPaymentInfoCardStyles } from "./PaymentInfoCard.styles";

interface PaymentCardHeaderProps {
  title: string;
  icon?: string;
}

export const PaymentCardHeader: React.FC<PaymentCardHeaderProps> = ({
  title,
  icon = "receipt",
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentInfoCardStyles(colors);

  return (
    <View style={styles.cardHeader}>
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color={colors.primary.main}
      />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};
