import { StyleSheet } from "react-native";

const createStyles = (colors: any) =>
   StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: colors.background?.default ?? "#F9FAFB",
      },
      scrollContent: {
         paddingBottom: 100,
      },
   });

export default createStyles;
