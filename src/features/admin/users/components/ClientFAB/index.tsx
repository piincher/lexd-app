import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ClientFABProps {
  onPress: () => void;
}

const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: isDark ? colors.primary.dark : undefined,
    borderWidth: isDark ? 1 : 0,
    borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'transparent',
    shadowColor: isDark ? colors.primary.main : colors.neutral[900],
    shadowOffset: { width: 0, height: isDark ? 6 : 4 },
    shadowOpacity: isDark ? 0.35 : 0.2,
    shadowRadius: isDark ? 16 : 12,
    elevation: isDark ? 8 : 6,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ClientFAB: React.FC<ClientFABProps> = ({ onPress }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
      accessibilityRole="button"
      accessibilityLabel="Ajouter un client"
    >
      {isDark ? (
        <View style={styles.gradient}>
          <Ionicons name="add" size={28} color={colors.text.inverse} />
        </View>
      ) : (
        <LinearGradient
          colors={Theme.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Ionicons name="add" size={28} color={colors.text.inverse} />
        </LinearGradient>
      )}

    </AnimatedPressable>
  );
};


