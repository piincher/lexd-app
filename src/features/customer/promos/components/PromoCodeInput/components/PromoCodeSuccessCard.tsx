import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePromoCodeInputStyles } from "../PromoCodeInput.styles";
import type { ValidationResult } from "../../../api";

interface PromoCodeSuccessCardProps {
  appliedCode: string;
  appliedResult: ValidationResult;
  onRemove: () => void;
}

const formatAmount = (value: number) => value.toLocaleString("fr-FR");

export const PromoCodeSuccessCard: React.FC<PromoCodeSuccessCardProps> = ({
  appliedCode,
  appliedResult,
  onRemove,
}) => {
  const { styles, colors } = usePromoCodeInputStyles();

  const renderDiscountText = () => {
    if (appliedResult.discountType === "PERCENTAGE") {
      return `−${appliedResult.discountValue}% = −${formatAmount(appliedResult.discountAmount ?? 0)} FCFA`;
    }
    return `−${formatAmount(appliedResult.discountAmount ?? 0)} FCFA`;
  };

  return (
    <View style={styles.successCard}>
      <View style={styles.successContent}>
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color={colors.status.success}
        />
        <View style={styles.successTextContainer}>
          <Text style={styles.successTitle}>
            Code {appliedCode} appliqué !
          </Text>
          <Text style={styles.successDiscount}>{renderDiscountText()}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <MaterialCommunityIcons name="close" size={18} color={colors.text.secondary} />
      </TouchableOpacity>
    </View>
  );
};
