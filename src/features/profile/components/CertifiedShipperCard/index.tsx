/**
 * CertifiedShipperCard Component
 * Displays certification progress or certified status in the Profile screen
 */

import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { navigationProps } from "@src/navigations/type";
import { CertificateProgress } from "../../api/certificateApi";
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from "./CertifiedShipperCard.styles";
import { CertifiedView } from "./CertifiedView";
import { ProgressView } from "./ProgressView";
import { CertifiedShipperSkeleton } from "./CertifiedShipperSkeleton";
import { useCertifiedShipperActions } from "../../hooks/useCertifiedShipperActions";

interface CertifiedShipperCardProps {
  progress: CertificateProgress | undefined;
  isLoading: boolean;
  error: Error | null;
  onRetry?: () => void;
}

export const CertifiedShipperCard: React.FC<CertifiedShipperCardProps> = ({
  progress, isLoading, error, onRetry,
}) => {
  const navigation = useNavigation<navigationProps>();
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const { handleDownload, handleShare, isDownloading } = useCertifiedShipperActions(progress);

  if (isLoading) {
    return (
      <View style={styles.card}>
        <CertifiedShipperSkeleton />
      </View>
    );
  }

  if (error) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 120 }}
        style={styles.card}
      >
        <View style={styles.titleRow}>
          <MaterialIcons name="emoji-events" size={22} color={colors.accent.gold} />
          <Text style={styles.title}>Certified Shipper</Text>
        </View>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={24} color={colors.status.error} />
          <Text style={styles.errorText}>Impossible de charger les données</Text>
          {onRetry && (
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
              <Text style={styles.retryText}>Réessayer</Text>
            </TouchableOpacity>
          )}
        </View>
      </MotiView>
    );
  }

  if (!progress) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 120 }}
        style={styles.card}
      >
        <View style={styles.titleRow}>
          <MaterialIcons name="emoji-events" size={22} color={colors.accent.gold} />
          <Text style={styles.title}>Certified Shipper</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: "0%" }]} />
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>-- / -- CBM</Text>
          <Text style={styles.progressPercentage}>0%</Text>
        </View>
        <Text style={styles.subtitle}>Commencez à expédier pour suivre votre progression</Text>
      </MotiView>
    );
  }

  if (progress.isCertified && progress.certificate) {
    return (
      <CertifiedView
        progress={progress}
        styles={styles}
        isDownloading={isDownloading}
        onDownload={handleDownload}
        onShare={handleShare}
      />
    );
  }

  return <ProgressView progress={progress} styles={styles} />;
};
