import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./CertificateDetailHeader.styles";

interface CertificateDetailHeaderProps {
  onBack: () => void;
}

export const CertificateDetailHeader: React.FC<CertificateDetailHeaderProps> = ({
  onBack,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
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
          color={colors.text.primary}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Détails du certificat</Text>
    </View>
  );
};
