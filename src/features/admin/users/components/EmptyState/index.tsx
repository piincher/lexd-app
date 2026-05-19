import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";

interface EmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, onClear }) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();

  const handleClear = () => {
    trigger("light");
    onClear();
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Animated.View
        entering={FadeInUp.delay(100)}
        style={[styles.iconContainer, { backgroundColor: colors.background.paper }]}
      >
        <MaterialCommunityIcons
          name={searchQuery ? "account-search" : "account-group"}
          size={64}
          color={colors.text.disabled}
        />
      </Animated.View>
      <Animated.Text
        entering={FadeInUp.delay(200)}
        style={[styles.title, { color: colors.text.primary }]}
      >
        {searchQuery ? "Aucun client trouvé" : "Aucun client"}
      </Animated.Text>
      <Animated.Text
        entering={FadeInUp.delay(300)}
        style={[styles.subtitle, { color: colors.text.secondary }]}
      >
        {searchQuery
          ? "Essayez avec d'autres critères de recherche"
          : "La liste des clients est vide"}
      </Animated.Text>
      {searchQuery && (
        <Animated.View entering={FadeInUp.delay(400)}>
          <Pressable
            onPress={handleClear}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.primary.main, opacity: pressed ? 0.9 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Effacer la recherche"
          >
            <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
              Effacer la recherche
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700" as const,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center" as const,
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: "700" as const,
    fontSize: 15,
  },
};
