import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

interface EmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, onClear }) => (
  <Animated.View entering={FadeIn} style={styles.container}>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons 
        name={searchQuery ? "account-search" : "account-group"} 
        size={64} 
        color="#D1D5DB" 
      />
    </View>
    <Text style={styles.title}>
      {searchQuery ? "Aucun client trouvé" : "Aucun client"}
    </Text>
    <Text style={styles.subtitle}>
      {searchQuery 
        ? "Essayez avec d'autres critères de recherche" 
        : "La liste des clients est vide"}
    </Text>
    {searchQuery && (
      <TouchableOpacity onPress={onClear} style={styles.button}>
        <Text style={styles.buttonText}>Effacer la recherche</Text>
      </TouchableOpacity>
    )}
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1a5f2a",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
