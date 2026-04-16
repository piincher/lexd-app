/**
 * KPICards - KPI cards grid component
 * SRP: Display 4 KPI cards ONLY
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface KPICardsProps {
  stats: {
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
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          color: colors.text.primary,
        },
        label: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
      }),
    [colors]
  );

  const cards: KPICardData[] = [
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


export default KPICards;
