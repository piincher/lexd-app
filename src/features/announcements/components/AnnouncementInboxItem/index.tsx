import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { Announcement } from "../../types";
import { getTone } from "../AnnouncementBanner/styles";

interface Props {
  announcement: Announcement;
  onPress: (announcement: Announcement) => void;
}

const relativeTime = (iso?: string | null): string => {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(diff) || diff < 0) return "";
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days} j`;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
};

export const AnnouncementInboxItem: React.FC<Props> = ({ announcement, onPress }) => {
  const { colors } = useAppTheme();
  const tone = getTone(announcement.type);
  const unread = !announcement.viewerState?.readAt;
  const date = announcement.startAt || announcement.viewerState?.readAt;

  return (
    <Pressable
      onPress={() => onPress(announcement)}
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: colors.border },
        unread && { backgroundColor: tone.color + "0D" },
        pressed && { opacity: 0.7 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={announcement.title}
    >
      {announcement.imageUrl ? (
        <Image source={{ uri: announcement.imageUrl }} style={styles.thumb} resizeMode="cover" />
      ) : (
        <View style={[styles.icon, { backgroundColor: tone.bg }]}>
          <Ionicons name={tone.icon} size={20} color={tone.color} />
        </View>
      )}

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, { color: colors.text.primary }, unread && styles.titleUnread]}
            numberOfLines={1}
          >
            {announcement.title}
          </Text>
          {!!date && <Text style={[styles.time, { color: colors.text.secondary }]}>{relativeTime(date)}</Text>}
        </View>
        <Text style={[styles.message, { color: colors.text.secondary }]} numberOfLines={2}>
          {announcement.message}
        </Text>
      </View>

      {unread && <View style={[styles.dot, { backgroundColor: tone.color }]} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  thumb: { width: 46, height: 46, borderRadius: 10, backgroundColor: "#e5e7eb" },
  icon: { width: 46, height: 46, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  body: { flex: 1, minWidth: 0, gap: 3 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { flex: 1, fontSize: 15, fontWeight: "600" },
  titleUnread: { fontWeight: "800" },
  time: { fontSize: 11.5, fontWeight: "600" },
  message: { fontSize: 13, lineHeight: 18 },
  dot: { width: 9, height: 9, borderRadius: 5 },
});
