import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createStyles } from "./CertificateDetailActions.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface CertificateDetailActionsProps {
  certificateUrl: string | null;
  isActive: boolean;
  isDownloading: boolean;
  isRevoking: boolean;
  onDownload: () => void;
  onRevoke: () => void;
}

export const CertificateDetailActions: React.FC<
  CertificateDetailActionsProps
> = ({
  certificateUrl,
  isActive,
  isDownloading,
  isRevoking,
  onDownload,
  onRevoke,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      {certificateUrl ? (
        <TouchableOpacity
          style={[styles.downloadButton, isDownloading && styles.buttonDisabled]}
          onPress={onDownload}
          activeOpacity={0.7}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" color={colors.text.inverse} />
          ) : (
            <Ionicons name="download-outline" size={20} color={colors.text.inverse} />
          )}
          <Text style={styles.downloadButtonText}>Télécharger le certificat</Text>
        </TouchableOpacity>
      ) : null}

      {isActive && (
        <TouchableOpacity
          style={[styles.revokeButton, isRevoking && styles.buttonDisabled]}
          onPress={onRevoke}
          activeOpacity={0.7}
          disabled={isRevoking}
        >
          {isRevoking ? (
            <ActivityIndicator size="small" color={colors.text.inverse} />
          ) : (
            <MaterialIcons name="block" size={20} color={colors.text.inverse} />
          )}
          <Text style={styles.revokeButtonText}>Révoquer le certificat</Text>
        </TouchableOpacity>
      )}

      {!isActive && (
        <View style={styles.revokedNotice}>
          <MaterialIcons name="cancel" size={20} color={colors.status.error} />
          <Text style={styles.revokedNoticeText}>
            Ce certificat a été révoqué
          </Text>
        </View>
      )}
    </>
  );
};
