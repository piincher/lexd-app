import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useTopClientsListStyles } from "../TopClientsList.styles";

export const TopClientsListEmpty: React.FC = () => {
  const styles = useTopClientsListStyles();
  const { colors } = useAppTheme();

  return (
    <View style={styles.empty}>
      <View style={styles.emptyIconWrap}>
        <MaterialCommunityIcons name="check-decagram" size={24} color={colors.status.success} />
      </View>
      <Text style={styles.emptyText}>Aucun impayé</Text>
      <Text style={styles.emptySubtext}>Tous les clients sont à jour</Text>
    </View>
  );
};
