import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface EmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, onClear }) => {
  const { colors } = useAppTheme();
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.background.paper }]}>
        <MaterialCommunityIcons 
          name={searchQuery ? "account-search" : "account-group"} 
          size={64} 
          color={colors.text.disabled} 
        />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {searchQuery ? "Aucun client trouvé" : "Aucun client"}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
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
};

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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
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
