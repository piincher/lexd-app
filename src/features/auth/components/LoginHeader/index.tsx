/**
 * LoginHeader — Clean centered brand mark + title
 * Hallmark · macrostructure: Letter · tone: warm-utilitarian
 */

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { IMAGES } from "@src/constants/Images";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS } from "@src/shared/ui/designLanguage";

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      style={styles.container}
    >
      <View style={[styles.logoWrap, { backgroundColor: colors.primary.main + "14" }]}>
        <Image
          source={IMAGES.logo}
          style={[styles.logo, { tintColor: colors.primary.main }]}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>{subtitle}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.control,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    letterSpacing: -0.8,
    lineHeight: 40,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 280,
  },
});

export default LoginHeader;
