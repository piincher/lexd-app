import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { Theme } from "@src/constants/Theme";

export const SearchLoadingState: React.FC = () => {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={Theme.primary[500]} />
      <Text style={styles.loadingText}>Recherche en cours...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing["4xl"],
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 14,
    color: Theme.neutral[500],
  },
});
