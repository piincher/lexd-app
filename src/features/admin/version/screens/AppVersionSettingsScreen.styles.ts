import { StyleSheet, Platform } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: Record<string, unknown>, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: Platform.OS === "android" ? 12 : 20,
      paddingBottom: 16,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.neutral[100],
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    headerTitleContainer: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 22,
      fontFamily: Fonts.BOLD,
      color: colors.text.primary,
      marginBottom: 2,
    },
    headerSubtitle: {
      fontSize: 14,
      fontFamily: Fonts.MEDIUM,
      color: colors.text.secondary,
    },
    state: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    stateText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.secondary,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 16,
      marginTop: 12,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    cardTitle: {
      fontFamily: Fonts.BOLD,
      fontSize: 15,
      color: colors.text.primary,
      marginBottom: 12,
    },
    field: {
      marginBottom: 12,
    },
    fieldLabel: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 12,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.background.default,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    textArea: {
      minHeight: 60,
      paddingVertical: 10,
    },
    inputText: {
      flex: 1,
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.primary,
    },
    actionsRow: {
      gap: 10,
      paddingHorizontal: 16,
      marginTop: 16,
    },
    saveButton: {
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },
    saveButtonText: {
      fontFamily: Fonts.BOLD,
      fontSize: 15,
    },
    resetButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.status.error + "30",
    },
    resetButtonText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
    },
  });
