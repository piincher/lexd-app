/**
 * NotificationSettingsHeader Component
 * Screen header with back button and title
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "@src/constants/Colors";

export const NotificationSettingsHeader: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color={COLORS.dark} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Notifications</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.dark,
  },
  placeholder: {
    width: 40,
  },
});
