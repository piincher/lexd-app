import React from "react";
import { Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const VerificationFooter: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeIn.delay(400).duration(400)} style={styles.footer}>
      <Text style={[styles.footerText, { color: colors.text.disabled }]}>
        made with ❤️ by nuvotech.tech, paris-nanjing +8617865673053
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    textAlign: "center",
  },
});

export default VerificationFooter;
