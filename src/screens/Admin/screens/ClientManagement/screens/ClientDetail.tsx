import React, { useMemo } from "react";
import {
   View,
   Text,
   ScrollView,
   Dimensions,
   Pressable,
   ActivityIndicator,
   StyleSheet,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useGetOrderOfUserById } from "@src/screens/Home/hooks/useGetActiveOrders";
import { RootStackScreenProps } from "@src/navigations/type";
import { useGetUser } from "@src/hooks/useGetUser";
import { productType } from "@src/api/order";

// Constants
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const STATUS_LABELS = ["Active", "In Transit", "Inactive"];
const INITIAL_COUNTS = { Active: 0, "In Transit": 0, Inactive: 0 };

// Color palette
const COLORS = {
   primary: "#4361ee",
   secondary: "#3f37c9",
   success: "#4cc9f0",
   warning: "#f72585",
   info: "#4895ef",
   light: "#f8f9fa",
   dark: "#212529",
   card: "#ffffff",
   border: "#e9ecef",
   text: "#495057",
   muted: "#6c757d",
};

// Status configuration
const STATUS_CONFIG = {
   Active: { label: "Chargé", color: "#f72585", icon: "cube" },
   "In Transit": { label: "En Transit", color: "#4895ef", icon: "airplane" },
   Inactive: { label: "Livré", color: "#4cc9f0", icon: "checkmark-circle" },
};

// Transform orders into status counts
const useOrderStatusCounts = (orders) => {
   return useMemo(() => {
      if (!orders?.length) return INITIAL_COUNTS;

      const counts = { ...INITIAL_COUNTS };
      orders.forEach((order) => {
         if (order.status in counts) {
            counts[order.status] += 1;
         }
      });
      return counts;
   }, [orders]);
};

const useTotalCBM = (orders: productType[] | undefined): number => {
   return useMemo(() => {
      if (!orders?.length) return 0;

      return orders.reduce((total, order) => {
         const cbm = parseFloat(order.packageCBM || "0");
         return total + (isNaN(cbm) ? 0 : cbm);
      }, 0);
   }, [orders]);
};

const useTotalPrice = (orders: productType[] | undefined): number => {
   return useMemo(() => {
      if (!orders?.length) return 0;
      return orders.reduce((total, order) => {
         const price = parseFloat(
            order.priceTotal !== undefined ? order.priceTotal.toString() : "0"
         );
         return total + (isNaN(price) ? 0 : price);
      }, 0);
   }, [orders]);
};

// Format last N shipments
const getLastShipments = (orders: string | any[] | undefined, n = 3) => {
   if (!orders?.length) return [];
   return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, n);
};

