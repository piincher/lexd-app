import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

interface BackToTopButtonProps {
  animatedStyle: any;
  onPress: () => void;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  animatedStyle,
  onPress,
}) => {
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      >
        <LinearGradient
          colors={["#4A90E2", "#1ED7B5"]}
          style={styles.button}
        >
          <AntDesign name="arrow-up" size={24} color="white" />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 20,
    zIndex: 100,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
