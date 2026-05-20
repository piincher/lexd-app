import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    container: {
      backgroundColor: colors.background.paper,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "85%",
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    headerTitle: {
      flex: 1,
      fontFamily: Fonts.BOLD,
      fontSize: 18,
      color: colors.text.primary,
    },
    closeButton: {
      padding: 4,
    },
    content: {
      padding: 20,
      paddingBottom: 8,
    },
    label: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 8,
    },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background.default,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.primary,
      paddingVertical: 4,
    },
    userList: {
      marginTop: 8,
      gap: 6,
    },
    userRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.background.default,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    userName: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
      color: colors.text.primary,
    },
    userPhone: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
    },
    selectedUser: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.status.success + "10",
      borderRadius: 10,
      padding: 12,
      marginTop: 10,
      borderWidth: 1,
      borderColor: colors.status.success + "30",
    },
    triggerList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    triggerChip: {
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    triggerChipActive: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
    triggerText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
      color: colors.text.secondary,
    },
    triggerTextActive: {
      color: colors.text.inverse,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border.light,
    },
    triggerButton: {
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },
    triggerButtonDisabled: {
      opacity: 0.5,
    },
    triggerButtonText: {
      fontFamily: Fonts.BOLD,
      fontSize: 15,
    },
  });
