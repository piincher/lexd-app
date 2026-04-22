/**
 * NotificationSettingsHeader Component
 * Screen header with back button and title
 */

import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const NotificationSettingsHeader: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: colors.background.default,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        backButton: {
          padding: 8,
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: "600",
          color: colors.text.primary,
        },
        placeholder: {
          width: 40,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Notifications</Text>
      <View style={styles.placeholder} />
    </View>
  );
};
