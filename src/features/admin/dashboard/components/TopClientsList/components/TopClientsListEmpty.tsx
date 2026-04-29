import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTopClientsListStyles } from "../TopClientsList.styles";

export const TopClientsListEmpty: React.FC = () => {
  const styles = useTopClientsListStyles();

  return (
    <View style={styles.empty}>
      <View style={styles.emptyIconWrap}>
        <MaterialCommunityIcons name="check-decagram" size={24} color="#10B981" />
      </View>
      <Text style={styles.emptyText}>Aucun impayé</Text>
      <Text style={styles.emptySubtext}>Tous les clients sont à jour</Text>
    </View>
  );
};
