/**
 * CertifiedShipperCard Component
 * Displays certification progress or certified status in the Profile screen
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useNavigation } from "@react-navigation/native";
import { navigationProps } from "@src/navigations/type";
import { getCertificateDownloadUrl } from "../../api/certificateApi";

interface CertificateProgress {
  currentCBM: number;
  targetCBM: number;
  percentage: number;
  isEligible: boolean;
  isCertified: boolean;
  certificate: {
    _id: string;
    certificateId: string;
    verificationCode: string;
    issuedAt: string;
    certificateUrl: string;
  } | null;
}

interface CertifiedShipperCardProps {
  progress: CertificateProgress | undefined;
  isLoading: boolean;
}

export const CertifiedShipperCard: React.FC<CertifiedShipperCardProps> = ({
  progress,
  isLoading,
}) => {
  const navigation = useNavigation<navigationProps>();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!progress?.certificate?._id) return;
    try {
      setIsDownloading(true);
      const url = await getCertificateDownloadUrl(progress.certificate._id);
      await Linking.openURL(url);
    } catch (error) {
      // Fallback to direct URL if secure download fails
      if (progress?.certificate?.certificateUrl) {
        Linking.openURL(progress.certificate.certificateUrl);
      } else {
        Alert.alert("Erreur", "Impossible de télécharger le certificat.");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (progress?.certificate?.certificateUrl) {
      try {
        await Share.share({
          message: `Je suis un expéditeur certifié ChinaLink Express ! Vérifiez mon certificat : ${progress.certificate.certificateUrl}`,
          url: progress.certificate.certificateUrl,
        });
      } catch (_error) {
        // User cancelled or share failed silently
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#d4a843" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </View>
    );
  }

  if (!progress) {
    return null;
  }

  if (progress.isCertified && progress.certificate) {
    const issuedDate = new Date(progress.certificate.issuedAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const isNew = progress.certificate.issuedAt &&
      (Date.now() - new Date(progress.certificate.issuedAt).getTime()) < 7 * 24 * 60 * 60 * 1000;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate("CertificateDetail", {
            certificateId: progress.certificate!.certificateId,
            verificationCode: progress.certificate!.verificationCode,
            issuedAt: progress.certificate!.issuedAt,
            certificateUrl: progress.certificate!.certificateUrl,
            certificateMongoId: progress.certificate!._id,
          })
        }
      >
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 120 }}
          style={styles.certifiedCard}
        >
          <View style={styles.chevronHint}>
            <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.4)" />
          </View>

          <View style={styles.certifiedHeader}>
            <MaterialIcons name="star" size={24} color="#F4D03F" />
            <Text style={styles.certifiedTitle}>{"\u2713"} Certified Shipper</Text>
            {isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NOUVEAU</Text>
              </View>
            )}
          </View>

          <Text style={styles.issuedDate}>Certifié le {issuedDate}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, isDownloading && styles.actionButtonDisabled]}
              onPress={handleDownload}
              activeOpacity={0.7}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <ActivityIndicator size="small" color="#d4a843" />
              ) : (
                <MaterialIcons name="file-download" size={18} color="#d4a843" />
              )}
              <Text style={styles.actionButtonText}>Télécharger</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <MaterialIcons name="share" size={18} color="#d4a843" />
              <Text style={styles.actionButtonText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </TouchableOpacity>
    );
  }

  // Progress state (not yet certified)
  const clampedPercentage = Math.min(progress.percentage, 100);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 120 }}
      style={styles.card}
    >
      <View style={styles.titleRow}>
        <MaterialIcons name="emoji-events" size={22} color="#d4a843" />
        <Text style={styles.title}>Certified Shipper</Text>
      </View>

      <View style={styles.progressBarTrack}>
        <MotiView
          from={{ width: "0%" }}
          animate={{ width: `${clampedPercentage}%` as any }}
          transition={{ type: "spring", damping: 20, stiffness: 80 }}
          style={styles.progressBarFill}
        />
      </View>

      <View style={styles.progressInfo}>
        <Text style={styles.progressText}>
          {progress.currentCBM.toFixed(1)} / {progress.targetCBM} CBM
        </Text>
        <Text style={styles.progressPercentage}>{progress.percentage.toFixed(1)}%</Text>
      </View>

      <Text style={styles.subtitle}>
        Expédiez {progress.targetCBM} CBM pour obtenir votre certificat
      </Text>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  certifiedCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212,168,67,0.3)",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
  },
  loadingText: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#d4a843",
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  progressText: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: Fonts.meduim,
    fontSize: 13,
  },
  progressPercentage: {
    color: "#d4a843",
    fontFamily: Fonts.bold,
    fontSize: 13,
  },
  subtitle: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 4,
  },
  certifiedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  certifiedTitle: {
    color: "#F4D03F",
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  issuedDate: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginBottom: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(212,168,67,0.15)",
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(212,168,67,0.3)",
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionButtonText: {
    color: "#d4a843",
    fontFamily: Fonts.meduim,
    fontSize: 13,
  },
  newBadge: {
    backgroundColor: "#d4a843",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  newBadgeText: {
    color: "#FFF",
    fontFamily: Fonts.bold,
    fontSize: 10,
  },
  chevronHint: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
