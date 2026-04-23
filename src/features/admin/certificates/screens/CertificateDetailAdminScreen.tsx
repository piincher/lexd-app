import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import { showMessage } from "react-native-flash-message";
import {
  useDownloadCertificate,
  useRevokeCertificate,
} from "../hooks/useCertificateAdmin";
import type { RootStackScreenProps } from "@src/navigations/type";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

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

export default function CertificateDetailAdminScreen({
  navigation,
  route,
}: RootStackScreenProps<"CertificateDetailAdmin">) {
  const { certificate } = route.params;

  const { download, isDownloading } = useDownloadCertificate();
  const { mutate: revoke, isPending: isRevoking } = useRevokeCertificate();

  const [localStatus, setLocalStatus] = useState<"ACTIVE" | "REVOKED" | null>(null);

  const currentStatus = localStatus ?? certificate.status;
  const isActive = currentStatus === "ACTIVE";

  const clientName = `${certificate.userId.firstName} ${certificate.userId.lastName}`;

  const handleRevoke = useCallback(() => {
    Alert.alert(
      "Révoquer le certificat ?",
      `Cette action est irréversible. Le certificat de ${clientName} sera définitivement révoqué.`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Révoquer",
          style: "destructive",
          onPress: () => {
            revoke(certificate._id, {
              onSuccess: () => {
                setLocalStatus("REVOKED");
                Alert.alert("Succès", "Le certificat a été révoqué avec succès.");
              },
              onError: (error) => {
                Alert.alert(
                  "Erreur",
                  error.message || "Impossible de révoquer le certificat."
                );
              },
            });
          },
        },
      ]
    );
  }, [certificate, clientName, revoke]);

  const handleDownload = useCallback(() => {
    download(certificate._id);
  }, [certificate, download]);

  const handleCopyCode = useCallback(async () => {
    await Clipboard.setStringAsync(certificate.certificateId);
    showMessage({
      message: "Code copié !",
      description: `Le code ${certificate.certificateId} a été copié dans le presse-papiers.`,
      type: "success",
      duration: 2000,
    });
  }, [certificate.certificateId]);

  const isAuto = certificate.type === "AUTO";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={Theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du certificat</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Certificate ID */}
        <View style={styles.idContainer}>
          <MaterialIcons name="verified" size={28} color="#d4a843" />
          <Text style={styles.certificateIdText}>{certificate.certificateId}</Text>
          <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={20} color={Theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Status + Type badges */}
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeRevoked]}>
            <Text
              style={[
                styles.badgeText,
                isActive ? styles.badgeActiveText : styles.badgeRevokedText,
              ]}
            >
              {isActive ? "ACTIF" : "RÉVOQUÉ"}
            </Text>
          </View>
          <View style={[styles.badge, isAuto ? styles.badgeAuto : styles.badgeManual]}>
            <Text
              style={[
                styles.badgeText,
                isAuto ? styles.badgeAutoText : styles.badgeManualText,
              ]}
            >
              {certificate.type}
            </Text>
          </View>
        </View>

        {/* Client Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du client</Text>
          <View style={styles.sectionCard}>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={18} color={Theme.colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nom complet</Text>
                <Text style={styles.infoValue}>{clientName}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={18} color={Theme.colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Numéro de téléphone</Text>
                <Text style={styles.infoValue}>{certificate.userId.phoneNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Certificate Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du certificat</Text>
          <View style={styles.sectionCard}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={18} color={Theme.colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date d'émission</Text>
                <Text style={styles.infoValue}>{formatDate(certificate.issuedAt)}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="key-outline" size={18} color={Theme.colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Code de vérification</Text>
                <Text style={[styles.infoValue, styles.verificationCode]}>
                  {certificate.verificationCode}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <MaterialIcons name="inventory" size={18} color={Theme.colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>CBM à l'émission</Text>
                <Text style={styles.infoValue}>
                  {certificate.totalCBMAtIssuance.toFixed(2)} CBM
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <MaterialIcons name="flag" size={18} color={Theme.colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Seuil requis</Text>
                <Text style={styles.infoValue}>{certificate.thresholdCBM} CBM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Manual Certificate Info */}
        {certificate.type === "MANUAL" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Émission manuelle</Text>
            <View style={styles.sectionCard}>
              {certificate.issuedBy && (
                <>
                  <View style={styles.infoRow}>
                    <Ionicons name="shield-checkmark-outline" size={18} color={Theme.colors.text.secondary} />
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
                    <Ionicons name="document-text-outline" size={16} color="#92400E" />
                    <View style={styles.noteContent}>
                      <Text style={styles.noteLabel}>Note personnalisée</Text>
                      <Text style={styles.noteText}>{certificate.customNote}</Text>
                    </View>
                  </View>
                </>
              ) : null}
            </View>
          </View>
        )}

        {/* Download Button */}
        {certificate.certificateUrl ? (
          <TouchableOpacity
            style={[styles.downloadButton, isDownloading && styles.buttonDisabled]}
            onPress={handleDownload}
            activeOpacity={0.7}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons name="download-outline" size={20} color="#FFFFFF" />
            )}
            <Text style={styles.downloadButtonText}>Télécharger le certificat</Text>
          </TouchableOpacity>
        ) : null}

        {/* Revoke Button */}
        {isActive && (
          <TouchableOpacity
            style={[styles.revokeButton, isRevoking && styles.buttonDisabled]}
            onPress={handleRevoke}
            activeOpacity={0.7}
            disabled={isRevoking}
          >
            {isRevoking ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <MaterialIcons name="block" size={20} color="#FFFFFF" />
            )}
            <Text style={styles.revokeButtonText}>Révoquer le certificat</Text>
          </TouchableOpacity>
        )}

        {/* Revoked notice */}
        {!isActive && (
          <View style={styles.revokedNotice}>
            <MaterialIcons name="cancel" size={20} color="#DC2626" />
            <Text style={styles.revokedNoticeText}>Ce certificat a été révoqué</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 12 : 20,
    paddingBottom: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
    gap: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Theme.colors.neutral[100],
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
  },

  /* Scroll */
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  /* Certificate ID */
  idContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  certificateIdText: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
  },
  copyButton: {
    padding: 6,
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: 8,
  },

  /* Badges */
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    textTransform: "uppercase",
  },
  badgeActive: {
    backgroundColor: "#DCFCE7",
  },
  badgeActiveText: {
    color: "#15803D",
  },
  badgeRevoked: {
    backgroundColor: "#FEE2E2",
  },
  badgeRevokedText: {
    color: "#DC2626",
  },
  badgeAuto: {
    backgroundColor: "#DBEAFE",
  },
  badgeAutoText: {
    color: "#1D4ED8",
  },
  badgeManual: {
    backgroundColor: "#FEF3C7",
  },
  badgeManualText: {
    color: "#92400E",
  },

  /* Sections */
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  /* Info rows */
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.disabled,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.primary,
  },
  verificationCode: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#d4a843",
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.neutral[100],
    marginVertical: 4,
  },

  /* Note */
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
  },
  noteContent: {
    flex: 1,
  },
  noteLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.disabled,
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#92400E",
    lineHeight: 20,
  },

  /* Download button */
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d4a843",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#FFFFFF",
  },

  /* Revoke button */
  revokeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC2626",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    gap: 8,
  },
  revokeButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#FFFFFF",
  },

  /* Disabled button */
  buttonDisabled: {
    opacity: 0.6,
  },

  /* Revoked notice */
  revokedNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  revokedNoticeText: {
    fontSize: 15,
    fontFamily: Fonts.meduim,
    color: "#DC2626",
  },
});
