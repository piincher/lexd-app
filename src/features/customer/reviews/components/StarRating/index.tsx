import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { styles } from "./StarRating.styles";

interface StarRatingProps {
  rating: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16 }) => {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={size}
          color={star <= rating ? "#d4a843" : Theme.colors.text.disabled}
        />
      ))}
    </View>
  );
};
