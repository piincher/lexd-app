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
      marginLeft: 12,
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },
    addBtn: {
      backgroundColor: colors.primary.main,
      borderRadius: 8,
      padding: 6,
    },

    listContent: { padding: 16 },
    loader: { marginTop: 40 },
  });
