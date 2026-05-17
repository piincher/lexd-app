import React from "react";
import { Text, View } from "react-native";

interface MultiSelectEmptyProps {
  styles: ReturnType<typeof import("./MultiSelect.styles").getStyles>;
}

export const MultiSelectEmpty: React.FC<MultiSelectEmptyProps> = ({ styles }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No items available</Text>
  </View>
);
