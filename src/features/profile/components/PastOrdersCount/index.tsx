import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./PastOrdersCount.styles";

interface PastOrdersCountProps {
  count: number;
}

export const PastOrdersCount: React.FC<PastOrdersCountProps> = ({ count }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.countContainer}>
      <Text style={styles.countText}>
        {count} commande{count > 1 ? "s" : ""} terminée{count > 1 ? "s" : ""}
      </Text>
    </View>
  );
};
