import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

interface OrderStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export const OrderStatsCard: React.FC<OrderStatsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return COLORS.green || "#4CAF50";
      case "down":
        return COLORS.red || "#F44336";
      default:
        return COLORS.grey;
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
        
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
        
        {trend && trendValue && (
          <Text style={[styles.trend, { color: getTrendColor() }]}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    minWidth: 140,
  },
  title: {
    fontSize: 12,
    color: COLORS.grey,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.darkGrey,
    marginTop: 4,
  },
  trend: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
