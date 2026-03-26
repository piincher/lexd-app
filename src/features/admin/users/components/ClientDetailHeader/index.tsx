import React from "react";
import { View, Text } from "react-native";
import { styles } from "./ClientDetailHeader.styles";

interface ClientDetailHeaderProps {
  totalShipments: number;
}

export const ClientDetailHeader: React.FC<ClientDetailHeaderProps> = ({ totalShipments }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Détails Commandes</Text>
    <Text style={styles.subtitle}>{totalShipments} expéditions au total</Text>
  </View>
);
