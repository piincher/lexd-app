import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useValidatePromo } from "../../hooks";
import type { ValidationResult } from "../../api";

interface PromoCodeInputProps {
  goodsIds?: string[];
  amount?: number;
  onPromoApplied?: (result: {
    code: string;
    discountAmount: number;
    finalAmount: number;
  }) => void;
  onPromoRemoved?: () => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  goodsIds,
  amount,
  onPromoApplied,
  onPromoRemoved,
}) => {
  const [code, setCode] = useState("");
  const [appliedResult, setAppliedResult] = useState<ValidationResult | null>(null);
  const [appliedCode, setAppliedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validatePromo = useValidatePromo();
  const { colors, isDark } = useAppTheme();

  const handleApply = useCallback(() => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    setErrorMessage("");

    validatePromo.mutate(
      { code: trimmed, goodsIds, amount },
      {
        onSuccess: (result) => {
          if (result.valid) {
            setAppliedResult(result);
            setAppliedCode(trimmed);
            setErrorMessage("");
            onPromoApplied?.({
              code: trimmed,
              discountAmount: result.discountAmount ?? 0,
              finalAmount: result.finalAmount ?? 0,
            });
          } else {
            setErrorMessage(result.reason ?? "Code promo invalide");
          }
        },
        onError: (error) => {
          setErrorMessage(error.message || "Erreur lors de la validation");
        },
      }
    );
  }, [code, goodsIds, amount, validatePromo, onPromoApplied]);

  const handleRemove = useCallback(() => {
    setAppliedResult(null);
    setAppliedCode("");
    setCode("");
    setErrorMessage("");
    onPromoRemoved?.();
  }, [onPromoRemoved]);

  const formatAmount = (value: number) => {
    return value.toLocaleString("fr-FR");
  };

  const renderDiscountText = () => {
    if (!appliedResult) return null;

    if (appliedResult.discountType === "PERCENTAGE") {
      return `−${appliedResult.discountValue}% = −${formatAmount(appliedResult.discountAmount ?? 0)} FCFA`;
    }
    return `−${formatAmount(appliedResult.discountAmount ?? 0)} FCFA`;
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    input: {
      flex: 1,
      height: 44,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.primary,
      backgroundColor: colors.background.card,
    },
    applyButton: {
      height: 44,
      paddingHorizontal: 16,
      borderRadius: 10,
      backgroundColor: colors.primary.main,
      alignItems: "center",
      justifyContent: "center",
    },
    applyButtonDisabled: {
      backgroundColor: colors.neutral[200],
    },
    applyButtonText: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
    errorText: {
      marginTop: 6,
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.status.error,
    },
    successCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 16,
      marginVertical: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.status.success + "40",
      backgroundColor: colors.status.success + "10",
    },
    successContent: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: 8,
    },
    successTextContainer: {
      flex: 1,
    },
    successTitle: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      color: colors.status.success,
    },
    successDiscount: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.status.success,
      marginTop: 2,
    },
    removeButton: {
      padding: 4,
    },
  }), [colors, isDark]);

  // Success state: show applied promo card
  if (appliedResult && appliedCode) {
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
        <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
          <MaterialCommunityIcons name="close" size={18} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
    );
  }

  // Default state: input with apply button
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Code promo"
          placeholderTextColor={colors.text.disabled}
          value={code}
          onChangeText={(text) => {
            setCode(text.toUpperCase());
            setErrorMessage("");
          }}
          autoCapitalize="characters"
          editable={!validatePromo.isPending}
        />
        <TouchableOpacity
          style={[
            styles.applyButton,
            (!code.trim() || validatePromo.isPending) && styles.applyButtonDisabled,
          ]}
          onPress={handleApply}
          disabled={!code.trim() || validatePromo.isPending}
          activeOpacity={0.8}
        >
          {validatePromo.isPending ? (
            <ActivityIndicator size="small" color={colors.text.inverse} />
          ) : (
            <Text style={styles.applyButtonText}>Appliquer</Text>
          )}
        </TouchableOpacity>
      </View>
      {errorMessage !== "" && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default PromoCodeInput;
