import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { styles } from "./UnassignedGoodsEmpty.styles";

export const UnassignedGoodsEmpty: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.empty}>
      <Ionicons name="checkmark-circle" size={64} color={colors.status.success} />
      <Text style={styles.emptyText}>Aucune marchandise en attente</Text>
    </View>
  );
};
