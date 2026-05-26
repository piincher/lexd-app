import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from './CertificateDetailClientSection.styles';

interface CertificateDetailClientSectionProps {
  clientName: string;
  phoneNumber: string;
}

export const CertificateDetailClientSection: React.FC<
  CertificateDetailClientSectionProps
> = ({ clientName, phoneNumber }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Informations du client</Text>
      <View style={styles.sectionCard}>
        <View style={styles.infoRow}>
          <Ionicons
            name="person-outline"
            size={18}
            color={colors.text.secondary}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Nom complet</Text>
            <Text style={styles.infoValue}>{clientName}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons
            name="call-outline"
            size={18}
            color={colors.text.secondary}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Numéro de téléphone</Text>
            <Text style={styles.infoValue}>{phoneNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
