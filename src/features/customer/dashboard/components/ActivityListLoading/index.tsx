import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const ActivityListLoading: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.center, { flex: 1 }]}>
      <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
        Chargement...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default ActivityListLoading;
