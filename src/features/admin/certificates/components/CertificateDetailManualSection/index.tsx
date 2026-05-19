import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from './CertificateDetailManualSection.styles';
import type { CertificateRecord } from "../../api";

interface CertificateDetailManualSectionProps {
  certificate: CertificateRecord;
}

export const CertificateDetailManualSection: React.FC<
  CertificateDetailManualSectionProps
> = ({ certificate }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Émission manuelle</Text>
      <View style={styles.sectionCard}>
        {certificate.issuedBy && (
          <>
            <View style={styles.infoRow}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={colors.text.secondary}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Émis par</Text>
                <Text style={styles.infoValue}>
                  {certificate.issuedBy.firstName} {certificate.issuedBy.lastName}
                </Text>
              </View>
            </View>
          </>
        )}
        {certificate.customNote ? (
          <>
            {certificate.issuedBy && <View style={styles.divider} />}
            <View style={styles.noteContainer}>
              <Ionicons
                name="document-text-outline"
                size={16}
                color={colors.status.warning}
              />
              <View style={styles.noteContent}>
                <Text style={styles.noteLabel}>Note personnalisée</Text>
                <Text style={styles.noteText}>{certificate.customNote}</Text>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};
