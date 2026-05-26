import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AnnouncementCard.styles";
import type { Announcement } from "../../types/announcement.types";

const TYPE_CONFIG: Record<string, { color: string; icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"]; label: string }> = {
  INFO: { color: "#3B82F6", icon: "information", label: "Info" },
  WARNING: { color: "#F59E0B", icon: "alert", label: "Alerte" },
  SUCCESS: { color: "#10B981", icon: "check-circle", label: "Succès" },
  URGENT: { color: "#EF4444", icon: "alert-octagon", label: "Urgent" },
  PROMOTION: { color: "#8B5CF6", icon: "tag", label: "Promo" },
  MAINTENANCE: { color: "#6B7280", icon: "wrench", label: "Maintenance" },
};

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Brouillon",
  PUBLISHED: "Publiée",
  ARCHIVED: "Archivée",
};

const PLACEMENT_LABELS: Record<string, string> = {
  TOP_BANNER: "Bannière",
  HOME_CARD: "Accueil",
  MODAL: "Modal",
  INBOX: "Boîte",
};

type AnnouncementCardProps = {
  item: Announcement;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onStats: (id: string) => void;
  isArchiving?: boolean;
};

export function AnnouncementCard({ item, onEdit, onArchive, onStats, isArchiving }: AnnouncementCardProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);
  const typeConfig = TYPE_CONFIG[item.type] || TYPE_CONFIG.INFO;
  const statusLabel = STATUS_LABELS[item.status] || item.status;
  const isPublished = item.status === "PUBLISHED";
  const isArchived = item.status === "ARCHIVED";

  return (
    <View style={[styles.card, isArchived && styles.cardArchived]}>
      <View style={styles.header}>
        <View style={[styles.typeBadge, { backgroundColor: typeConfig.color + "15" }]}>
          <MaterialCommunityIcons name={typeConfig.icon} size={14} color={typeConfig.color} />
          <Text style={[styles.typeText, { color: typeConfig.color }]}>{typeConfig.label}</Text>
        </View>
        <View style={[styles.statusBadge, isPublished && { backgroundColor: colors.status.success + "15" }]}>
          <Text style={[styles.statusText, isPublished && { color: colors.status.success }]}>{statusLabel}</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.message} numberOfLines={2}>{item.message}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="map-marker" size={12} color={colors.text.disabled} />
          <Text style={styles.metaText}>{PLACEMENT_LABELS[item.placement] || item.placement}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="account-group" size={12} color={colors.text.disabled} />
          <Text style={styles.metaText}>{item.audience}</Text>
        </View>
        {item.priority > 0 && (
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="arrow-up" size={12} color={colors.text.disabled} />
            <Text style={styles.metaText}>P{item.priority}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onStats(item._id)} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chart-bar" size={16} color={colors.primary.main} />
          <Text style={[styles.actionText, { color: colors.primary.main }]}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(item._id)} activeOpacity={0.7}>
          <MaterialCommunityIcons name="pencil-outline" size={16} color={colors.text.secondary} />
          <Text style={[styles.actionText, { color: colors.text.secondary }]}>Modifier</Text>
        </TouchableOpacity>
        {!isArchived && (
          <TouchableOpacity
            style={[styles.actionButton, styles.archiveButton]}
            onPress={() => onArchive(item._id)}
            disabled={isArchiving}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="archive-outline" size={16} color={colors.status.error} />
            <Text style={[styles.actionText, { color: colors.status.error }]}>Archiver</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
