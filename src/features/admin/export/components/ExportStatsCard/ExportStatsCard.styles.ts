import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginBottom: 20,
    },
    grid: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    statCell: {
      flex: 1,
      alignItems: "center",
      position: "relative",
    },
    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    value: {
      fontSize: 22,
      fontWeight: "800",
      letterSpacing: -0.5,
    },
    label: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.text.secondary,
      marginTop: 4,
    },
    divider: {
      position: "absolute",
      right: 0,
      top: 8,
      bottom: 8,
      width: 1,
      backgroundColor: colors.border,
    },
  });
