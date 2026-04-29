import { useCallback } from "react";
import { Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { showMessage } from "react-native-flash-message";
import { useSendCertificateToClient, useDownloadCertificate } from "./useCertificateAdmin";
import { CertificateRecord } from "../api";

export const useCertificateSuccessActions = (issuedCertificate: CertificateRecord | null) => {
  const { mutate: sendToClient, isPending: isSending } = useSendCertificateToClient();
  const { download, isDownloading } = useDownloadCertificate();

  const handleSendWhatsApp = useCallback(() => {
    if (!issuedCertificate) return;
    sendToClient(issuedCertificate._id, {
      onSuccess: () => Alert.alert("Envoyé", "Le certificat a été envoyé au client via WhatsApp."),
      onError: (error) => Alert.alert("Erreur", error.message || "Impossible d'envoyer le certificat."),
    });
  }, [issuedCertificate, sendToClient]);

  const handleDownload = useCallback(() => {
    if (issuedCertificate?._id) download(issuedCertificate._id);
  }, [issuedCertificate, download]);

  const handleCopyCode = useCallback(async (code: string, label: string) => {
    await Clipboard.setStringAsync(code);
    showMessage({
      message: `${label} copié !`,
      description: `Le ${label.toLowerCase()} ${code} a été copié dans le presse-papiers.`,
      type: "success",
      duration: 2000,
    });
  }, []);

  return { handleSendWhatsApp, handleDownload, handleCopyCode, isSending, isDownloading };
};
