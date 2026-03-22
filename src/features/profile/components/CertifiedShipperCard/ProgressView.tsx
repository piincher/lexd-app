/**
 * ProgressView Sub-component
 * Displays the progress state for non-certified shippers
 */

import React from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { CertificateProgress } from "../../api/certificateApi";
import { createStyles } from "./CertifiedShipperCard.styles";

interface ProgressViewProps {
  progress: CertificateProgress;
  styles: ReturnType<typeof createStyles>;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ progress, styles }) => {
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
