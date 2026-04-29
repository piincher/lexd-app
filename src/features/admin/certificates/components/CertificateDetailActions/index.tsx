import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./CertificateDetailActions.styles";

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
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Ionicons name="download-outline" size={20} color="#FFFFFF" />
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
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <MaterialIcons name="block" size={20} color="#FFFFFF" />
          )}
          <Text style={styles.revokeButtonText}>Révoquer le certificat</Text>
        </TouchableOpacity>
      )}

      {!isActive && (
        <View style={styles.revokedNotice}>
          <MaterialIcons name="cancel" size={20} color="#DC2626" />
          <Text style={styles.revokedNoticeText}>
            Ce certificat a été révoqué
          </Text>
        </View>
      )}
    </>
  );
};
