import React, { useMemo } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStatusColor } from "../utils/statusColors";

interface RecentOrder {
  id: string;
  code: string;
  clientName: string;
  status: string;
  date: string;
}

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginBottom: 20,
          borderRadius: 20,
          backgroundColor: colors.background.card,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          padding: 16,
          ...Theme.shadows.sm,
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        },
        headerLeft: {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
        headerIcon: {
          width: 30,
          height: 30,
          borderRadius: 10,
          backgroundColor: isDark ? "rgba(34,197,94,0.18)" : "#F0FDF4",
          justifyContent: "center",
          alignItems: "center",
        },
        title: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: -0.2,
        },
        viewAll: {
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 999,
          backgroundColor: isDark ? "rgba(34,197,94,0.15)" : "#F0FDF4",
        },
        viewAllText: {
          fontSize: 11,
          fontFamily: Fonts.bold,
          color: colors.primary.main,
        },
        item: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
        },
        itemDivider: {
          height: 1,
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
          marginLeft: 52,
        },
        avatar: {
          width: 42,
          height: 42,
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        },
        avatarText: {
          fontSize: 14,
          fontFamily: Fonts.bold,
        },
        middle: {
          flex: 1,
        },
        clientName: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: -0.2,
        },
        subRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          marginTop: 2,
        },
        orderCode: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        dot: {
          width: 3,
          height: 3,
          borderRadius: 1.5,
          backgroundColor: colors.text.disabled,
        },
        date: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        statusPill: {
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: 999,
          marginLeft: 8,
        },
        statusText: {
          fontSize: 10,
          fontFamily: Fonts.bold,
          textTransform: "capitalize",
        },
        empty: {
          alignItems: "center",
          paddingVertical: 32,
        },
        emptyIcon: {
          width: 52,
          height: 52,
          borderRadius: 16,
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        },
        emptyTitle: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        emptyText: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
      }),
    [colors, isDark]
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="clipboard-text-clock"
              size={16}
              color={colors.primary.main}
            />
          </View>
          <Text style={styles.title}>Commandes récentes</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("AllOrders" as never)}
          style={({ pressed }) => [
            styles.viewAll,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.viewAllText}>Tout voir</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={14}
            color={colors.primary.main}
          />
        </Pressable>
      </View>

      {orders.length > 0 ? (
        orders.map((order, idx) => (
          <OrderRow
            key={order.id}
            order={order}
            isLast={idx === orders.length - 1}
            styles={styles}
            onPress={() =>
              navigation.navigate("ActiveOrderDetails" as never, {
                id: order.id,
              } as never)
            }
          />
        ))
      ) : (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons
              name="inbox-outline"
              size={24}
              color={colors.text.disabled}
            />
          </View>
          <Text style={styles.emptyTitle}>Aucune commande récente</Text>
          <Text style={styles.emptyText}>
            Les nouvelles commandes apparaîtront ici
          </Text>
        </View>
      )}
    </View>
  );
};

interface OrderRowProps {
  order: RecentOrder;
  isLast: boolean;
  styles: any;
  onPress: () => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, isLast, styles, onPress }) => {
  const statusColor = getStatusColor(order.status);
  const initials =
    order.clientName
      ?.split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const formattedDate = (() => {
    try {
      return new Date(order.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
      });
    } catch {
      return "";
    }
  })();

  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.item,
          pressed && { opacity: 0.7 },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: statusColor + "22" }]}>
          <Text style={[styles.avatarText, { color: statusColor }]}>
            {initials}
          </Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.clientName} numberOfLines={1}>
            {order.clientName}
          </Text>
          <View style={styles.subRow}>
            <Text style={styles.orderCode}>{order.code}</Text>
            {formattedDate ? (
              <>
                <View style={styles.dot} />
                <Text style={styles.date}>{formattedDate}</Text>
              </>
            ) : null}
          </View>
        </View>
        <View
          style={[styles.statusPill, { backgroundColor: statusColor + "22" }]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {order.status.toLowerCase()}
          </Text>
        </View>
      </Pressable>
      {!isLast && <View style={styles.itemDivider} />}
    </>
  );
};

export default RecentOrders;
