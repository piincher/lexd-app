import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { styles } from "./CertificateHistoryHeader.styles";

interface CertificateHistoryHeaderProps {
  onBack: () => void;
  total: number;
}

export const CertificateHistoryHeader: React.FC<CertificateHistoryHeaderProps> = ({
  onBack,
  total,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={Theme.colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Certificats émis</Text>
          <Text style={styles.headerSubtitle}>
            {total} certificat{total !== 1 ? "s" : ""} au total
          </Text>
        </View>
      </View>
    </View>
  );
};
