import React from "react";
import { View, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from './CertificateDetailCertificateSection.styles';
import type { CertificateRecord } from "../../api";

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
};

interface CertificateDetailCertificateSectionProps {
  certificate: CertificateRecord;
}

export const CertificateDetailCertificateSection: React.FC<
  CertificateDetailCertificateSectionProps
> = ({ certificate }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Informations du certificat</Text>
      <View style={styles.sectionCard}>
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color={colors.text.secondary}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Date d&apos;émission</Text>
            <Text style={styles.infoValue}>
              {formatDate(certificate.issuedAt)}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons
            name="key-outline"
            size={18}
            color={colors.text.secondary}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Code de vérification</Text>
            <Text style={[styles.infoValue, styles.verificationCode]}>
              {certificate.verificationCode}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <MaterialIcons
            name="inventory"
            size={18}
            color={colors.text.secondary}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>CBM à l&apos;émission</Text>
            <Text style={styles.infoValue}>
              {certificate.totalCBMAtIssuance.toFixed(2)} CBM
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <MaterialIcons
            name="flag"
            size={18}
            color={colors.text.secondary}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Seuil requis</Text>
            <Text style={styles.infoValue}>
              {certificate.thresholdCBM} CBM
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
