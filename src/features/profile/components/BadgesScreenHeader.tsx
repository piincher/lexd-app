/**
 * BadgesScreenHeader
 * Header with back button, title, and optional right element
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from '@src/providers/ThemeProvider';

interface BadgesScreenHeaderProps {
  title: string;
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export const BadgesScreenHeader: React.FC<BadgesScreenHeaderProps> = ({
  title,
  onBack,
  rightElement,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: colors.background.overlay }]} activeOpacity={0.7}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.inverse} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text.inverse }]}>{title}</Text>
      {rightElement || <View style={styles.headerSpacer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 18 },
  headerSpacer: { width: 40 },
});
