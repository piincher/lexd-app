import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const LoadingState: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary.main} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
