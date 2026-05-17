/**
 * StarRating Component
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface StarRatingProps {
  rating: number;
  size?: number;
  emptyStarColor?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  emptyStarColor,
}) => {
  const { colors } = useAppTheme();
  const emptyColor = emptyStarColor ?? colors.text.disabled;
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={size}
          color={star <= rating ? colors.accent.gold : emptyColor}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starRow: {
    flexDirection: "row",
    gap: 2,
  },
});
