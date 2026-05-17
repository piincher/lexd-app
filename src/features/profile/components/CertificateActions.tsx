import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { GOLD, WHITE_60, createStyles } from "../screens/CertificateDetail.styles";

interface Props {
  isDownloading: boolean;
  canDownload: boolean;
  onDownload: () => void;
  onShare: () => void;
}

export const CertificateActions: React.FC<Props> = ({
  isDownloading,
  canDownload,
  onDownload,
  onShare,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors.text.inverse);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 100, delay: 700 }}
      style={styles.actionsContainer}
    >
      <TouchableOpacity
        style={[
          styles.downloadButton,
          !canDownload && styles.downloadButtonDisabled,
          isDownloading && styles.downloadButtonDisabled,
        ]}
        onPress={onDownload}
        activeOpacity={0.7}
        disabled={!canDownload || isDownloading}
      >
        <LinearGradient
          colors={
            canDownload
              ? [colors.accent.gold, colors.accent.goldLight]
              : [colors.accent.gold + '4D', colors.accent.goldLight + '4D']
          }
          style={styles.downloadGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" color={colors.primary.dark} />
          ) : (
            <MaterialIcons
              name="file-download"
              size={22}
              color={canDownload ? colors.primary.dark : WHITE_60}
            />
          )}
          <Text
            style={[
              styles.downloadText,
              !canDownload && styles.downloadTextDisabled,
            ]}
          >
            Télécharger le certificat
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.shareButton}
        onPress={onShare}
        activeOpacity={0.7}
      >
        <MaterialIcons name="share" size={22} color={GOLD} />
        <Text style={styles.shareText}>Partager</Text>
      </TouchableOpacity>
    </MotiView>
  );
};
