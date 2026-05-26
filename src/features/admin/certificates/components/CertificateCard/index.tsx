import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { showMessage } from "react-native-flash-message";
import { CertificateRecord } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from './CertificateCard.styles';

interface CertificateCardProps {
  certificate: CertificateRecord;
  onDownload: (certificateId: string) => void;
  isDownloading: boolean;
  onPress: () => void;
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onDownload,
  isDownloading,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const isAuto = certificate.type === "AUTO";
  const isActive = certificate.status === "ACTIVE";

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(certificate.certificateId);
    showMessage({
      message: "Code copié !",
      description: `Le code ${certificate.certificateId} a été copié dans le presse-papiers.`,
      type: "success",
      duration: 2000,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.certificateIdContainer}>
          <Text style={styles.certificateId}>{certificate.certificateId}</Text>
          <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, isAuto ? styles.badgeAuto : styles.badgeManual]}>
            <Text style={[styles.badgeText, isAuto ? styles.badgeAutoText : styles.badgeManualText]}>
              {certificate.type}
            </Text>
          </View>
          <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeRevoked]}>
            <Text style={[styles.badgeText, isActive ? styles.badgeActiveText : styles.badgeRevokedText]}>
              {isActive ? "ACTIF" : "RÉVOQUÉ"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="person-outline" size={16} color={colors.text.secondary} />
        <Text style={styles.cardRowText}>
          {certificate.userId.firstName} {certificate.userId.lastName}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <Ionicons name="call-outline" size={16} color={colors.text.secondary} />
        <Text style={styles.cardRowText}>{certificate.userId.phoneNumber}</Text>
      </View>

      <View style={styles.cardRow}>
        <MaterialIcons name="inventory" size={16} color={colors.text.secondary} />
        <Text style={styles.cardRowText}>
          {certificate.totalCBMAtIssuance.toFixed(2)} CBM (seuil : {certificate.thresholdCBM} CBM)
        </Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="calendar-outline" size={16} color={colors.text.secondary} />
        <Text style={styles.cardRowText}>{formatDate(certificate.issuedAt)}</Text>
      </View>

      {certificate.type === "MANUAL" && certificate.issuedBy && (
        <View style={styles.cardRow}>
          <Ionicons name="shield-checkmark-outline" size={16} color={colors.text.secondary} />
          <Text style={styles.cardRowText}>
            Émis par {certificate.issuedBy.firstName} {certificate.issuedBy.lastName}
          </Text>
        </View>
      )}

      {certificate.customNote ? (
        <View style={styles.noteContainer}>
          <Ionicons name="document-text-outline" size={14} color={colors.status.warning} />
          <Text style={styles.noteText}>{certificate.customNote}</Text>
        </View>
      ) : null}

      {certificate.certificateUrl ? (
        <TouchableOpacity
          style={[styles.downloadButton, isDownloading && styles.downloadButtonDisabled]}
          onPress={() => onDownload(certificate._id)}
          activeOpacity={0.7}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" color={colors.text.inverse} />
          ) : (
            <Ionicons name="download-outline" size={18} color={colors.text.inverse} />
          )}
          <Text style={styles.downloadButtonText}>Télécharger</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};
