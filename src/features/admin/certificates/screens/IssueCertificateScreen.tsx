import React from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@src/constants/Theme";
import { useIssueCertificateScreen } from "../hooks/useIssueCertificateScreen";
import { useCertificateSuccessActions } from "../hooks/useCertificateSuccessActions";
import { CertificateSuccessView } from "../components/CertificateSuccessView";
import { UserSearchList } from "../components/UserSearchList";
import { IssueFormPanel } from "../components/IssueFormPanel";
import { styles } from "./IssueCertificateScreen.styles";

export default function IssueCertificateScreen() {
  const {
    searchQuery, setSearchQuery,
    selectedUser,
    customNote, setCustomNote,
    issuedCertificate,
    users, isLoading, isIssuing,
    handleSelectUser, handleIssue, handleIssueAnother,
    handleGoBack,
  } = useIssueCertificateScreen();

  const {
    handleSendWhatsApp, handleDownload, handleCopyCode, isSending, isDownloading,
  } = useCertificateSuccessActions(issuedCertificate);

  if (issuedCertificate) {
    return (
      <CertificateSuccessView
        issuedCertificate={issuedCertificate}
        selectedUser={selectedUser}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        onSendWhatsApp={handleSendWhatsApp}
        isSending={isSending}
        onIssueAnother={handleIssueAnother}
        onBack={handleGoBack}
        onCopyCode={handleCopyCode}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Theme.colors.text.primary} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Émettre un certificat</Text>
            <Text style={styles.headerSubtitle}>
              Recherchez un client et émettez un certificat
            </Text>
          </View>
        </View>

        <UserSearchList
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          users={users}
          isLoading={isLoading}
          selectedUserId={selectedUser?._id}
          onSelectUser={handleSelectUser}
        />

        {selectedUser && (
          <IssueFormPanel
            selectedUser={selectedUser}
            customNote={customNote}
            onCustomNoteChange={setCustomNote}
            onIssue={handleIssue}
            isIssuing={isIssuing}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
