import React from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CertificateRecord, CertificateUser } from "../../api";
import { Theme } from "@src/constants/Theme";
import { styles } from "./CertificateSuccessView.styles";

interface CertificateSuccessViewProps {
  issuedCertificate: CertificateRecord;
  selectedUser: CertificateUser | null;
  onDownload: () => void;
  isDownloading: boolean;
  onSendWhatsApp: () => void;
  isSending: boolean;
  onIssueAnother: () => void;
  onBack: () => void;
  onCopyCode: (code: string, label: string) => void;
}

export const CertificateSuccessView: React.FC<CertificateSuccessViewProps> = ({
  issuedCertificate,
  selectedUser,
  onDownload,
  isDownloading,
  onSendWhatsApp,
  isSending,
  onIssueAnother,
  onBack,
  onCopyCode,
}) => {
  const clientName =
    typeof issuedCertificate.userId === "object" && issuedCertificate.userId?.firstName
      ? `${issuedCertificate.userId.firstName} ${issuedCertificate.userId.lastName}`
      : selectedUser
        ? `${selectedUser.firstName} ${selectedUser.lastName}`
        : "";

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrapper}>
          <MaterialIcons name="check-circle" size={80} color="#22C55E" />
        </View>

        <Text style={styles.title}>Certificat émis avec succès</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>N° Certificat</Text>
            <View style={styles.valueWithCopy}>
              <Text style={styles.value}>{issuedCertificate.certificateId}</Text>
              <TouchableOpacity
                onPress={() => onCopyCode(issuedCertificate.certificateId, "Code")}
                style={styles.copyButton}
              >
                <Ionicons name="copy-outline" size={18} color={Theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Client</Text>
            <Text style={styles.value}>{clientName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Code de vérification</Text>
            <View style={styles.valueWithCopy}>
              <Text style={[styles.value, styles.verificationCode]}>
                {issuedCertificate.verificationCode}
              </Text>
              <TouchableOpacity
                onPress={() => onCopyCode(issuedCertificate.verificationCode, "Code de vérification")}
                style={styles.copyButton}
              >
                <Ionicons name="copy-outline" size={18} color={Theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {issuedCertificate.certificateUrl ? (
          <TouchableOpacity
            style={[styles.downloadButton, isDownloading && styles.disabled]}
            onPress={onDownload}
            activeOpacity={0.7}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <ActivityIndicator size="small" color="#d4a843" />
            ) : (
              <MaterialIcons name="file-download" size={22} color="#d4a843" />
            )}
            <Text style={styles.downloadButtonText}>Télécharger</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.generatingContainer}>
            <ActivityIndicator size="small" color={Theme.colors.text.muted} />
            <Text style={styles.generatingText}>PDF en cours de génération...</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.whatsappButton, isSending && styles.disabled]}
          onPress={onSendWhatsApp}
          disabled={isSending}
          activeOpacity={0.7}
        >
          {isSending ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              <MaterialIcons name="send" size={20} color="#FFF" />
              <Text style={styles.whatsappButtonText}>Envoyer via WhatsApp</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onIssueAnother}
          activeOpacity={0.7}
        >
          <MaterialIcons name="add-circle-outline" size={20} color="#d4a843" />
          <Text style={styles.secondaryButtonText}>Émettre un autre</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backTextButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backTextButtonText}>Retour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
