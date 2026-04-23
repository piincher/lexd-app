import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

import { Fonts } from "@src/constants/Fonts";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import {
  useAdminCampaigns,
  useCancelCampaign,
  useSendCampaignNow,
} from "../hooks/useCampaigns";
import type { CampaignRecord, CampaignStatus } from "../api/campaignApi";

// ── Helpers ───────────────────────────────────────────────────────────────

const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
};

const getStatusStyle = (status: CampaignStatus, isDark: boolean) => {
  switch (status) {
    case "scheduled":
      return { bg: isDark ? "#1E3A8A" : "#DBEAFE", text: isDark ? "#93C5FD" : "#1D4ED8" };
    case "sending":
      return { bg: isDark ? "#78350F" : "#FEF3C7", text: isDark ? "#FCD34D" : "#D97706" };
    case "sent":
      return { bg: isDark ? "#14532D" : "#DCFCE7", text: isDark ? "#86EFAC" : "#15803D" };
    case "cancelled":
      return { bg: isDark ? "#7F1D1D" : "#FEE2E2", text: isDark ? "#FCA5A5" : "#DC2626" };
    default:
      return { bg: isDark ? "#374151" : "#F3F4F6", text: isDark ? "#D1D5DB" : "#6B7280" };
  }
};

const getStatusLabel = (status: CampaignStatus): string => {
  switch (status) {
    case "draft":
      return "Brouillon";
    case "scheduled":
      return "Planifié";
    case "sending":
      return "En cours";
    case "sent":
      return "Envoyé";
    case "cancelled":
      return "Annulé";
    default:
      return status;
  }
};

const getSegmentLabel = (segment: string): string => {
  switch (segment) {
    case "all":
      return "Tous les clients";
    case "active_customers":
      return "Clients actifs";
    case "inactive_customers":
      return "Clients inactifs";
    case "container_customers":
      return "Clients d'un conteneur";
    default:
      return segment;
  }
};

// ── Filter Chips ──────────────────────────────────────────────────────────

type FilterKey = "all" | CampaignStatus;

const FILTERS: { label: string; key: FilterKey; value?: CampaignStatus }[] = [
  { label: "Tous", key: "all" },
  { label: "Brouillon", key: "draft", value: "draft" },
  { label: "Planifié", key: "scheduled", value: "scheduled" },
  { label: "Envoyé", key: "sent", value: "sent" },
  { label: "Annulé", key: "cancelled", value: "cancelled" },
];

// ── Campaign Card ─────────────────────────────────────────────────────────

interface CampaignCardProps {
  campaign: CampaignRecord;
  onCancel: (id: string) => void;
  onSendNow: (id: string) => void;
  isSending: boolean;
  styles: ReturnType<typeof createStyles>;
}

