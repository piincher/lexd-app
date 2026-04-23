/**
 * NotificationInfoFooter Component
 * Footer info text for notification settings
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Theme } from "@src/constants/Theme";

export const NotificationInfoFooter: React.FC = () => {
  return (
    <View style={styles.infoSection}>
      <Text style={styles.infoText}>
        You can customize which notifications you receive at any time.
        Important security alerts will always be delivered.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    padding: 16,
    marginTop: 8,
  },
  infoText: {
    fontSize: 13,
    color: Theme.colors.text.disabled,
    textAlign: "center",
    lineHeight: 18,
  },
});
