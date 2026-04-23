import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import * as Clipboard from "expo-clipboard";
import { useListCertificates, useDownloadCertificate } from "../hooks/useCertificateAdmin";
import { CertificateRecord } from "../api";
import type { RootStackScreenProps } from "@src/navigations/type";
import { Fonts } from "@src/constants/Fonts";
import { showMessage } from "react-native-flash-message";
import { Theme } from "@src/constants/Theme";

type FilterChip = {
  label: string;
  key: string;
  filterType: "all" | "type" | "status";
  value?: string;
};

const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all", filterType: "all" },
  { label: "Auto", key: "auto", filterType: "type", value: "AUTO" },
  { label: "Manuel", key: "manual", filterType: "type", value: "MANUAL" },
  { label: "Actif", key: "active", filterType: "status", value: "ACTIVE" },
  { label: "Révoqué", key: "revoked", filterType: "status", value: "REVOKED" },
];

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

type CertificateCardProps = {
  certificate: CertificateRecord;
  onDownload: (certificateId: string) => void;
  isDownloading: boolean;
  onPress: () => void;
};

const CertificateCard = ({ certificate, onDownload, isDownloading, onPress }: CertificateCardProps) => {
  const isAuto = certificate.type === "AUTO";
  const isActive = certificate.status === "ACTIVE";

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(certificate.certificateId);
    showMessage({
      message: "Code copié !",
      description: `Le code ${certificate.certificateId} a été copié dans le presse-papiers.`,
      type: "success",
      duration: 2000,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Header row: Certificate ID + Copy + Badges */}
      <View style={styles.cardHeader}>
        <View style={styles.certificateIdContainer}>
          <Text style={styles.certificateId}>{certificate.certificateId}</Text>
          <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={18} color={Theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, isAuto ? styles.badgeAuto : styles.badgeManual]}>
            <Text style={[styles.badgeText, isAuto ? styles.badgeAutoText : styles.badgeManualText]}>
              {certificate.type}
            </Text>
          </View>
          <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeRevoked]}>
            <Text
              style={[styles.badgeText, isActive ? styles.badgeActiveText : styles.badgeRevokedText]}
            >
              {isActive ? "ACTIF" : "RÉVOQUÉ"}
            </Text>
          </View>
        </View>
      </View>

      {/* Client info */}
      <View style={styles.cardRow}>
        <Ionicons name="person-outline" size={16} color={Theme.colors.text.secondary} />
        <Text style={styles.cardRowText}>
          {certificate.userId.firstName} {certificate.userId.lastName}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <Ionicons name="call-outline" size={16} color={Theme.colors.text.secondary} />
        <Text style={styles.cardRowText}>{certificate.userId.phoneNumber}</Text>
      </View>

      {/* CBM at issuance */}
      <View style={styles.cardRow}>
        <MaterialIcons name="inventory" size={16} color={Theme.colors.text.secondary} />
        <Text style={styles.cardRowText}>
          {certificate.totalCBMAtIssuance.toFixed(2)} CBM (seuil : {certificate.thresholdCBM} CBM)
        </Text>
      </View>

      {/* Issue date */}
      <View style={styles.cardRow}>
        <Ionicons name="calendar-outline" size={16} color={Theme.colors.text.secondary} />
        <Text style={styles.cardRowText}>{formatDate(certificate.issuedAt)}</Text>
      </View>

      {/* Issued by (MANUAL only) */}
      {certificate.type === "MANUAL" && certificate.issuedBy && (
        <View style={styles.cardRow}>
          <Ionicons name="shield-checkmark-outline" size={16} color={Theme.colors.text.secondary} />
          <Text style={styles.cardRowText}>
            Émis par {certificate.issuedBy.firstName} {certificate.issuedBy.lastName}
          </Text>
        </View>
      )}

      {/* Custom note */}
      {certificate.customNote ? (
        <View style={styles.noteContainer}>
          <Ionicons name="document-text-outline" size={14} color="#92400E" />
          <Text style={styles.noteText}>{certificate.customNote}</Text>
        </View>
      ) : null}

      {/* Download button */}
      {certificate.certificateUrl ? (
        <TouchableOpacity
          style={[styles.downloadButton, isDownloading && styles.downloadButtonDisabled]}
          onPress={() => onDownload(certificate._id)}
          activeOpacity={0.7}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Ionicons name="download-outline" size={18} color="#FFFFFF" />
          )}
          <Text style={styles.downloadButtonText}>Télécharger</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default function CertificateHistoryScreen({
  navigation,
}: RootStackScreenProps<"CertificateHistory">) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const selectedChip = FILTER_CHIPS.find((c) => c.key === activeFilter)!;

  const queryParams = useMemo(() => {
    const params: { status?: string; type?: string; page?: number } = { page };
    if (selectedChip.filterType === "type") {
      params.type = selectedChip.value;
    } else if (selectedChip.filterType === "status") {
      params.status = selectedChip.value;
    }
    return params;
  }, [activeFilter, page, selectedChip]);

  const { data, isLoading, isRefetching, refetch } = useListCertificates(queryParams);
  const { download, isDownloading } = useDownloadCertificate();

  const certificates = data?.certificates ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: 20, total: 0, totalPages: 1 };

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
    setPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (page < pagination.totalPages) {
      setPage((p) => p + 1);
    }
  }, [page, pagination.totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  const renderCertificate = useCallback(
    ({ item }: { item: CertificateRecord }) => (
      <CertificateCard
        certificate={item}
        onDownload={download}
        isDownloading={isDownloading}
        onPress={() => navigation.navigate("CertificateDetailAdmin", { certificate: item as any })}
      />
    ),
    [download, isDownloading, navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={Theme.colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Certificats émis</Text>
            <Text style={styles.headerSubtitle}>
              {pagination.total} certificat{pagination.total !== 1 ? "s" : ""} au total
            </Text>
          </View>
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip.key;
            return (
              <TouchableOpacity
                key={chip.key}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => handleFilterChange(chip.key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Loading state */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d4a843" />
          <Text style={styles.loadingText}>Chargement des certificats...</Text>
        </View>
      ) : (
        <>
          {/* Certificate list */}
          <FlashList
            data={certificates}
            renderItem={renderCertificate}
            keyExtractor={(item) => item._id}

            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshing={isRefetching}
            onRefresh={refetch}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialIcons name="verified" size={64} color={Theme.neutral[300]} />
                <Text style={styles.emptyTitle}>Aucun certificat trouvé</Text>
                <Text style={styles.emptySubtitle}>
                  {activeFilter !== "all"
                    ? "Essayez de modifier vos filtres"
                    : "Les certificats apparaîtront ici une fois émis"}
                </Text>
                {activeFilter !== "all" && (
                  <TouchableOpacity
                    style={styles.resetFilterButton}
                    onPress={() => handleFilterChange("all")}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.resetFilterText}>Réinitialiser les filtres</Text>
                  </TouchableOpacity>
                )}
              </View>
            }
            ListFooterComponent={
              pagination.totalPages > 1 ? (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[styles.paginationButton, page <= 1 && styles.paginationButtonDisabled]}
                    onPress={handlePrevPage}
                    disabled={page <= 1}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={20}
                      color={page <= 1 ? "#D1D5DB" : "#1F2937"}
                    />
                  </TouchableOpacity>
                  <Text style={styles.paginationText}>
                    Page {pagination.page} / {pagination.totalPages}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      page >= pagination.totalPages && styles.paginationButtonDisabled,
                    ]}
                    onPress={handleNextPage}
                    disabled={page >= pagination.totalPages}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={page >= pagination.totalPages ? "#D1D5DB" : "#1F2937"}
                    />
                  </TouchableOpacity>
                </View>
              ) : null
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },

  /* Header */
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 12 : 20,
    paddingBottom: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Theme.colors.neutral[100],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
  },

  /* Filter chips */
  filterContainer: {
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
    paddingVertical: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.colors.neutral[100],
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  filterChipActive: {
    backgroundColor: "#d4a843",
    borderColor: "#d4a843",
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
  },

  /* Loading */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
  },

  /* List */
  listContainer: {
    padding: 16,
  },

  /* Card */
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  certificateIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  certificateId: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
    marginRight: 8,
  },
  copyButton: {
    padding: 4,
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: 6,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    textTransform: "uppercase",
  },
  badgeAuto: {
    backgroundColor: "#DBEAFE",
  },
  badgeAutoText: {
    color: "#1D4ED8",
  },
  badgeManual: {
    backgroundColor: "#FEF3C7",
  },
  badgeManualText: {
    color: "#92400E",
  },
  badgeActive: {
    backgroundColor: "#DCFCE7",
  },
  badgeActiveText: {
    color: "#15803D",
  },
  badgeRevoked: {
    backgroundColor: "#FEE2E2",
  },
  badgeRevokedText: {
    color: "#DC2626",
  },

  /* Card rows */
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  cardRowText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
    flex: 1,
  },

  /* Note */
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFBEB",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    gap: 8,
  },
  noteText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: "#92400E",
    flex: 1,
    lineHeight: 18,
  },

  /* Download button */
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d4a843",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 6,
  },
  downloadButtonDisabled: {
    opacity: 0.6,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#FFFFFF",
  },

  /* Empty state */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.secondary,
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.disabled,
    textAlign: "center",
    lineHeight: 20,
  },
  resetFilterButton: {
    marginTop: 16,
    backgroundColor: Theme.colors.neutral[100],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetFilterText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
  },

  /* Pagination */
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Theme.colors.background.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  paginationButtonDisabled: {
    opacity: 0.4,
  },
  paginationText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
  },
});
