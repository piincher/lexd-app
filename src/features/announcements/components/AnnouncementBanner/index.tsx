import React from "react";
import { Pressable, Text, View, type GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { Announcement } from "../../types";
import { createStyles, getTone } from "./styles";

interface AnnouncementBannerProps {
  announcement: Announcement;
  onPress: () => void;
  onDismiss: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  announcement,
  onPress,
  onDismiss,
}) => {
  const { colors } = useAppTheme();
  const tone = getTone(announcement.type);
  const styles = createStyles(colors, tone);

  const handleDismiss = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onDismiss();
  };

  return (
    <View style={styles.shell} pointerEvents="box-none">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={announcement.title}
        accessibilityHint="Ouvre les détails de l'annonce"
        onPress={onPress}
        style={({ pressed }) => [styles.banner, pressed && styles.pressed]}
      >
        <Ionicons name={tone.icon} size={18} color={tone.color} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{announcement.title}</Text>
          <Text style={styles.message} numberOfLines={2}>{announcement.message}</Text>
        </View>
        {announcement.dismissible && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Masquer l'annonce"
            onPress={handleDismiss}
            hitSlop={8}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={18} color={colors.text.secondary} />
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};
