import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@src/shared/ui/Button";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { Announcement } from "../../types";
import { createStyles, getTone } from "./styles";

interface AnnouncementModalProps {
  announcement: Announcement | null;
  visible: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
  onAction: () => void;
  isAcknowledging?: boolean;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  announcement,
  visible,
  onClose,
  onAcknowledge,
  onAction,
  isAcknowledging = false,
}) => {
  const { colors } = useAppTheme();
  const tone = getTone(announcement?.type || "INFO");
  const styles = createStyles(colors, tone);

  if (!announcement) return null;

  const primaryLabel = announcement.requiresAcknowledgement ? "J'ai compris" : "Fermer";

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {announcement.dismissible && !announcement.requiresAcknowledgement && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fermer"
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={20} color={colors.text.secondary} />
            </Pressable>
          )}
          <View style={styles.iconCircle}>
            <Ionicons name={tone.icon} size={30} color={tone.color} />
          </View>
          <Text style={styles.title}>{announcement.title}</Text>
          <Text style={styles.message}>{announcement.message}</Text>
          {announcement.ctaLabel && (
            <Button title={announcement.ctaLabel} variant="outline" onPress={onAction} fullWidth />
          )}
          <Button
            title={primaryLabel}
            onPress={announcement.requiresAcknowledgement ? onAcknowledge : onClose}
            loading={isAcknowledging}
            fullWidth
          />
        </View>
      </View>
    </Modal>
  );
};
