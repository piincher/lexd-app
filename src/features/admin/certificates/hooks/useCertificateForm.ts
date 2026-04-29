import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useSearchUsersForCertificate, useIssueCertificate } from "./useCertificateAdmin";
import { CertificateUser, CertificateRecord } from "../api";

export const useCertificateForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<CertificateUser | null>(null);
  const [customNote, setCustomNote] = useState("");
  const [issuedCertificate, setIssuedCertificate] = useState<CertificateRecord | null>(null);

  const { data, isLoading } = useSearchUsersForCertificate(searchQuery);
  const { mutate: issueCert, isPending: isIssuing } = useIssueCertificate();

  const users = data?.users ?? [];

  const handleSelectUser = useCallback((user: CertificateUser) => {
    if (user.hasCertificate) {
      Alert.alert("Certificat existant", `${user.firstName} ${user.lastName} a déjà un certificat actif.`);
      return;
    }
    setSelectedUser((prev) => (prev?._id === user._id ? null : user));
  }, []);

  const handleIssue = useCallback(() => {
    if (!selectedUser) return;
    Alert.alert(
      "Émettre le certificat",
      `Êtes-vous sûr de vouloir émettre un certificat pour ${selectedUser.firstName} ${selectedUser.lastName} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Émettre",
          onPress: () => {
            issueCert(
              { userId: selectedUser._id, customNote: customNote.trim() || undefined },
              {
                onSuccess: setIssuedCertificate,
                onError: (error) => Alert.alert("Erreur", error.message || "Impossible d'émettre le certificat."),
              }
            );
          },
        },
      ]
    );
  }, [selectedUser, customNote, issueCert]);

  const handleIssueAnother = useCallback(() => {
    setIssuedCertificate(null);
    setSelectedUser(null);
    setCustomNote("");
    setSearchQuery("");
  }, []);

  return {
    searchQuery, setSearchQuery,
    selectedUser, setSelectedUser,
    customNote, setCustomNote,
    issuedCertificate,
    users, isLoading, isIssuing,
    handleSelectUser, handleIssue, handleIssueAnother,
  };
};
