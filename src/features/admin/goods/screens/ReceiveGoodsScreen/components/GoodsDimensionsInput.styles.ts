import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
   StyleSheet.create({
      card: {
         marginVertical: 8,
         borderRadius: 12,
         backgroundColor: colors.background.card,
      },
      cardContent: {
         padding: 16,
      },
   });
