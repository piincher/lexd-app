import { useState, useCallback } from "react";
import { Linking, Share, Alert } from "react-native";
import { getCertificateDownloadUrl, CertificateProgress } from "../api/certificateApi";

export interface UseCertifiedShipperActionsResult {
  handleDownload: () => Promise<void>;
  handleShare: () => Promise<void>;
  isDownloading: boolean;
}

export const useCertifiedShipperActions = (
  progress: CertificateProgress | undefined
): UseCertifiedShipperActionsResult => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!progress?.certificate?._id) return;
    try {
      setIsDownloading(true);
      const url = await getCertificateDownloadUrl(progress.certificate._id);
      await Linking.openURL(url);
    } catch {
      if (progress?.certificate?.certificateUrl) {
        Linking.openURL(progress.certificate.certificateUrl);
      } else {
        Alert.alert("Erreur", "Impossible de télécharger le certificat.");
      }
    } finally {
      setIsDownloading(false);
    }
  }, [progress]);

  const handleShare = useCallback(async () => {
    if (progress?.certificate?.certificateUrl) {
      try {
        await Share.share({
          message: `Je suis un expéditeur certifié LEXD ! Vérifiez mon certificat : ${progress.certificate.certificateUrl}`,
          url: progress.certificate.certificateUrl,
        });
      } catch { /* User cancelled or share failed silently */ }
    }
  }, [progress]);

  return { handleDownload, handleShare, isDownloading };
};
