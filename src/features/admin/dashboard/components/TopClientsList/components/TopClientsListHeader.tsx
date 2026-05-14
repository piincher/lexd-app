import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useTopClientsListStyles } from "../TopClientsList.styles";

interface TopClientsListHeaderProps {
  clientCount?: number;
}

export const TopClientsListHeader: React.FC<TopClientsListHeaderProps> = ({
  clientCount,
}) => {
  const styles = useTopClientsListStyles();
  const { colors } = useAppTheme();

  return (
    <View style={styles.header}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="trophy" size={18} color={colors.status.warning} />
      </View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Top clients impayés</Text>
        <Text style={styles.subtitle}>
          {clientCount ? `${clientCount} clients` : "Classement"}
        </Text>
      </View>
    </View>
  );
};