const CampaignCard = ({
  campaign,
  onCancel,
  onSendNow,
  isSending,
  styles,
}: CampaignCardProps) => {
  const { colors, isDark } = useAppTheme();
  const statusStyle = getStatusStyle(campaign.status, isDark);
  const canAct = campaign.status === "draft" || campaign.status === "scheduled";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {campaign.title}
        </Text>
        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>
            {getStatusLabel(campaign.status)}
          </Text>
        </View>
      </View>

      <Text style={styles.cardBody} numberOfLines={2}>
        {campaign.body}
      </Text>

      <View style={styles.cardMeta}>
        <View style={styles.metaRow}>
          <Ionicons name="people-outline" size={13} color={colors.text.secondary} />
          <Text style={[styles.metaText, { color: colors.text.secondary }]}>
            {getSegmentLabel(campaign.targetSegment)}
          </Text>
        </View>
        {campaign.targetSegment === "container_customers" && campaign.containerId && (
          <View style={styles.metaRow}>
            <Ionicons name="cube-outline" size={13} color={colors.text.secondary} />
            <Text style={[styles.metaText, { color: colors.text.secondary }]}>Conteneur: {campaign.containerId.slice(-6)}</Text>
          </View>
        )}
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={13} color={colors.text.secondary} />
          <Text style={[styles.metaText, { color: colors.text.secondary }]}>{formatDate(campaign.scheduledAt)}</Text>
        </View>
      </View>

      {campaign.status === "sent" && (
        <View style={styles.statsRow}>
          <Text style={styles.statText}>
            <Text style={{ color: isDark ? "#86EFAC" : "#15803D" }}>{campaign.sentCount} envoyés</Text>
            {campaign.failedCount > 0 && (
              <Text style={{ color: isDark ? "#FCA5A5" : "#DC2626" }}>
                {" · "}
                {campaign.failedCount} échoués
              </Text>
            )}
          </Text>
        </View>
      )}

      {canAct && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => onSendNow(campaign._id)}
            disabled={isSending}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="send-outline" size={14} color="#fff" />
                <Text style={styles.sendBtnText}>Envoyer maintenant</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => onCancel(campaign._id)}
          >
            <Text style={styles.cancelBtnText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// ── Screen ────────────────────────────────────────────────────────────────

const CampaignListScreen = ({
  navigation,
}: RootStackScreenProps<"CampaignList">) => {
  const { colors, isDark } = useAppTheme();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [sendingId, setSendingId] = useState<string | null>(null);

  const statusFilter =
    activeFilter === "all"
      ? undefined
      : (activeFilter as CampaignStatus);

  const { data, isLoading, refetch } = useAdminCampaigns(
    statusFilter ? { status: statusFilter } : undefined
  );

  const { mutate: cancel } = useCancelCampaign();
  const { mutate: sendNow } = useSendCampaignNow();

  const handleCancel = (id: string) => {
    Alert.alert(
      "Annuler la campagne",
      "Êtes-vous sûr de vouloir annuler cette campagne ?",
      [
        { text: "Non", style: "cancel" },
        {
          text: "Oui, annuler",
          style: "destructive",
          onPress: () =>
            cancel(id, {
              onSuccess: () =>
                showMessage({ message: "Campagne annulée", type: "success" }),
              onError: (err) =>
                showMessage({ message: err.message, type: "danger" }),
            }),
        },
      ]
    );
  };

  const handleSendNow = (id: string) => {
    Alert.alert(
      "Envoyer maintenant",
      "Cette campagne sera envoyée immédiatement à tous les destinataires ciblés.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Envoyer",
          onPress: () => {
            setSendingId(id);
            sendNow(id, {
              onSuccess: (result) => {
                showMessage({
                  message: `Envoyé à ${result.sentCount} utilisateurs`,
                  type: "success",
                });
                setSendingId(null);
              },
              onError: (err) => {
                showMessage({ message: err.message, type: "danger" });
                setSendingId(null);
              },
            });
          },
        },
      ]
    );
  };

  const campaigns = data?.campaigns ?? [];

  const dynamicStyles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle}>Campagnes Push</Text>
        <TouchableOpacity
          style={dynamicStyles.addBtn}
          onPress={() => navigation.navigate("CreateCampaign")}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <View style={dynamicStyles.filtersRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[
              dynamicStyles.chip,
              activeFilter === f.key && dynamicStyles.chipActive,
            ]}
            onPress={() => setActiveFilter(f.key)}
          >
            <Text
              style={[
                dynamicStyles.chipText,
                activeFilter === f.key && dynamicStyles.chipTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary.main} />
      ) : campaigns.length === 0 ? (
        <View style={dynamicStyles.empty}>
          <Ionicons name="megaphone-outline" size={48} color={colors.text.disabled} />
          <Text style={dynamicStyles.emptyText}>Aucune campagne</Text>
          <TouchableOpacity
            style={dynamicStyles.emptyBtn}
            onPress={() => navigation.navigate("CreateCampaign")}
          >
            <Text style={dynamicStyles.emptyBtnText}>Créer une campagne</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlashList
          data={campaigns}
          keyExtractor={(item) => item._id}

          contentContainerStyle={{ padding: 16 }}
          onRefresh={refetch}
          refreshing={isLoading}
          renderItem={({ item }) => (
            <CampaignCard
              campaign={item}
              onCancel={handleCancel}
              onSendNow={handleSendNow}
              isSending={sendingId === item._id}
              styles={dynamicStyles}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default CampaignListScreen;

// ── Styles ────────────────────────────────────────────────────────────────

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },

    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      flex: 1,
      marginLeft: 12,
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },
    addBtn: {
      backgroundColor: "#8B5CF6",
      borderRadius: 8,
      padding: 6,
    },

    filtersRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: isDark ? colors.background.paper : "#F3F4F6",
    },
    chipActive: { backgroundColor: isDark ? "#4C1D95" : "#EDE9FE" },
    chipText: { fontFamily: Fonts.medium, fontSize: 13, color: colors.text.secondary },
    chipTextActive: { color: isDark ? "#C4B5FD" : "#7C3AED" },

    card: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    cardTitle: {
      flex: 1,
      fontFamily: Fonts.bold,
      fontSize: 15,
      color: colors.text.primary,
      marginRight: 8,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
    },
    badgeText: { fontFamily: Fonts.medium, fontSize: 12 },

    cardBody: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      marginBottom: 10,
      lineHeight: 18,
    },

    cardMeta: { gap: 4, marginBottom: 8 },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    metaText: { fontFamily: Fonts.regular, fontSize: 12, color: colors.text.secondary },

    statsRow: { marginBottom: 8 },
    statText: { fontFamily: Fonts.medium, fontSize: 13 },

    actions: { flexDirection: "row", gap: 8, marginTop: 4 },
    sendBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      backgroundColor: "#8B5CF6",
      borderRadius: 8,
      paddingVertical: 10,
    },
    sendBtnText: { fontFamily: Fonts.medium, fontSize: 13, color: "#fff" },
    cancelBtn: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelBtnText: { fontFamily: Fonts.medium, fontSize: 13, color: colors.text.secondary },

    empty: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    emptyText: { fontFamily: Fonts.medium, fontSize: 15, color: colors.text.disabled },
    emptyBtn: {
      backgroundColor: "#8B5CF6",
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    emptyBtnText: { fontFamily: Fonts.medium, fontSize: 14, color: "#fff" },
  });
