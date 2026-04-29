import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTopClientsListStyles } from "../TopClientsList.styles";

interface TopClientsListHeaderProps {
  clientCount?: number;
}

export const TopClientsListHeader: React.FC<TopClientsListHeaderProps> = ({
  clientCount,
}) => {
  const styles = useTopClientsListStyles();

  return (
    <View style={styles.header}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="trophy" size={18} color="#F59E0B" />
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
