import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();

  const handleRetry = () => {
    trigger("medium");
    onRetry();
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Animated.View entering={FadeInUp.delay(100)}>
        <Ionicons name="cloud-offline-outline" size={72} color={colors.status.error} />
      </Animated.View>
      <Animated.Text
        entering={FadeInUp.delay(200)}
        style={[styles.title, { color: colors.text.primary }]}
      >
        Oups !
      </Animated.Text>
      <Animated.Text
        entering={FadeInUp.delay(300)}
        style={[styles.subtitle, { color: colors.text.secondary }]}
      >
        Impossible de charger les clients. Vérifiez votre connexion et réessayez.
      </Animated.Text>
      <Animated.View entering={FadeInUp.delay(400)}>
        <Pressable
          onPress={handleRetry}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.status.error, opacity: pressed ? 0.9 : 1 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Réessayer"
        >
          <Ionicons name="refresh" size={16} color={colors.text.inverse} />
          <Text style={[styles.buttonText, { color: colors.text.inverse }]}>Réessayer</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    padding: 32,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700" as const,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center" as const,
    lineHeight: 22,
    marginBottom: 8,
  },
  button: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: "700" as const,
    fontSize: 15,
  },
};