export default function ClientDetails({ route }: RootStackScreenProps<"ClientDetails">) {
   const id = route.params.id;
   const { data: user } = useGetUser(id);
   const { data: orders, isLoading, isError, refetch } = useGetOrderOfUserById(id);

   const statusCounts = useOrderStatusCounts(orders);
   const totalShipments = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
   const lastShipments = getLastShipments(orders);
   const hasChartData = totalShipments > 0;
   const totalCBM = useTotalCBM(orders);
   const totalPrice = useTotalPrice(orders);

   const chartData = STATUS_LABELS.map((status) => ({
      value: statusCounts[status],
      label: STATUS_CONFIG[status]?.label || status,
      frontColor: STATUS_CONFIG[status]?.color || COLORS.muted,
      spacing: 20,
   }));

   console.log("Orders Data:", orders);

   // Loading State
   if (isLoading) {
      return (
         <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
         </View>
      );
   }

   // Error State
   if (isError) {
      return (
         <View style={styles.centeredContainer}>
            <Ionicons name="alert-circle" size={64} color={COLORS.warning} />
            <Text style={styles.errorText}>Failed to load order data</Text>
            <Pressable onPress={refetch} style={styles.retryButton}>
               <Text style={styles.retryText}>Retry</Text>
            </Pressable>
         </View>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
         >
            {/* Header */}
            <View style={styles.header}>
               <Text style={styles.headerTitle}>Order Details</Text>
               <Text style={styles.headerSubtitle}>{totalShipments} total shipments</Text>
            </View>

            {/* User Profile Card */}
            <View style={styles.profileCard}>
               <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                     <Ionicons name="person" size={32} color={COLORS.primary} />
                  </View>
               </View>
               <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{user?.firstName || "—"}</Text>
                  <Text style={styles.profileDetail}>{user?.phoneNumber || "No phone"}</Text>
                  <View style={styles.badge}>
                     <Text style={styles.badgeText}>{user?.role || "User"}</Text>
                  </View>
               </View>
            </View>

            {/* Stats Overview */}
            <View style={styles.statsGrid}>
               <StatItem
                  label="Total"
                  value={totalShipments.toString()}
                  color={COLORS.primary}
                  icon="analytics"
               />
               <StatItem
                  label="Chargé"
                  value={statusCounts.Active.toString()}
                  color={COLORS.warning}
                  icon="cube"
               />
               <StatItem
                  label="Transit"
                  value={statusCounts["In Transit"].toString()}
                  color={COLORS.info}
                  icon="airplane"
               />
               <StatItem
                  label="Nombre Total de CBM"
                  value={totalCBM.toFixed(2)}
                  color={COLORS.info}
                  icon="key"
               />

               <StatItem
                  label="Prix Total"
                  value={totalPrice.toFixed(0) + "FCFA"}
                  color={COLORS.success}
                  icon="pricetag"
               />
               <StatItem
                  label="Livré"
                  value={statusCounts.Inactive.toString()}
                  color={COLORS.success}
                  icon="checkmark-circle"
               />
            </View>

            {/* Chart Section */}
            {hasChartData ? (
               <View style={styles.chartContainer}>
                  <Text style={styles.chartTitle}>Shipment Status Distribution</Text>
                  <BarChart
                     data={chartData}
                     width={SCREEN_WIDTH - 48}
                     height={200}
                     barWidth={30}
                     barBorderRadius={8}
                     yAxisLabelWidth={0}
                     xAxisLabelTextStyle={{ color: COLORS.text, fontSize: 12, fontWeight: "600" }}
                     noOfSections={4}
                     showLine
                     showYAxisIndices={false}
                     spacing={35}
                     initialSpacing={20}
                     maxValue={Math.max(...Object.values(statusCounts), 1) + 1}
                  />
               </View>
            ) : (
               <View style={styles.emptyState}>
                  <Ionicons name="document-text" size={48} color={COLORS.muted} />
                  <Text style={styles.emptyText}>No shipment data available</Text>
               </View>
            )}

            {/* Recent Orders */}
            <View style={styles.recentOrders}>
               <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent Orders</Text>
                  <Text style={styles.viewAll}>View all</Text>
               </View>

               {lastShipments.length > 0 ? (
                  lastShipments.map((order) => (
                     <OrderItem
                        key={order.code}
                        order={order}
                        statusConfig={STATUS_CONFIG[order.status]}
                     />
                  ))
               ) : (
                  <Text style={styles.noOrdersText}>No recent orders de</Text>
               )}
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

// Statistic Item Component
const StatItem = ({ label, value, color, icon }) => (
   <View style={styles.statCard}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
         <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
   </View>
);

// Order Item Component
const OrderItem = ({ order, statusConfig }) => (
   <View style={styles.orderItem}>
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
      <View style={[styles.statusPill]}>
         <Ionicons size={14} style={styles.statusIcon} />
         <Text style={[styles.statusText]}>{statusConfig?.label}</Text>
      </View>
   </View>
);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.light,
   },
   scrollContainer: {
      padding: 24,
      paddingBottom: 40,
   },
   centeredContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
   },
   header: {
      marginBottom: 24,
   },
   headerTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: COLORS.dark,
      marginBottom: 4,
   },
   headerSubtitle: {
      fontSize: 16,
      color: COLORS.muted,
      fontWeight: "500",
   },
   profileCard: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 5,
   },
   avatarContainer: {
      marginRight: 16,
   },
   avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: `${COLORS.primary}10`,
      justifyContent: "center",
      alignItems: "center",
   },
   profileInfo: {
      flex: 1,
   },
   profileName: {
      fontSize: 20,
      fontWeight: "700",
      color: COLORS.dark,
      marginBottom: 4,
   },
   profileDetail: {
      fontSize: 15,
      color: COLORS.muted,
      marginBottom: 8,
   },
   badge: {
      backgroundColor: `${COLORS.primary}15`,
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
   },
   badgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: COLORS.primary,
   },
   statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 24,
   },
   statCard: {
      width: "48%",
      backgroundColor: COLORS.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
   },
   iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
   },
   statValue: {
      fontSize: 24,
      fontWeight: "800",
      color: COLORS.dark,
      marginBottom: 4,
   },
   statLabel: {
      fontSize: 14,
      color: COLORS.muted,
      fontWeight: "600",
   },
   chartContainer: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 5,
   },
   chartTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: COLORS.dark,
      marginBottom: 16,
      textAlign: "center",
   },
   emptyState: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      padding: 40,
      marginBottom: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 5,
   },
   emptyText: {
      fontSize: 16,
      color: COLORS.muted,
      marginTop: 16,
      textAlign: "center",
   },
   recentOrders: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 5,
   },
   sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
   },
   sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: COLORS.dark,
   },
   viewAll: {
      fontSize: 14,
      color: COLORS.primary,
      fontWeight: "600",
   },
   orderItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
   },
   orderItemLast: {
      borderBottomWidth: 0,
   },
   orderInfo: {},
   orderId: {
      fontSize: 16,
      fontWeight: "700",
      color: COLORS.dark,
   },
   orderDate: {
      fontSize: 13,
      color: COLORS.muted,
      marginTop: 2,
   },
   statusPill: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
   },
   statusIcon: {
      marginRight: 6,
   },
   statusText: {
      fontSize: 13,
      fontWeight: "600",
   },
   noOrdersText: {
      fontSize: 15,
      color: COLORS.muted,
      textAlign: "center",
      paddingVertical: 20,
   },
   errorText: {
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.warning,
      textAlign: "center",
      marginBottom: 24,
   },
   retryButton: {
      backgroundColor: `${COLORS.warning}20`,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
   },
   retryText: {
      fontSize: 16,
      fontWeight: "600",
      color: COLORS.warning,
   },
});
