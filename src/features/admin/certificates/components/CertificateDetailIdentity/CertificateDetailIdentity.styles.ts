import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  idContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  certificateIdText: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
  },
  copyButton: {
    padding: 6,
    backgroundColor: colors.neutral[100],
    borderRadius: 8,
  },
});
