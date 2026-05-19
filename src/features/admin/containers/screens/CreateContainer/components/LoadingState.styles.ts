import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
   StyleSheet.create({
      overlay: {
         ...StyleSheet.absoluteFillObject,
         backgroundColor: colors.background.overlay,
         justifyContent: "center",
         alignItems: "center",
         zIndex: 1000,
      },
   });
