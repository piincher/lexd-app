import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { styles } from "./GoodsPdfExportHeader.styles";

interface GoodsPdfExportHeaderProps {
  onBack: () => void;
}

export const GoodsPdfExportHeader: React.FC<GoodsPdfExportHeaderProps> = ({
  onBack,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Theme.neutral[800]} />
      </TouchableOpacity>
      <Text style={styles.title}>Exporter en PDF</Text>
      <View style={styles.backButton} />
    </View>
  );
};
