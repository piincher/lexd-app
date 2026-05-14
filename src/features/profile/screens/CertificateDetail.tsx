import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { useCertificateDetail } from "../hooks/useCertificateDetail";
import { CertificateDetailHeader } from "../components/CertificateDetailHeader";
import { CertificateInfoCard } from "../components/CertificateInfoCard";
import { CertificateVerificationCard } from "../components/CertificateVerificationCard";
import { CertificateActions } from "../components/CertificateActions";
import { CertificateDetailFooter } from "../components/CertificateDetailFooter";
import { createStyles } from "./CertificateDetail.styles";

export default function CertificateDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<"CertificateDetail">) {
  const { certificateId, verificationCode, issuedAt, certificateUrl, certificateMongoId } =
    route.params;
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const {
    formattedDate,
    verificationUrl,
    isDownloading,
    canDownload,
    handleCopyCode,
    handleCopyUrl,
    handleDownload,
    handleShare,
  } = useCertificateDetail({
    certificateId,
    verificationCode,
    issuedAt,
    certificateUrl,
    certificateMongoId,
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <LinearGradient
        colors={Theme.gradients.dark}
        style={StyleSheet.absoluteFill}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <MaterialIcons name="arrow-back" size={26} color={colors.text.inverse} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CertificateDetailHeader />
        <CertificateInfoCard
          certificateId={certificateId}
          verificationCode={verificationCode}
          formattedDate={formattedDate}
          onCopyCode={handleCopyCode}
        />
        <CertificateVerificationCard
          verificationUrl={verificationUrl}
          onCopyUrl={handleCopyUrl}
        />
        <CertificateActions
          isDownloading={isDownloading}
          canDownload={canDownload}
          onDownload={handleDownload}
          onShare={handleShare}
        />
        <CertificateDetailFooter />
      </ScrollView>
    </SafeAreaView>
  );
}
