import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { userData } from "@src/shared/types/user";
import { useHaptics } from "../../hooks/useHaptics";
import { ClientCard } from "../ClientCard";

interface SwipeableClientCardProps {
  client: userData;
  index: number;
  isLoading?: boolean;
  isSelected?: boolean;
  selectionMode?: boolean;
  searchQuery?: string;
  onToggleBlock: (id: string) => void;
  onDelete: (id: string) => void;
  onNavigate: (id: string) => void;
  onSelect?: (id: string) => void;
  onPreview?: (client: userData) => void;
}

export const SwipeableClientCard: React.FC<SwipeableClientCardProps> = ({
  client, index, isLoading, isSelected, selectionMode, searchQuery,
  onToggleBlock, onDelete, onNavigate, onSelect, onPreview,
}) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();
  const isBlocked = client.blocked?.isBlocked ?? false;

  const handleBlock = useCallback(() => {
    trigger("medium");
    Alert.alert(isBlocked ? "Débloquer le client ?" : "Bloquer le client ?",
      `Êtes-vous sûr de vouloir ${isBlocked ? "débloquer" : "bloquer"} ${client.firstName} ${client.lastName} ?`,
      [{ text: "Annuler", style: "cancel" },
        { text: isBlocked ? "Débloquer" : "Bloquer", style: isBlocked ? "default" : "destructive", onPress: () => onToggleBlock(client._id) },
      ]);
  }, [client, isBlocked, onToggleBlock, trigger]);

  const handleDelete = useCallback(() => {
    trigger("heavy");
    Alert.alert("Supprimer l'utilisateur ?", `Êtes-vous sûr de vouloir supprimer ${client.firstName} ${client.lastName} ? Cette action est irréversible.`,
      [{ text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => onDelete(client._id) },
      ]);
  }, [client, onDelete, trigger]);

  const renderLeftActions = () => (
    <View style={[styles.actionContainer, { backgroundColor: isBlocked ? colors.feedback.successBg : colors.feedback.errorBg }]}>
      <TouchableOpacity onPress={handleBlock} style={styles.actionButton} accessibilityRole="button" accessibilityLabel={isBlocked ? "Débloquer" : "Bloquer"}>
        <Ionicons name={isBlocked ? "lock-open" : "lock-closed"} size={22} color={isBlocked ? colors.status.success : colors.status.error} />
        <Text style={[styles.actionText, { color: isBlocked ? colors.status.success : colors.status.error }]}>{isBlocked ? "Débloquer" : "Bloquer"}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRightActions = () => (
    <View style={[styles.actionContainer, { backgroundColor: colors.feedback.errorBg }]}>
      <TouchableOpacity onPress={handleDelete} style={styles.actionButton} accessibilityRole="button" accessibilityLabel="Supprimer">
        <Ionicons name="trash-outline" size={22} color={colors.status.error} />
        <Text style={[styles.actionText, { color: colors.status.error }]}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  if (selectionMode) {
    return (
      <ClientCard
        client={client} index={index} isLoading={isLoading} isSelected={isSelected}
        selectionMode={selectionMode} searchQuery={searchQuery}
        onToggleBlock={onToggleBlock} onDelete={onDelete} onNavigate={onNavigate}
        onSelect={onSelect} onPreview={onPreview}
      />
    );
  }

  return (
    <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions} leftThreshold={40} rightThreshold={40} friction={2} overshootLeft={false} overshootRight={false}>
      <ClientCard
        client={client} index={index} isLoading={isLoading} searchQuery={searchQuery}
        onToggleBlock={onToggleBlock} onDelete={onDelete} onNavigate={onNavigate}
        onSelect={onSelect} onPreview={onPreview}
      />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 12,
  },
  actionButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
