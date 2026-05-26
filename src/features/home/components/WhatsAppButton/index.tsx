import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { openSupportWhatsApp } from "@src/shared/lib/openWhatsApp";
import type { AppTheme } from '@src/constants/Theme';

interface WhatsAppButtonProps {
  animatedStyle: Record<string, unknown>;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ animatedStyle }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <Animated.View style={[styles.whatsappButton, animatedStyle]}>
      <Pressable
        onPress={() => openSupportWhatsApp("Bonjour ChinaLink, J ai une demande d'expedition a faire :)")}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      >
        <LinearGradient colors={["#25D366", "#128C7E"]} style={styles.whatsappContainer}>
          <FontAwesome6 name="whatsapp" size={28} color={colors.neutral.white} />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const createStyles = (colors: AppTheme['colors']) => StyleSheet.create({
  whatsappButton: {
    position: "absolute",
    right: 16,
    bottom: 100,
    zIndex: 1000,
    elevation: 10,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  whatsappContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
