import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./UnassignedGoodsEmpty.styles";

export const UnassignedGoodsEmpty: React.FC = () => {
  return (
    <View style={styles.empty}>
      <Ionicons name="checkmark-circle" size={64} color="#10B981" />
      <Text style={styles.emptyText}>Aucune marchandise en attente</Text>
    </View>
  );
};
