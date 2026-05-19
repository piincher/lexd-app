import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useCertificateDetailAdmin } from "../hooks/useCertificateDetailAdmin";
import { createStyles } from "./CertificateDetailAdminScreen.styles";
import {
  CertificateDetailHeader,
  CertificateDetailIdentity,
  CertificateDetailStatusBadges,
  CertificateDetailClientSection,
  CertificateDetailCertificateSection,
  CertificateDetailManualSection,
  CertificateDetailActions,
} from "../components";

export default function CertificateDetailAdminScreen({
  navigation,
  route,
}: RootStackScreenProps<"CertificateDetailAdmin">) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { certificate } = route.params;
  const {
    isActive,
    isAuto,
    clientName,
    isDownloading,
    isRevoking,
    handlers,
  } = useCertificateDetailAdmin(certificate, navigation);

  return (
    <SafeAreaView style={styles.container}>
      <CertificateDetailHeader onBack={handlers.handleGoBack} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CertificateDetailIdentity
          certificateId={certificate.certificateId}
          onCopyCode={handlers.handleCopyCode}
        />
        <CertificateDetailStatusBadges
          isActive={isActive}
          type={certificate.type}
        />
        <CertificateDetailClientSection
          clientName={clientName}
          phoneNumber={certificate.userId.phoneNumber}
        />
        <CertificateDetailCertificateSection certificate={certificate} />
        {!isAuto && <CertificateDetailManualSection certificate={certificate} />}
        <CertificateDetailActions
          certificateUrl={certificate.certificateUrl}
          isActive={isActive}
          isDownloading={isDownloading}
          isRevoking={isRevoking}
          onDownload={handlers.handleDownload}
          onRevoke={handlers.handleRevoke}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
