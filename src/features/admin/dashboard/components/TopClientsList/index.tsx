import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OutstandingClient } from "../../types";
import { useTopClientsListStyles } from "./TopClientsList.styles";
import {
  TopClientsListHeader,
  TopClientsListEmpty,
  TopClientsListItem,
} from "./components";

interface TopClientsListProps {
  clients: OutstandingClient[];
}

export const TopClientsList: React.FC<TopClientsListProps> = ({ clients }) => {
  const navigation = useNavigation();
  const styles = useTopClientsListStyles();

  const handlePress = (clientId: string) => {
    navigation.navigate("ClientDetails", { id: clientId });
  };

  return (
    <View style={styles.container}>
      <TopClientsListHeader clientCount={clients?.length || 0} />
      {!clients || clients.length === 0 ? (
        <TopClientsListEmpty />
      ) : (
        clients.map((item, index) => (
          <TopClientsListItem
            key={item.clientId}
            item={item}
            index={index}
            isLast={index === clients.length - 1}
            onPress={handlePress}
          />
        ))
      )}
    </View>
  );
};

export default TopClientsList;
