/**
 * RecentOrders - Recent orders list component
 * SRP: Display recent orders list ONLY
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card, Avatar, Badge, Divider, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@src/constants/Colors";
import { getStatusColor } from "../utils/statusColors";
import { styles } from "./RecentOrders.styles";

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

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Recent Orders</Text>
        <Button mode="text" onPress={() => navigation.navigate("AllOrders" as never)} textColor={COLORS.blue}>
          View All
        </Button>
      </View>
      <Divider />
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <OrderItem
            key={order.id}
            order={order}
            isLast={index === orders.length - 1}
            onPress={() => navigation.navigate("ActiveOrderDetails" as never, { id: order.id })}
          />
        ))
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No recent orders</Text>
        </View>
      )}
    </Card>
  );
};

interface OrderItemProps {
  order: RecentOrder;
  isLast: boolean;
  onPress: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, isLast, onPress }) => {
  const statusColor = getStatusColor(order.status);
  const initials = order.clientName?.split(" ").map((n) => n[0]).join("") || "?";

  return (
    <>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={styles.left}>
          <Avatar.Text
            size={40}
            label={initials}
            style={{ backgroundColor: statusColor + "30" }}
            labelStyle={{ color: statusColor }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.clientName}>{order.clientName}</Text>
            <Text style={styles.orderCode}>{order.code}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Badge style={[styles.statusBadge, { backgroundColor: statusColor + "20" }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{order.status}</Text>
          </Badge>
          <Text style={styles.date}>{new Date(order.date).toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
      {!isLast && <Divider style={{ marginLeft: 60 }} />}
    </>
  );
};

export default RecentOrders;
