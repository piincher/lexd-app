import React from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOrderPaymentCardStyles } from "./OrderPaymentCard.styles";

interface PaymentInfoRowProps {
  icon: string;
  label: string;
  value: string;
  valueColor?: string;
}

export const PaymentInfoRow: React.FC<PaymentInfoRowProps> = ({
  icon,
  label,
  value,
  valueColor,
}) => {
  const { colors } = useAppTheme();
  const styles = useOrderPaymentCardStyles();

  return (
    <>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <MaterialCommunityIcons
            name={icon as any}
            size={18}
            color={colors.text.secondary}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text
          style={[
            styles.value,
            valueColor ? { color: valueColor } : undefined,
          ]}
        >
          {value}
        </Text>
      </View>
      <Divider style={styles.divider} />
    </>
  );
};
