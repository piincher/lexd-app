import { useCallback, useMemo, useState } from "react";
import { Alert, Linking, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import { getCertificateDownloadUrl } from "../api/certificateApi";

interface UseCertificateDetailParams {
  certificateId: string;
  verificationCode: string;
  issuedAt: string;
  certificateUrl?: string | null;
  certificateMongoId?: string | null;
}

export function useCertificateDetail({
  certificateId,
  verificationCode,
  issuedAt,
  certificateUrl,
  certificateMongoId,
}: UseCertificateDetailParams) {
  const [isDownloading, setIsDownloading] = useState(false);

  const formattedDate = useMemo(
    () =>
      new Date(issuedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [issuedAt]
  );

  const verificationUrl = `lexdservices.com/verify/${verificationCode}`;
  const canDownload = !!(certificateUrl || certificateMongoId);

  const handleCopyCode = useCallback(async () => {
    await Clipboard.setStringAsync(verificationCode);
    Alert.alert("Copié", "Code de vérification copié dans le presse-papiers !");
  }, [verificationCode]);

  const handleCopyUrl = useCallback(async () => {
    await Clipboard.setStringAsync(verificationUrl);
    Alert.alert("Copié", "Lien de vérification copié dans le presse-papiers !");
  }, [verificationUrl]);

  const handleDownload = useCallback(async () => {
    try {
      setIsDownloading(true);
      if (certificateMongoId) {
        const url = await getCertificateDownloadUrl(certificateMongoId);
        await Linking.openURL(url);
        return;
      }
      if (certificateUrl) {
        await Linking.openURL(certificateUrl);
      }
    } catch (error) {
      if (certificateUrl) {
        Linking.openURL(certificateUrl);
      } else {
        Alert.alert("Erreur", "Impossible de télécharger le certificat.");
      }
    } finally {
      setIsDownloading(false);
    }
  }, [certificateMongoId, certificateUrl]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Je suis un expéditeur certifié LEXD ! Vérifiez mon certificat : https://${verificationUrl}`,
      });
    } catch (_error) {
      // User cancelled or share failed silently
    }
  }, [verificationUrl]);

  return {
    certificateId,
    verificationCode,
    formattedDate,
    verificationUrl,
    isDownloading,
    canDownload,
    handleCopyCode,
    handleCopyUrl,
    handleDownload,
    handleShare,
  };
}
