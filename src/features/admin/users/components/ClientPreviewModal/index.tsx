import React from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { SlideInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getInitials, getAvatarColor } from "../../lib/clientUtils";
import { userData } from "@src/shared/types/user";
import { PreviewActions } from "./PreviewActions";
import { styles } from "./ClientPreviewModal.styles";

interface ClientPreviewModalProps {
  client: userData | null;
  visible: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export const ClientPreviewModal: React.FC<ClientPreviewModalProps> = ({ client, visible, onClose, onNavigate }) => {
  const { colors } = useAppTheme();
  if (!client) return null;

  const avatarColors = getAvatarColor(`${client.firstName} ${client.lastName}`);
  const initials = getInitials(client.firstName, client.lastName);
  const isBlocked = client.blocked?.isBlocked ?? false;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={[styles.overlay, { backgroundColor: colors.background.overlay }]} onPress={onClose}>
        <Animated.View entering={SlideInUp.springify().damping(15)} style={[styles.sheet, { backgroundColor: colors.background.card }]}>
          <View style={[styles.handle, { backgroundColor: colors.neutral[300] }]} />

          <View style={styles.header}>
            <LinearGradient colors={avatarColors} style={styles.avatar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.avatarText}>{initials}</Text>
            </LinearGradient>
            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.text.primary }]}>{client.firstName} {client.lastName}</Text>
              <Text style={[styles.phone, { color: colors.text.secondary }]}>{client.phoneNumber || "N/A"}</Text>
              {isBlocked && (
                <View style={[styles.badge, { backgroundColor: colors.feedback.errorBg }]}>
                  <Ionicons name="ban" size={10} color={colors.status.error} />
                  <Text style={[styles.badgeText, { color: colors.status.error }]}>Bloqué</Text>
                </View>
              )}
            </View>
          </View>

          <PreviewActions phone={client.phoneNumber} email={client.email} />

          <TouchableOpacity
            onPress={() => { onClose(); onNavigate(client._id); }}
            style={[styles.viewBtn, { backgroundColor: colors.primary.main }]}
            accessibilityRole="button"
          >
            <Text style={[styles.viewBtnText, { color: colors.text.inverse }]}>Voir le profil complet</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.text.inverse} />
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
