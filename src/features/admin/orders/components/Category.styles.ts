import { StyleSheet, Platform } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      padding: 8,
      backgroundColor: colors.background.paper,
      borderRadius: 16,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 16,
      borderWidth: 0.5,
      borderColor: colors.border,
    },
    tab: {
      flex: 1,
      marginHorizontal: 4,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      borderWidth: 0.5,
      borderColor: colors.border,
    },
    activeTab: {
      backgroundColor: colors.primary.main,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 0,
    },
    pressedTab: {
      opacity: Platform.OS === "web" ? 0.9 : 0.8,
    },
    tabContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    tabText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      fontWeight: "500",
    },
    activeTabText: {
      fontFamily: Fonts.bold,
      fontWeight: "600",
    },
    icon: {
      marginRight: 4,
    },
  });
