import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { styles } from "./UnassignedGoodsHeader.styles";

interface UnassignedGoodsHeaderProps {
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export const UnassignedGoodsHeader: React.FC<UnassignedGoodsHeaderProps> = ({
  onBack,
  rightElement,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Theme.colors.text.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Marchandises Non Assignées</Text>
      <View style={styles.right}>
        {rightElement}
      </View>
    </View>
  );
};
