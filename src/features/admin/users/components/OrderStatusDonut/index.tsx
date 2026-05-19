import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface DonutDataItem {
  value: number;
  label: string;
  color: string;
}

interface OrderStatusDonutProps {
  data: DonutDataItem[];
  total: number;
}

export const OrderStatusDonut: React.FC<OrderStatusDonutProps> = ({ data, total }) => {
  const { colors } = useAppTheme();

  if (data.length === 0 || total === 0) {
    return (
      <Animated.View entering={FadeInUp.delay(500)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Statut des Commandes</Text>
        <View style={styles.empty}>
          <Ionicons name="pie-chart-outline" size={48} color={colors.text.disabled} />
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Aucune commande</Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInUp.delay(500).duration(500)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Statut des Commandes</Text>
      <View style={styles.row}>
        <PieChart
          data={data.map((d) => ({ value: d.value, color: d.color }))}
          donut
          radius={65}
          innerRadius={42}
          innerCircleColor={colors.background.card}
          centerLabelComponent={() => (
            <View style={styles.center}>
              <Text style={[styles.centerValue, { color: colors.text.primary }]}>{total}</Text>
              <Text style={[styles.centerLabel, { color: colors.text.secondary }]}>Total</Text>
            </View>
          )}
        />
        <View style={styles.legend}>
          {data.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={[styles.legendText, { color: colors.text.secondary }]} numberOfLines={1}>
                {item.label} ({item.value})
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = {
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  center: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  centerValue: {
    fontSize: 22,
    fontWeight: "800" as const,
  },
  centerLabel: {
    fontSize: 11,
    marginTop: -2,
  },
  legend: {
    flex: 1,
    marginLeft: 16,
    gap: 10,
  },
  legendItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    fontWeight: "500" as const,
    flexShrink: 1,
  },
  empty: {
    height: 140,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "500" as const,
  },
};
