import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import * as Clipboard from "expo-clipboard";
import { showMessage } from "react-native-flash-message";
import {
  useSearchUsersForCertificate,
  useIssueCertificate,
  useSendCertificateToClient,
  useDownloadCertificate,
} from "../hooks/useCertificateAdmin";
import { CertificateUser, CertificateRecord } from "../api";
import { RootStackScreenProps } from "@src/navigations/type";

type UserCardProps = {
  user: CertificateUser;
  isSelected: boolean;
  onSelect: (user: CertificateUser) => void;
};

const UserCard = ({ user, isSelected, onSelect }: UserCardProps) => (
  <TouchableOpacity
    style={[styles.userCard, isSelected && styles.userCardSelected]}
    onPress={() => onSelect(user)}
    activeOpacity={0.7}
  >
    <View style={styles.userInfo}>
      <View style={styles.nameRow}>
        <Text style={styles.userName}>
          {user.firstName} {user.lastName}
        </Text>
        {user.hasCertificate && (
          <View style={styles.certBadge}>
            <Text style={styles.certBadgeText}>
              {user.certificateType === "AUTO" ? "AUTO" : "MANUAL"}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.userPhone}>{user.phoneNumber}</Text>
      <Text style={styles.userCBM}>
        {user.totalDeliveredCBM} CBM livrés
      </Text>
    </View>
    <View style={styles.selectIndicator}>
      <Ionicons
        name={isSelected ? "checkmark-circle" : "ellipse-outline"}
        size={24}
        color={isSelected ? "#d4a843" : "#D1D5DB"}
      />
    </View>
  </TouchableOpacity>
);

export default function IssueCertificateScreen({
  navigation,
}: RootStackScreenProps<"IssueCertificate">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<CertificateUser | null>(null);
  const [customNote, setCustomNote] = useState("");
  const [issuedCertificate, setIssuedCertificate] = useState<CertificateRecord | null>(null);

  const { data, isLoading } = useSearchUsersForCertificate(searchQuery);
  const { mutate: issueCert, isPending: isIssuing } = useIssueCertificate();
  const { mutate: sendToClient, isPending: isSending } = useSendCertificateToClient();
  const { download, isDownloading } = useDownloadCertificate();

  const users = data?.users ?? [];

  const handleSelectUser = useCallback((user: CertificateUser) => {
    if (user.hasCertificate) {
      Alert.alert(
        "Certificat existant",
        `${user.firstName} ${user.lastName} a déjà un certificat actif.`
      );
      return;
    }
    setSelectedUser((prev) => (prev?._id === user._id ? null : user));
  }, []);

  const handleIssue = () => {
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
              {
                userId: selectedUser._id,
                customNote: customNote.trim() || undefined,
              },
              {
                onSuccess: (certificate) => {
                  setIssuedCertificate(certificate);
                },
                onError: (error) => {
                  Alert.alert("Erreur", error.message || "Impossible d'émettre le certificat.");
                },
              }
            );
          },
        },
      ]
    );
  };

  const handleSendWhatsApp = useCallback(() => {
    if (!issuedCertificate) return;
    sendToClient(issuedCertificate._id, {
      onSuccess: () => {
        Alert.alert("Envoyé", "Le certificat a été envoyé au client via WhatsApp.");
      },
      onError: (error) => {
        Alert.alert("Erreur", error.message || "Impossible d'envoyer le certificat.");
      },
    });
  }, [issuedCertificate, sendToClient]);

  const handleDownload = useCallback(() => {
    if (issuedCertificate?._id) {
      download(issuedCertificate._id);
    }
  }, [issuedCertificate, download]);

  const handleIssueAnother = useCallback(() => {
    setIssuedCertificate(null);
    setSelectedUser(null);
    setCustomNote("");
    setSearchQuery("");
  }, []);

  const handleCopyCode = useCallback(async (code: string, label: string) => {
    await Clipboard.setStringAsync(code);
    showMessage({
      message: `${label} copié !`,
      description: `Le ${label.toLowerCase()} ${code} a été copié dans le presse-papiers.`,
      type: "success",
      duration: 2000,
    });
  }, []);

  const renderUser = ({ item }: { item: CertificateUser }) => (
    <UserCard
      user={item}
      isSelected={selectedUser?._id === item._id}
      onSelect={handleSelectUser}
    />
  );

  if (issuedCertificate) {
    const clientName =
      typeof issuedCertificate.userId === "object" && issuedCertificate.userId?.firstName
        ? `${issuedCertificate.userId.firstName} ${issuedCertificate.userId.lastName}`
        : selectedUser
          ? `${selectedUser.firstName} ${selectedUser.lastName}`
          : "";

    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView
          contentContainerStyle={styles.successContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Checkmark icon */}
          <View style={styles.successIconWrapper}>
            <MaterialIcons name="check-circle" size={80} color="#22C55E" />
          </View>

          <Text style={styles.successTitle}>Certificat émis avec succès</Text>

          {/* Certificate details card */}
          <View style={styles.successCard}>
            <View style={styles.successCardRow}>
              <Text style={styles.successCardLabel}>N° Certificat</Text>
              <View style={styles.valueWithCopy}>
                <Text style={styles.successCardValue}>{issuedCertificate.certificateId}</Text>
                <TouchableOpacity 
                  onPress={() => handleCopyCode(issuedCertificate.certificateId, "Code")}
                  style={styles.copyButton}
                >
                  <Ionicons name="copy-outline" size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.successCardDivider} />
            <View style={styles.successCardRow}>
              <Text style={styles.successCardLabel}>Client</Text>
              <Text style={styles.successCardValue}>{clientName}</Text>
            </View>
            <View style={styles.successCardDivider} />
            <View style={styles.successCardRow}>
              <Text style={styles.successCardLabel}>Code de vérification</Text>
              <View style={styles.valueWithCopy}>
                <Text style={[styles.successCardValue, styles.verificationCode]}>
                  {issuedCertificate.verificationCode}
                </Text>
                <TouchableOpacity 
                  onPress={() => handleCopyCode(issuedCertificate.verificationCode, "Code de vérification")}
                  style={styles.copyButton}
                >
                  <Ionicons name="copy-outline" size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Download or generating text */}
          {issuedCertificate.certificateUrl ? (
            <TouchableOpacity
              style={[styles.downloadButton, isDownloading && styles.issueButtonDisabled]}
              onPress={handleDownload}
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
              <ActivityIndicator size="small" color="#9CA3AF" />
              <Text style={styles.generatingText}>PDF en cours de génération...</Text>
            </View>
          )}

          {/* WhatsApp send button */}
          <TouchableOpacity
            style={[styles.whatsappButton, isSending && styles.issueButtonDisabled]}
            onPress={handleSendWhatsApp}
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

          {/* Issue another */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleIssueAnother}
            activeOpacity={0.7}
          >
            <MaterialIcons name="add-circle-outline" size={20} color="#d4a843" />
            <Text style={styles.secondaryButtonText}>Émettre un autre</Text>
          </TouchableOpacity>

          {/* Go back */}
          <TouchableOpacity
            style={styles.backTextButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backTextButtonText}>Retour</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Émettre un certificat</Text>
            <Text style={styles.headerSubtitle}>
              Recherchez un client et émettez un certificat
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher par nom ou téléphone..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* User List */}
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#d4a843" />
              <Text style={styles.loadingText}>Recherche...</Text>
            </View>
          ) : (
            <FlashList
              data={users}
              renderItem={renderUser}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}

              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <MaterialIcons name="person-search" size={48} color="#D1D5DB" />
                  <Text style={styles.emptyText}>
                    {searchQuery.length < 2
                      ? "Tapez au moins 2 caractères pour rechercher"
                      : "Aucun client trouvé"}
                  </Text>
                </View>
              }
            />
          )}
        </View>

        {/* Bottom Panel - shows when user is selected */}
        {selectedUser && (
          <View style={styles.bottomPanel}>
            <View style={styles.selectedInfo}>
              <MaterialIcons name="verified" size={20} color="#d4a843" />
              <Text style={styles.selectedName}>
                {selectedUser.firstName} {selectedUser.lastName}
              </Text>
            </View>

            <TextInput
              style={styles.noteInput}
              placeholder="Note personnalisée (optionnel)"
              placeholderTextColor="#9CA3AF"
              value={customNote}
              onChangeText={setCustomNote}
              maxLength={500}
              multiline
              numberOfLines={2}
            />

            <TouchableOpacity
              style={[styles.issueButton, isIssuing && styles.issueButtonDisabled]}
              onPress={handleIssue}
              disabled={isIssuing}
              activeOpacity={0.7}
            >
              {isIssuing ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <MaterialIcons name="card-membership" size={20} color="#FFF" />
                  <Text style={styles.issueButtonText}>Émettre le certificat</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 16 : 8,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  userCardSelected: {
    borderColor: "#d4a843",
    backgroundColor: "#FFFBF0",
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  certBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  certBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D97706",
  },
  userPhone: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  userCBM: {
    fontSize: 13,
    color: "#d4a843",
    fontWeight: "600",
  },
  selectIndicator: {
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#6B7280",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
  },
  bottomPanel: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    padding: 16,
    gap: 12,
  },
  selectedInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  noteInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1F2937",
    minHeight: 48,
    textAlignVertical: "top",
  },
  issueButton: {
    backgroundColor: "#d4a843",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  issueButtonDisabled: {
    opacity: 0.6,
  },
  issueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  // Success view styles
  successContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  successIconWrapper: {
    marginBottom: 16,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 24,
    textAlign: "center",
  },
  successCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#d4a843",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  successCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  successCardLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  successCardValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  successCardDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },
  verificationCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#d4a843",
    letterSpacing: 1,
  },
  valueWithCopy: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  copyButton: {
    padding: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    backgroundColor: "#FFFBF0",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "#d4a843",
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d4a843",
  },
  generatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    paddingVertical: 14,
    marginBottom: 12,
  },
  generatingText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    backgroundColor: "#25D366",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  whatsappButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "#d4a843",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d4a843",
  },
  backTextButton: {
    paddingVertical: 12,
  },
  backTextButtonText: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
});
