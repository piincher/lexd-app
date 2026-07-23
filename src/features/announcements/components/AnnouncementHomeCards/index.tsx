import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { AnnouncementModal } from "../AnnouncementModal";
import { getTone } from "../AnnouncementBanner/styles";
import { useHomeCardAnnouncements } from "../../hooks/useHomeCardAnnouncements";
import { useAnnouncementDetail } from "../../hooks/useAnnouncementDetail";

/**
 * HOME_CARD-placed announcements, rendered inline on the Home screen.
 * Dismissible when configured; tap opens the full detail overlay.
 */
export const AnnouncementHomeCards: React.FC = () => {
  const { colors } = useAppTheme();
  const { cards, dismissCard, markCardRead } = useHomeCardAnnouncements();
  const detail = useAnnouncementDetail(markCardRead);

  if (cards.length === 0) return null;

  return (
    <View style={styles.wrap}>
      {cards.map((announcement) => {
        const tone = getTone(announcement.type);
        const hasMore = !!announcement.ctaLabel || (announcement.blocks?.length ?? 0) > 0;
        return (
          <Pressable
            key={announcement._id}
            onPress={() => detail.open(announcement)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.background.card, borderColor: colors.border, borderLeftColor: tone.color },
              pressed && { opacity: 0.9 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={announcement.title}
          >
            {!!announcement.imageUrl && (
              <Image source={{ uri: announcement.imageUrl }} style={styles.image} resizeMode="cover" />
            )}
            <View style={styles.body}>
              <View style={[styles.iconBox, { backgroundColor: tone.bg }]}>
                <Ionicons name={tone.icon} size={18} color={tone.color} />
              </View>
              <View style={styles.text}>
                <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={2}>
                  {announcement.title}
                </Text>
                <Text style={[styles.message, { color: colors.text.secondary }]} numberOfLines={3}>
                  {announcement.message}
                </Text>
                {hasMore && (
                  <View style={styles.moreRow}>
                    <Text style={[styles.more, { color: tone.color }]}>
                      {announcement.ctaLabel || "En savoir plus"}
                    </Text>
                    <Ionicons name="arrow-forward" size={15} color={tone.color} />
                  </View>
                )}
              </View>
              {announcement.dismissible && (
                <Pressable
                  onPress={() => dismissCard(announcement)}
                  hitSlop={10}
                  style={styles.close}
                  accessibilityRole="button"
                  accessibilityLabel="Masquer l'annonce"
                >
                  <Ionicons name="close" size={18} color={colors.text.secondary} />
                </Pressable>
              )}
            </View>
          </Pressable>
        );
      })}

      <AnnouncementModal
        announcement={detail.selected}
        visible={!!detail.selected}
        onClose={detail.close}
        onAcknowledge={detail.close}
        onAction={detail.action}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { gap: 12, marginHorizontal: 16, marginTop: 12 },
  card: { borderWidth: 1, borderLeftWidth: 4, borderRadius: 16, overflow: "hidden" },
  image: { width: "100%", height: 130, backgroundColor: "#e5e7eb" },
  body: { flexDirection: "row", alignItems: "flex-start", gap: 12, padding: 14 },
  iconBox: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  text: { flex: 1, minWidth: 0, gap: 4 },
  title: { fontSize: 15, fontWeight: "800", lineHeight: 20 },
  message: { fontSize: 13, lineHeight: 18 },
  moreRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
  more: { fontSize: 13, fontWeight: "700" },
  close: { padding: 2 },
});

export default AnnouncementHomeCards;
