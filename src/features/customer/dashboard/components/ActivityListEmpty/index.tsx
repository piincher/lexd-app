import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const ActivityListEmpty: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.text.disabled }]}>
        Aucune activité récente
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
});

export default ActivityListEmpty;
