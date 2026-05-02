import React, { useMemo } from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./RecentOrders.styles";
import { OrderRow } from "./OrderRow";

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
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

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
          onPress={() => (navigation.navigate as any)("AllOrders")}
          style={({ pressed }) => [styles.viewAll, pressed && { opacity: 0.7 }]}
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
              (navigation.navigate as any)("ActiveOrderDetails", {
                id: order.id,
              })
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

export default RecentOrders;
