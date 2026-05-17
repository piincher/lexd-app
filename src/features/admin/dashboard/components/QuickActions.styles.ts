import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const getQuickActionsStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
      paddingHorizontal: 4,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      letterSpacing: -0.3,
    },
    sectionBadge: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    grid: {
      flexDirection: "row",
      gap: 10,
    },
    item: {
      flex: 1,
      borderRadius: 18,
      overflow: "hidden",
      ...Theme.shadows.sm,
    },
    gradient: {
      padding: 12,
      minHeight: 110,
      justifyContent: "space-between",
    },
    iconWrap: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: "rgba(255,255,255,0.25)",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
    },
    title: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      color: colors.text.inverse,
      marginTop: 1,
    },
  });
