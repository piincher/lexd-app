import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { styles } from "./MyReviewsEmpty.styles";

export const MyReviewsEmpty: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <MaterialIcons
        name="rate-review"
        size={64}
        color={Theme.colors.text.disabled}
      />
      <Text style={styles.emptyTitle}>Aucun avis</Text>
      <Text style={styles.emptySubtitle}>
        Vous n'avez pas encore laissé d'avis
      </Text>
    </View>
  );
};
