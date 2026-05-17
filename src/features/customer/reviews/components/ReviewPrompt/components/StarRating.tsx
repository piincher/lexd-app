import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface StarRatingProps {
   rating: number;
   onRatingChange: (rating: number) => void;
   disabled?: boolean;
   size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
   rating,
   onRatingChange,
   disabled,
   size = 36,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.starContainer}>
         {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
               key={star}
               icon={star <= rating ? "star" : "star-outline"}
               size={size}
               iconColor={star <= rating ? colors.status.warning : colors.text.disabled}
               onPress={() => !disabled && onRatingChange(star)}
               disabled={disabled}
               style={styles.starButton}
            />
         ))}
      </View>
   );
};

const styles = StyleSheet.create({
   starContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 8,
   },
   starButton: {
      margin: 0,
   },
});
