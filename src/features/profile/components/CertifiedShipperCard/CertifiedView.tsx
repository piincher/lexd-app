/**
 * CertifiedView Sub-component
 * Displays the certified state of the shipper
 */

import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { navigationProps } from "@src/navigations/type";
import { CertificateProgress } from "../../api/certificateApi";
import { createStyles } from "./CertifiedShipperCard.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface CertifiedViewProps {
  progress: CertificateProgress;
  styles: ReturnType<typeof createStyles>;
  isDownloading: boolean;
  onDownload: () => void;
  onShare: () => void;
}

export const CertifiedView: React.FC<CertifiedViewProps> = ({
  progress, styles, isDownloading, onDownload, onShare,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<navigationProps>();
  const issuedDate = new Date(progress.certificate!.issuedAt).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
  const isNew = Date.now() - new Date(progress.certificate!.issuedAt).getTime() < 7 * 24 * 60 * 60 * 1000;

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
          <MaterialIcons name="chevron-right" size={20} color={styles.chevronHintColor} />
        </View>
        <View style={styles.certifiedHeader}>
          <MaterialIcons name="star" size={24} color={colors.accent.goldLight} />
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
            onPress={onDownload}
            activeOpacity={0.7}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <ActivityIndicator size="small" color={colors.accent.gold} />
            ) : (
              <MaterialIcons name="file-download" size={18} color={colors.accent.gold} />
            )}
            <Text style={styles.actionButtonText}>Télécharger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onShare} activeOpacity={0.7}>
            <MaterialIcons name="share" size={18} color={colors.accent.gold} />
            <Text style={styles.actionButtonText}>Partager</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("TrustProfile")}
            activeOpacity={0.7}
          >
            <MaterialIcons name="verified-user" size={18} color={colors.accent.gold} />
            <Text style={styles.actionButtonText}>Profil</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </TouchableOpacity>
  );
};
