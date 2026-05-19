import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "@src/shared/types/order";
import { STATUS_CONFIG } from "../../lib/constants";

interface OrderTimelineProps {
  orders: productType[];
}

const TimelineItem: React.FC<{ order: productType; isLast: boolean; index: number }> = ({ order, isLast, index }) => {
  const { colors } = useAppTheme();
  const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
  const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }) : "—";
  const routeTitle = order.route?.[0]?.title || "—";

  return (
    <Animated.View entering={FadeInUp.delay(index * 80).duration(400)} style={styles.item}>
      <View style={styles.left}>
        <View style={[styles.dot, { backgroundColor: status?.color || colors.text.disabled }]} />
        {!isLast && <View style={[styles.line, { backgroundColor: colors.neutral[200] }]} />}
      </View>
      <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.neutral[200] }]}>
        <View style={styles.header}>
          <Text style={[styles.code, { color: colors.text.primary }]}>#{order.code}</Text>
          <View style={[styles.pill, { backgroundColor: `${status?.color}15` }]}>
            <Text style={[styles.pillText, { color: status?.color }]}>{status?.label || order.status}</Text>
          </View>
        </View>
        <Text style={[styles.date, { color: colors.text.secondary }]}>{date}</Text>
        <Text style={[styles.route, { color: colors.text.secondary }]} numberOfLines={1}>
          {routeTitle}
        </Text>
      </View>
    </Animated.View>
  );
};

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ orders }) => {
  const { colors } = useAppTheme();

  if (orders.length === 0) return null;

  return (
    <Animated.View entering={FadeInUp.delay(600)} style={[styles.container, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Historique des Commandes</Text>
      {orders.slice(0, 5).map((order, i) => (
        <TimelineItem key={order._id || order.code} order={order} isLast={i === Math.min(orders.length, 5) - 1} index={i} />
      ))}
    </Animated.View>
  );
};

const styles = {
  container: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
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
  item: {
    flexDirection: "row" as const,
    gap: 12,
  },
  left: {
    width: 20,
    alignItems: "center" as const,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 6,
  },
  code: {
    fontSize: 15,
    fontWeight: "700" as const,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "700" as const,
  },
  date: {
    fontSize: 13,
    fontWeight: "500" as const,
    marginBottom: 2,
  },
  route: {
    fontSize: 13,
    fontWeight: "400" as const,
  },
};
