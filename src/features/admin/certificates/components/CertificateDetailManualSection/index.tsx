import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { styles } from "./CertificateDetailManualSection.styles";
import type { CertificateRecord } from "../../api";

interface CertificateDetailManualSectionProps {
  certificate: CertificateRecord;
}

export const CertificateDetailManualSection: React.FC<
  CertificateDetailManualSectionProps
> = ({ certificate }) => {
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
                color={Theme.colors.text.secondary}
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
                color="#92400E"
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
