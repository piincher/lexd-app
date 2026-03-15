/**
 * KPICards - KPI cards grid component
 * SRP: Display 4 KPI cards ONLY
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";

interface KPICardsProps {
  stats: {
    activeOrders: number;
    totalGoods: number;
    pendingContainers: number;
    smsBalance: number;
  };
}

interface KPICardData {
  icon: string;
  value: number;
  label: string;
  color: string;
}

export const KPICards: React.FC<KPICardsProps> = ({ stats }) => {
  const cards: KPICardData[] = [
    { icon: "shopping-bag", value: stats.activeOrders, label: "Active Orders", color: "#4CAF50" },
    { icon: "inventory", value: stats.totalGoods, label: "Goods in Stock", color: "#2196F3" },
    { icon: "local-shipping", value: stats.pendingContainers, label: "Containers", color: "#FF9800" },
    { icon: "sms", value: stats.smsBalance, label: "SMS Balance", color: "#9C27B0" },
  ];

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card key={index} style={[styles.card, { borderLeftColor: card.color }]}>
          <View style={styles.content}>
            <MaterialIcons name={card.icon as any} size={28} color={card.color} />
            <View style={styles.textContainer}>
              <Text style={styles.value}>{card.value}</Text>
              <Text style={styles.label}>{card.label}</Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  textContainer: {
    marginLeft: 12,
  },
  value: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 2,
  },
});

export default KPICards;
