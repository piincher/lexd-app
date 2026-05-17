import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ResultsBarProps {
  count: number;
}

export const ResultsBar: React.FC<ResultsBarProps> = ({ count }) => {
  const { colors, isDark } = useAppTheme();
  return (
    <Animated.View entering={FadeInUp} style={[
      styles.container,
      { backgroundColor: isDark ? colors.feedback.successBg : colors.feedback.successBg, borderBottomColor: isDark ? colors.status.success : colors.status.success }
    ]}>
      <Text style={[styles.text, { color: colors.status.success }]}>
        {count} résultat{count !== 1 ? 's' : ''}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
  },
});
