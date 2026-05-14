import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   listContent: {
      paddingHorizontal: 16,
      paddingBottom: 12,
   },
   card: {
      minHeight: 104,
      borderWidth: 1,
      borderRadius: 16,
      padding: 12,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
   },
   image: {
      width: 56,
      height: 56,
      borderRadius: 14,
      marginRight: 12,
   },
   imageFallback: {
      width: 56,
      height: 56,
      borderRadius: 14,
      marginRight: 12,
      alignItems: "center",
      justifyContent: "center",
   },
   body: {
      flex: 1,
      gap: 6,
   },
   titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
   },
   name: {
      flex: 1,
      fontSize: 15,
      fontWeight: "800",
   },
   check: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   meta: {
      fontSize: 12,
   },
   detailRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
   },
   badge: {
      maxWidth: 130,
      borderRadius: 999,
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontSize: 11,
      fontWeight: "800",
      overflow: "hidden",
   },
   detail: {
      fontSize: 11,
      flexShrink: 1,
   },
   empty: {
      minHeight: 220,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
   },
   emptyTitle: {
      fontSize: 16,
      fontWeight: "800",
      marginTop: 12,
      textAlign: "center",
   },
   emptySubtitle: {
      fontSize: 13,
      lineHeight: 19,
      marginTop: 6,
      textAlign: "center",
   },
});
