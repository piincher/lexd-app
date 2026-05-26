import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./UnassignedGoodsHeader.styles";

interface UnassignedGoodsHeaderProps {
  onBack: () => void;
  rightElement?: React.ReactNode;
  /** Total count surfaced as a small chip next to the title — Bento voice puts one
   *  signal in the header and the rest in the triage panel below. */
  total?: number;
}

export const UnassignedGoodsHeader: React.FC<UnassignedGoodsHeaderProps> = ({
  onBack,
  rightElement,
  total,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={8}>
        <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
      </TouchableOpacity>
      <View style={styles.titleBlock}>
        <Text style={styles.eyebrow}>RÉCEPTION</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>Non assignées</Text>
          {typeof total === "number" && total > 0 ? (
            <View style={styles.countChip}>
              <Text style={styles.countChipText}>{total}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.right}>{rightElement}</View>
    </View>
  );
};
