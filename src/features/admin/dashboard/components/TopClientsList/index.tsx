import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { OutstandingClient } from "../../types";
import { styles } from "./TopClientsList.styles";

interface TopClientsListProps {
  clients: OutstandingClient[];
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const TopClientsList: React.FC<TopClientsListProps> = ({ clients }) => {
  const navigation = useNavigation();

  const renderItem = ({ item, index }: { item: OutstandingClient; index: number }) => (
    <TouchableOpacity
      style={styles.clientItem}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("ClientDetails", { id: item.clientId })}
    >
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>#{index + 1}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.clientName}
        </Text>
        {item.phoneNumber ? (
          <Text style={styles.phone} numberOfLines={1}>
            {item.phoneNumber}
          </Text>
        ) : null}
        <Text style={styles.goodsCount}>{item.goodsCount} colis</Text>
      </View>
      <Text style={styles.amount}>{formatCurrency(item.totalOwed)}</Text>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  if (!clients || clients.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="people-outline" size={32} color="#9CA3AF" />
        <Text style={styles.emptyText}>Aucun client avec impayés</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trophy" size={18} color="#F59E0B" />
        <Text style={styles.title}>Top Clients avec Impayés</Text>
      </View>
      <FlashList
        data={clients}
        renderItem={renderItem}
        keyExtractor={(item) => item.clientId}
        scrollEnabled={false}
      />
    </View>
  );
};
