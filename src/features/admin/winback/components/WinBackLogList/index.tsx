import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./WinBackLogList.styles";
import type { WinBackLog } from "../../api/winBackApi";

type WinBackLogListProps = {
  logs: WinBackLog[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const RESPONSE_COLORS: Record<string, string> = {
  NONE: "#9CA3AF",
  APP_OPEN: "#3B82F6",
  PAYMENT: "#10B981",
  ORDER_CREATED: "#8B5CF6",
  PROMO_USED: "#F59E0B",
};

const RESPONSE_LABELS: Record<string, string> = {
  NONE: "En attente",
  APP_OPEN: "App ouverte",
  PAYMENT: "Paiement",
  ORDER_CREATED: "Commande",
  PROMO_USED: "Promo utilisé",
};

function LogItem({ log }: { log: WinBackLog }) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);
  const user = log.userId;
  const respColor = RESPONSE_COLORS[log.responseType] || colors.text.disabled;
  const respLabel = RESPONSE_LABELS[log.responseType] || log.responseType;

  return (
    <View style={styles.logItem}>
      <View style={styles.logHeader}>
        <View style={styles.logUser}>
          <View style={[styles.avatar, { backgroundColor: colors.primary.main + "15" }]}>
            <Text style={[styles.avatarText, { color: colors.primary.main }]}>
              {user?.firstName?.[0] || "?"}
            </Text>
          </View>
          <View>
            <Text style={styles.logName}>
              {user?.firstName || "Inconnu"} {user?.lastName || ""}
            </Text>
            <Text style={styles.logPhone}>{user?.phoneNumber || "—"}</Text>
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: respColor + "15" }]}>
          <Text style={[styles.badgeText, { color: respColor }]}>{respLabel}</Text>
        </View>
      </View>

      <View style={styles.logBody}>
        <Text style={styles.logTrigger}>{log.triggerType}</Text>
        <Text style={styles.logChannels}>Canaux: {log.channelsSent?.join(", ") || "—"}</Text>
        {log.promoCodeId?.code && (
          <Text style={styles.logPromo}>Code: {log.promoCodeId.code}</Text>
        )}
      </View>

      <Text style={styles.logDate}>{new Date(log.sentAt).toLocaleString("fr-FR")}</Text>
    </View>
  );
}

export function WinBackLogList({ logs, isLoading, page, totalPages, onNextPage, onPrevPage }: WinBackLogListProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Chargement des logs...</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={logs}
      renderItem={({ item }) => <LogItem log={item} />}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={48} color={colors.text.disabled} />
          <Text style={styles.emptyText}>Aucun log trouvé</Text>
        </View>
      }
      ListFooterComponent={
        totalPages > 1 ? (
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageButton, page <= 1 && styles.pageButtonDisabled]}
              onPress={onPrevPage}
              disabled={page <= 1}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={18} color={page <= 1 ? colors.text.disabled : colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.pageText}>
              Page {page} / {totalPages}
            </Text>
            <TouchableOpacity
              style={[styles.pageButton, page >= totalPages && styles.pageButtonDisabled]}
              onPress={onNextPage}
              disabled={page >= totalPages}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-forward" size={18} color={page >= totalPages ? colors.text.disabled : colors.text.primary} />
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
}
