
import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const usePromoCodeInputStyles = () => {
  const { colors } = useAppTheme();

  const styles = StyleSheet.create({
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
  });

  return { styles, colors };
};
