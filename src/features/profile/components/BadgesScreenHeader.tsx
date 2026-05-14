/**
 * BadgesScreenHeader
 * Header with back button, title, and optional right element
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from '@src/constants/Theme';

interface BadgesScreenHeaderProps {
  title: string;
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export const BadgesScreenHeader: React.FC<BadgesScreenHeaderProps> = ({
  title,
  onBack,
  rightElement,
}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
      <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    {rightElement || <View style={styles.headerSpacer} />}
  </View>
);

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "Theme.colors.text.inverse", fontFamily: Fonts.bold, fontSize: 18 },
  headerSpacer: { width: 40 },
});
