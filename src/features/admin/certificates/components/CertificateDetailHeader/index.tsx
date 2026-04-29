import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { styles } from "./CertificateDetailHeader.styles";

interface CertificateDetailHeaderProps {
  onBack: () => void;
}

export const CertificateDetailHeader: React.FC<CertificateDetailHeaderProps> = ({
  onBack,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={Theme.colors.text.primary}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Détails du certificat</Text>
    </View>
  );
};
