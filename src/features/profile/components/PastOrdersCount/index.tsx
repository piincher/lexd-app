import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./PastOrdersCount.styles";

interface PastOrdersCountProps {
  count: number;
  totalCount: number;
}

export const PastOrdersCount: React.FC<PastOrdersCountProps> = ({ count, totalCount }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const label = count === totalCount
    ? `${count} expédition${count > 1 ? "s" : ""}`
    : `${count} sur ${totalCount} expéditions`;

  return (
    <View style={styles.countContainer}>
      <Text style={styles.countText}>{label}</Text>
      <Text style={styles.countHint}>{"Plus récentes d'abord"}</Text>
    </View>
  );
};
