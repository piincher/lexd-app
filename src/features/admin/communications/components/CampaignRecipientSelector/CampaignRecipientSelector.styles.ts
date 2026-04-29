import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    field: { gap: 8 },
    label: { fontFamily: Fonts.semiBold, fontSize: 14, color: colors.text.secondary },
    segmentOption: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 14,
    },
    segmentOptionActive: {
      borderColor: "#8B5CF6",
      backgroundColor: isDark ? "#2E1065" : "#FAFAFE",
    },
    segmentRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.text.disabled,
      alignItems: "center",
      justifyContent: "center",
    },
    segmentRadioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#8B5CF6",
    },
    segmentLabel: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
    },
    segmentLabelActive: { color: isDark ? "#C4B5FD" : "#7C3AED" },
    segmentSublabel: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
      marginTop: 2,
    },
    containerList: { gap: 8 },
    containerItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    containerItemActive: {
      borderColor: "#8B5CF6",
      backgroundColor: isDark ? "#2E1065" : "#FAFAFE",
    },
    containerItemText: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
    },
    containerItemTextActive: {
      color: isDark ? "#C4B5FD" : "#7C3AED",
    },
    containerItemSubtext: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
      marginTop: 2,
    },
  });
