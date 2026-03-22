/**
 * StarRating Component
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StarRatingProps {
  rating: number;
  size?: number;
  emptyStarColor?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  emptyStarColor = "rgba(128,128,128,0.3)",
}) => {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={size}
          color={star <= rating ? "#d4a843" : emptyStarColor}
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
