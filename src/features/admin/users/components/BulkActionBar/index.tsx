import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";

interface BulkActionBarProps {
  selectedCount: number;
  onBlock: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onBlock,
  onDelete,
  onClear,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const { trigger } = useHaptics();

  const handleBlock = useCallback(() => {
    trigger("medium");
    Alert.alert("Bloquer la sélection ?", `Êtes-vous sûr de vouloir bloquer ${selectedCount} client(s) ?`, [
      { text: "Annuler", style: "cancel" },
      { text: "Bloquer", style: "destructive", onPress: onBlock },
    ]);
  }, [selectedCount, onBlock, trigger]);

  const handleDelete = useCallback(() => {
    trigger("heavy");
    Alert.alert("Supprimer la sélection ?", `Êtes-vous sûr de vouloir supprimer ${selectedCount} client(s) ? Cette action est irréversible.`, [
      { text: "Annuler", style: "cancel" },
      { text: "Supprimer", style: "destructive", onPress: onDelete },
    ]);
  }, [selectedCount, onDelete, trigger]);

  return (
    <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={[styles.container, { backgroundColor: colors.background.card }]}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onClear} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Annuler la sélection">
          <Ionicons name="close" size={22} color={colors.text.secondary} />
        </TouchableOpacity>
        <Text style={[styles.count, { color: colors.text.primary }]}>
          {selectedCount} sélectionné{selectedCount > 1 ? "s" : ""}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleBlock} style={[styles.action, { backgroundColor: colors.feedback.warningBg }]} accessibilityRole="button" accessibilityLabel="Bloquer la sélection">
            <Ionicons name="lock-closed" size={18} color={colors.status.warning} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={[styles.action, { backgroundColor: colors.feedback.errorBg }]} accessibilityRole="button" accessibilityLabel="Supprimer la sélection">
            <Ionicons name="trash" size={18} color={colors.status.error} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  action: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
