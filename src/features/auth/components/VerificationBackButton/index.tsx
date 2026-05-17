import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface VerificationBackButtonProps {
  onPress: () => void;
}

export const VerificationBackButton: React.FC<VerificationBackButtonProps> = ({ onPress }) => {
  const { colors, isDark } = useAppTheme();

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <Pressable
        onPress={onPress}
        style={[styles.backBtn, { backgroundColor: colors.background.paper }]}
      >
        <MaterialCommunityIcons name="arrow-left" size={22} color={colors.text.primary} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
});

export default VerificationBackButton;
