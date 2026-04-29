import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },
    keyboardAvoidingView: { flex: 1 },
    content: { padding: 16, gap: 20, paddingBottom: 40 },
  });
