import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
   dimensionsContainer: {
      marginTop: 20,
   },
   row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: -6,
   },
   dimensionColumn: {
      flex: 1,
      marginHorizontal: 6,
   },
   calculatedContainer: {
      marginTop: 16,
      alignItems: "center",
   },
   calculatedBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background.paper,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
   },
   calculatedLabel: {
      fontSize: 13,
      color: colors.status.success,
      fontWeight: "600",
      marginRight: 8,
   },
   calculatedValue: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.status.success,
   },
});
