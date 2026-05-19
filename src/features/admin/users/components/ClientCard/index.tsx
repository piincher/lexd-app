import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { userData } from "@src/shared/types/user";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getInitials, getAvatarColor } from "../../lib/clientUtils";
import { useClientCardActions } from "../../hooks/useClientCardActions";
import { useClientBadges } from "../../hooks/useClientBadges";
import { callPhone, openWhatsApp, sendEmail } from "../../lib/contactActions";
import { ClientBadge } from "../ClientBadge";
import { HighlightText } from "../HighlightText";
import { createStyles } from "./ClientCard.styles";
import { ClientCardSkeleton } from "./ClientCardSkeleton";

interface ClientCardProps {
  client: userData;
  onToggleBlock: (clientId: string) => void;
  onDelete: (clientId: string) => void;
  onNavigate: (clientId: string) => void;
  onSelect?: (clientId: string) => void;
  onPreview?: (client: userData) => void;
  index: number;
  isLoading?: boolean;
  isSelected?: boolean;
  selectionMode?: boolean;
  searchQuery?: string;
  orderCount?: number;
  lastOrderDate?: string | null;
}

export const ClientCard: React.FC<ClientCardProps> = React.memo(({
  client, onToggleBlock, onDelete, onNavigate, onSelect, onPreview,
  index, isLoading = false, isSelected = false, selectionMode = false,
  searchQuery = "", orderCount, lastOrderDate,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { handleNavigate, handleBlockToggle, handleDelete } = useClientCardActions(onToggleBlock, onDelete, onNavigate);
  const badges = useClientBadges(client, orderCount, lastOrderDate);

  if (isLoading) return <ClientCardSkeleton />;

  const avatarColors = getAvatarColor(`${client.firstName} ${client.lastName}`);
  const borderColor = client.blocked?.isBlocked ? colors.status.error : colors.status.success;
  const isBlocked = client.blocked?.isBlocked ?? false;

  return (
    <Animated.View entering={FadeInUp.delay(Math.min(index * 50, 500)).duration(400)} style={styles.wrapper}>
      <Pressable
        onPress={() => selectionMode && onSelect ? onSelect(client._id) : handleNavigate(client)}
        onLongPress={() => onPreview?.(client)}
        style={({ pressed }) => [
          styles.card, pressed && styles.cardPressed, isBlocked && styles.blockedCard, isSelected && styles.selectedCard,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`${client.firstName} ${client.lastName}, ${isBlocked ? "bloqué" : "actif"}`}
        accessibilityHint={selectionMode ? "Appuyez pour sélectionner" : "Appuyez longuement pour prévisualiser"}
        delayLongPress={400}
      >
        <View style={[styles.accentBorder, { backgroundColor: borderColor }]} />

        {selectionMode && (
          <View style={[styles.checkbox, { borderColor: isSelected ? colors.primary.main : colors.neutral[300] }]}>
            {isSelected && <Ionicons name="checkmark" size={16} color={colors.primary.main} />}
          </View>
        )}

        <LinearGradient colors={avatarColors} style={styles.avatar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.avatarText}>{getInitials(client.firstName, client.lastName)}</Text>
        </LinearGradient>

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <HighlightText
              text={`${client.firstName} ${client.lastName}`}
              query={searchQuery}
              style={styles.name}
              numberOfLines={1}
            />
            {isBlocked && (
              <View style={styles.blockedBadge}>
                <Ionicons name="ban" size={10} color={colors.status.error} />
                <Text style={styles.blockedText}>Bloqué</Text>
              </View>
            )}
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={14} color={colors.text.disabled} />
            <HighlightText text={client.phoneNumber || "N/A"} query={searchQuery} style={styles.phone} />
          </View>
          {client.email && (
            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={14} color={colors.text.disabled} />
              <Text style={styles.email} numberOfLines={1}>{client.email}</Text>
            </View>
          )}
          <ClientBadge badges={badges} />
        </View>

        {!selectionMode && (
          <View style={styles.quickActions}>
            {client.phoneNumber && (
              <Pressable onPress={() => callPhone(client.phoneNumber)} style={styles.quickBtn} accessibilityRole="button" accessibilityLabel="Appeler">
                <Ionicons name="call" size={16} color={colors.primary.main} />
              </Pressable>
            )}
            {client.phoneNumber && (
              <Pressable onPress={() => openWhatsApp(client.phoneNumber)} style={styles.quickBtn} accessibilityRole="button" accessibilityLabel="WhatsApp">
                <Ionicons name="logo-whatsapp" size={16} color={colors.status.success} />
              </Pressable>
            )}
            {client.email && (
              <Pressable onPress={() => sendEmail(client.email)} style={styles.quickBtn} accessibilityRole="button" accessibilityLabel="Email">
                <Ionicons name="mail" size={16} color={colors.status.info} />
              </Pressable>
            )}
          </View>
        )}

        {!selectionMode && (
          <View style={styles.actions}>
            <Pressable
              style={[styles.actionButton, isBlocked ? styles.unblockButton : styles.blockButton]}
              onPress={() => handleBlockToggle(client)}
              accessibilityRole="button"
              accessibilityLabel={isBlocked ? "Débloquer le client" : "Bloquer le client"}
            >
              <Ionicons name={isBlocked ? "lock-open" : "lock-closed"} size={18} color={isBlocked ? colors.status.success : colors.status.error} />
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDelete(client)}
              accessibilityRole="button"
              accessibilityLabel="Supprimer le client"
            >
              <Ionicons name="trash-outline" size={18} color={colors.status.error} />
            </Pressable>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
});

ClientCard.displayName = "ClientCard";
