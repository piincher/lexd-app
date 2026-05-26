import React from "react";
import { View, Text } from "react-native";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ClientDetailHeader.styles";

interface ClientDetailHeaderProps {
  totalShipments: number;
}

export const ClientDetailHeader: React.FC<ClientDetailHeaderProps> = ({ totalShipments }) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>Détails Commandes</Text>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={22}
          color={colors.text.primary}
        />
      </View>
      <Text style={styles.subtitle}>{totalShipments} expéditions au total</Text>
    </View>
  );
};
