import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface ResultsBarProps {
  count: number;
}

export const ResultsBar: React.FC<ResultsBarProps> = ({ count }) => (
  <Animated.View entering={FadeInUp} style={styles.container}>
    <Text style={styles.text}>{count} résultat{count !== 1 ? 's' : ''}</Text>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#F0FDF4",
    borderBottomWidth: 1,
    borderBottomColor: "#BBF7D0",
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    color: "#166534",
  },
});
