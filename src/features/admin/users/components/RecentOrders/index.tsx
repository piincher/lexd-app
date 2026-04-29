import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { productType } from "@src/shared/types/order";
import { STATUS_CONFIG } from "../../lib/constants";
import { styles } from "./RecentOrders.styles";

interface OrderItemProps {
  order: productType;
  isLast: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, isLast }) => {
  const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
  
  return (
    <View style={[styles.orderItem, isLast && styles.orderItemLast]}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>#{order.code}</Text>
        <Text style={styles.orderDate}>
          {new Date(order.createdAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
      <View style={[styles.statusPill, { backgroundColor: `${statusConfig?.color}15` }]}>
        <Ionicons name={statusConfig?.icon as any} size={14} color={statusConfig?.color} style={{ marginRight: 6 }} />
        <Text style={[styles.statusText, { color: statusConfig?.color }]}>
          {statusConfig?.label}
        </Text>
      </View>
    </View>
  );
};

interface RecentOrdersProps {
  orders: productType[];
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Commandes Récentes</Text>
      <Text style={styles.viewAll}>Voir tout</Text>
    </View>

    {orders.length > 0 ? (
      orders.map((order, index) => (
        <OrderItem
          key={order.code}
          order={order}
          isLast={index === orders.length - 1}
        />
      ))
    ) : (
      <Text style={styles.emptyText}>Aucune commande récente</Text>
    )}
  </View>
);
