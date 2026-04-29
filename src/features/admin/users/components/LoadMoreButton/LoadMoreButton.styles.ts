import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingVertical: 16,
      alignItems: "center",
    },
    button: {
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: colors.primary.main + "15",
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary.main,
    },
  });
