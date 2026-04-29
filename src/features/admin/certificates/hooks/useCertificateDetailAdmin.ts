import { useState, useCallback } from "react";
import { Alert } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@src/navigations/type";
import * as Clipboard from "expo-clipboard";
import { showMessage } from "react-native-flash-message";
import {
  useDownloadCertificate,
  useRevokeCertificate,
} from "./useCertificateAdmin";
import type { CertificateRecord } from "../api";
type UseCertificateDetailAdminReturn = {
  currentStatus: "ACTIVE" | "REVOKED";
  isActive: boolean;
  isAuto: boolean;
  clientName: string;
  isDownloading: boolean;
  isRevoking: boolean;
  handlers: {
    handleRevoke: () => void;
    handleDownload: () => void;
    handleCopyCode: () => void;
    handleGoBack: () => void;
  };
};

export const useCertificateDetailAdmin = (
  certificate: CertificateRecord,
  navigation: NativeStackNavigationProp<RootStackParamList>
): UseCertificateDetailAdminReturn => {
  const { download, isDownloading } = useDownloadCertificate();
  const { mutate: revoke, isPending: isRevoking } = useRevokeCertificate();
  const [localStatus, setLocalStatus] = useState<"ACTIVE" | "REVOKED" | null>(null);

  const currentStatus = localStatus ?? certificate.status;
  const isActive = currentStatus === "ACTIVE";
  const isAuto = certificate.type === "AUTO";
  const clientName = `${certificate.userId.firstName} ${certificate.userId.lastName}`;

  const handleRevoke = useCallback(() => {
    Alert.alert(
      "Révoquer le certificat ?",
      `Cette action est irréversible. Le certificat de ${clientName} sera définitivement révoqué.`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Révoquer",
          style: "destructive",
          onPress: () => {
            revoke(certificate._id, {
              onSuccess: () => {
                setLocalStatus("REVOKED");
                Alert.alert("Succès", "Le certificat a été révoqué avec succès.");
              },
              onError: (error: Error) => {
                Alert.alert(
                  "Erreur",
                  error.message || "Impossible de révoquer le certificat."
                );
              },
            });
          },
        },
      ]
    );
  }, [certificate._id, clientName, revoke]);

  const handleDownload = useCallback(() => {
    download(certificate._id);
  }, [certificate._id, download]);

  const handleCopyCode = useCallback(async () => {
    await Clipboard.setStringAsync(certificate.certificateId);
    showMessage({
      message: "Code copié !",
      description: `Le code ${certificate.certificateId} a été copié dans le presse-papiers.`,
      type: "success",
      duration: 2000,
    });
  }, [certificate.certificateId]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    currentStatus,
    isActive,
    isAuto,
    clientName,
    isDownloading,
    isRevoking,
    handlers: {
      handleRevoke,
      handleDownload,
      handleCopyCode,
      handleGoBack,
    },
  };
};
