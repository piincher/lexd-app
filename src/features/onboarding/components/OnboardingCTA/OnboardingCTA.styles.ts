import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { RADIUS } from "@src/shared/ui/designLanguage";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: { width: "100%" },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 52,
      paddingVertical: 12,
      borderRadius: RADIUS.control,
    },
    primaryButton: {
      backgroundColor: colors.primary.main,
      width: "100%",
    },
    nextButton: {
      backgroundColor: colors.primary.main,
      minWidth: 128,
      paddingHorizontal: 22,
    },
    nextButtonCompact: { minWidth: 116, paddingHorizontal: 16 },
    skipSlot: { flex: 1, alignItems: "flex-start", minWidth: 0 },
    nextSlot: { flex: 1, alignItems: "flex-end", minWidth: 0 },
    skipButton: {
      minHeight: 48,
      justifyContent: "center",
      paddingVertical: 10,
      paddingHorizontal: 14,
    },
    skipText: {
      color: colors.text.secondary,
      fontSize: 15,
      fontFamily: Fonts.medium,
      fontWeight: "500",
    },
    primaryText: {
      color: colors.text.inverse,
      fontSize: 17,
      fontFamily: Fonts.bold,
      fontWeight: "700",
    },
    nextText: {
      color: colors.text.inverse,
      fontSize: 15,
      fontFamily: Fonts.semiBold,
      fontWeight: "600",
    },
    icon: { marginLeft: 8 },
    iconSmall: { marginLeft: 6 },
  });
