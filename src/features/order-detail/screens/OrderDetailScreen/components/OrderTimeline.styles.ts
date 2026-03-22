import { StyleSheet } from "react-native";
import { COLORS } from "@src/constants/Colors";

export const styles = StyleSheet.create({
   card: {
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 14,
      elevation: 2,
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
   },
   headerTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#1F2937",
   },
   syncIcon: {
      marginLeft: 4,
   },
   timeline: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingVertical: 12,
   },
   step: {
      alignItems: "center",
      flex: 1,
   },
   connector: {
      position: "absolute",
      top: 16,
      right: "50%",
      left: "-50%",
      height: 2,
      zIndex: -1,
   },
   circle: {
      width: 34,
      height: 34,
      borderRadius: 17,
      justifyContent: "center",
      alignItems: "center",
   },
   stepLabel: {
      fontSize: 10,
      marginTop: 6,
      textAlign: "center",
   },
   currentStatusRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingTop: 8,
      paddingBottom: 4,
      borderTopWidth: 1,
      borderTopColor: "#F3F4F6",
   },
   currentStatusText: {
      fontSize: 13,
      color: "#374151",
      fontWeight: "500",
      flex: 1,
   },
   syncBadge: {
      fontSize: 10,
      color: COLORS.green,
      backgroundColor: "#ECFDF5",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      fontWeight: "500",
   },
});
