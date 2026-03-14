import React from "react";
import { Pressable, Linking, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";

interface WhatsAppButtonProps {
  animatedStyle: any;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ animatedStyle }) => {
  return (
    <Animated.View style={[styles.whatsappButton, animatedStyle]}>
      <Pressable
        onPress={() =>
          Linking.openURL(
            "whatsapp://send?phone=+8618851725957&text=Bonjour%20ChinaLink,%20J%20ai%20une%20demande%20d'expedition%20a%20faire%20:)"
          )
        }
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      >
        <LinearGradient colors={["#25D366", "#128C7E"]} style={styles.whatsappContainer}>
          <FontAwesome6 name="whatsapp" size={28} color="white" />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  whatsappButton: {
    position: "absolute",
    right: 16,
    bottom: 100,
    zIndex: 1000,
    elevation: 10,
    shadowColor: "#000",
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
