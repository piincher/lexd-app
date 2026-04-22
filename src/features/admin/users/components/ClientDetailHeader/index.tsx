import React from "react";
import { View, Text } from "react-native";
import { NotificationBell } from "@src/features/notifications";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ClientDetailHeader.styles";

interface ClientDetailHeaderProps {
  totalShipments: number;
}

export const ClientDetailHeader: React.FC<ClientDetailHeaderProps> = ({ totalShipments }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>Détails Commandes</Text>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={22}
          color="#1F2937"
        />
      </View>
      <Text style={styles.subtitle}>{totalShipments} expéditions au total</Text>
    </View>
  );
};
