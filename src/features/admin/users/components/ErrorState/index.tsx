import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../lib/constants";

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => (
  <View style={styles.container}>
    <Ionicons name="alert-circle" size={64} color={COLORS.warning} />
    <Text style={styles.errorText}>Échec du chargement</Text>
    <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
      <Text style={styles.retryText}>Réessayer</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.warning,
    textAlign: "center",
    marginBottom: 24,
    marginTop: 16,
  },
  retryButton: {
    backgroundColor: `${COLORS.warning}20`,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.warning,
  },
});
