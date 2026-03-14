// UserDetailScreen.tsx
import React from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, Pressable } from "react-native";
import { ActivityIndicator, Avatar, Card, useTheme } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { HomeTabScreenProps, RootStackScreenProps } from "@src/navigations/type";
import { useGetOrderOfUserById } from "@src/shared/hooks";
import { useGetUser } from "@src/hooks/useGetUser";
import { Fonts } from "@src/constants/Fonts";
import { COLORS } from "@src/constants/Colors";
import { useGetCurrentUser } from "@src/shared/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import withProtectedRoute from "@src/hoc/protected";
import { productType } from "@src/api/order";

// Define types for clarity and safety
interface Order {
   id: string;
   status: "Active" | "In Transit" | "Delivered" | "Inactive" | string;
   createdAt: string;
}

interface User {
   id: string;
   firstName: string;
   phoneNumber?: string;
   role?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Status mapping with consistent keys
const STATUS_LABELS = ["Active", "In Transit", "Delivered"] as const;
type StatusKey = (typeof STATUS_LABELS)[number];

const INITIAL_COUNTS = {
   Active: 0,
   "In Transit": 0,
   Delivered: 0,
};

// Transform orders into status counts
const useOrderStatusCounts = (orders: productType[] | undefined): Record<StatusKey, number> => {
   if (!orders?.length) return INITIAL_COUNTS;

   const counts = { ...INITIAL_COUNTS };
   orders.forEach((order) => {
      if (order.status in counts) {
         counts[order.status as StatusKey] += 1;
      }
   });
   return counts;
};

// Format last N shipments
const getLastShipments = (orders: Order[] | undefined, n = 3): Order[] => {
   if (!orders?.length) return [];
   return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, n);
};

const Stats = ({ navigation }: HomeTabScreenProps<"Stats">) => {
   const { data: user } = useGetCurrentUser();
   const {
      data: orders,
      isLoading: isLoadingOrders,
      isError: isOrderError,
      refetch: refetchOrders,
   } = useGetOrderOfUserById(user?._id);

   const isLoading = isLoadingOrders;
   const isError = isOrderError;

   const statusCounts = useOrderStatusCounts(orders);
   const totalShipments = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
   const lastShipments = getLastShipments(orders);

   const hasChartData = totalShipments > 0;

   const chartData = STATUS_LABELS.map((status) => ({
      value: statusCounts[status],
      label: status,
      frontColor:
         status === "Active"
            ? COLORS.orange
            : status === "In Transit"
            ? COLORS.green
            : COLORS.redShade,
   }));

   // Loading State
   if (isLoading) {
      return (
         <View style={[styles.centeredContainer, { backgroundColor: COLORS.white }]}>
            <ActivityIndicator size="large" color={COLORS.blue} />
         </View>
      );
   }

   // Error State
   if (isError) {
      return (
         <View style={[styles.centeredContainer, { backgroundColor: COLORS.white }]}>
            <Text style={[styles.errorText, { color: COLORS.redShade }]}>
               Failed to load user data.
            </Text>
            <Pressable onPress={() => refetchOrders()} style={styles.retryButton}>
               <Text style={[styles.retryText, { color: COLORS.redShade }]}>Try Again</Text>
            </Pressable>
         </View>
      );
   }

   return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
         <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
         >
            {/* User Info Card */}
            <Card style={[styles.userCard, { backgroundColor: COLORS.surface }]}>
               <View style={styles.userCardContent}>
                  <Avatar.Image
                     size={72}
                     source={{
                        uri: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ChinaLink%20Express%20(1024%20x%201024%20px)%20(1).png",
                     }}
                  />
                  <View style={styles.userInfo}>
                     <Text style={[styles.userName, { color: COLORS.DarkGrey }]} numberOfLines={1}>
                        {user?.firstName || "—"}
                     </Text>
                     <Text style={[styles.userDetail, { color: COLORS.DarkGrey }]}>
                        {user?.phoneNumber || "No phone"}
                     </Text>
                     <Text style={[styles.userDetail, { color: COLORS.DarkGrey }]}>
                        {user?.role || "User"}
                     </Text>
                  </View>
               </View>
            </Card>

            {/* Quick Stats */}
            <Card style={[styles.statsCard, { backgroundColor: COLORS.Silver }]}>
               <Text style={[styles.sectionTitle, { color: COLORS.black }]}>Statistiques</Text>
               <View style={styles.statsRow}>
                  <StatCard
                     label="Total des expéditions"
                     value={totalShipments.toString()}
                     color={COLORS.blue}
                  />
                  <StatCard
                     label="Chargé"
                     value={statusCounts.Active.toString()}
                     color={COLORS.orange}
                  />
                  <StatCard
                     label="In Transit"
                     value={statusCounts["In Transit"].toString()}
                     color={COLORS.green}
                  />
                  <StatCard
                     label="Livré"
                     value={statusCounts.Delivered.toString()}
                     color={COLORS.redShade}
                  />
               </View>
            </Card>

            {/* Bar Chart */}
            {hasChartData ? (
               <Card style={[styles.chartCard, { backgroundColor: COLORS.white }]}>
                  <Text style={[styles.sectionTitle, { color: COLORS.black }]}>
                     Aperçu de l'état des expéditions
                  </Text>
                  <BarChart
                     data={chartData}
                     width={SCREEN_WIDTH - 32}
                     height={220}
                     barWidth={32}
                     barBorderRadius={6}
                     yAxisLabelWidth={40}
                     xAxisLabelTextStyle={{ color: COLORS.blue, fontSize: 12 }}
                     noOfSections={4}
                     showLine
                     showYAxisIndices
                     showXAxisIndices
                     spacing={40}
                  />
               </Card>
            ) : (
               <Card style={[styles.emptyCard, { backgroundColor: COLORS.white }]}>
                  <Text style={[styles.emptyText, { color: COLORS.redShade }]}>
                     No shipment data available.
                  </Text>
               </Card>
            )}

            {/* Last 3 Shipments */}
            <Card style={[styles.recentCard, { backgroundColor: COLORS.white }]}>
               <Text style={[styles.sectionTitle, { color: COLORS.blue }]}>
                  Les expeditions recentes
               </Text>
               {lastShipments.length > 0 ? (
                  lastShipments.map((order) => (
                     <Pressable key={order.code} style={styles.shipmentRow}>
                        <View style={styles.shipmentInfo}>
                           <Text style={[styles.shipmentId, { color: COLORS.blue }]}>
                              #{order.code}
                           </Text>
                           <Text style={[styles.shipmentDate, { color: COLORS.black }]}>
                              {new Date(order.createdAt).toDateString()}
                           </Text>
                        </View>
                        <StatusBadge status={order.status} />
                     </Pressable>
                  ))
               ) : (
                  <Text style={[styles.emptyText, { color: COLORS.redShade, marginTop: 8 }]}>
                     Pas d'expeditions
                  </Text>
               )}
            </Card>
         </ScrollView>
      </SafeAreaView>
   );
};

// Reusable Stat Card
const StatCard =
   ({ label, value, color }: { label: string; value: string; color: string }) => (
      <View style={styles.statItem}>
         <Text style={[styles.statLabel, { color }]}>{label}</Text>
         <Text style={[styles.statValue, { color }]}>{value}</Text>
      </View>
   );

// Reusable Status Badge
const StatusBadge = ({ status }: { status: string }) => {
   let badgeColor = COLORS.placeHolder;
   let displayText = status;

   if (status === "Active") {
      badgeColor = COLORS.orange;
      displayText = "Chargé";
   } else if (status === "In Transit") {
      badgeColor = COLORS.green;
      displayText = "En Transit";
   } else if (status === "Delivered") {
      badgeColor = COLORS.redShade;
      displayText = "Livré";
   }

   return (
      <View style={[styles.statusBadge, { backgroundColor: badgeColor }]}>
         <Text style={styles.statusText}>{displayText}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   safeArea: {
      flex: 1,
   },
   scrollContainer: {
      padding: 16,
      paddingBottom: 32,
   },
   centeredContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   userCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
   },
   userCardContent: {
      flexDirection: "row",
      alignItems: "center",
   },
   userInfo: {
      marginLeft: 16,
      flex: 1,
   },
   userName: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      marginBottom: 4,
   },
   userDetail: {
      fontSize: 14,
      fontFamily: Fonts.regular,
   },
   statsCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
   },
   sectionTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      marginBottom: 12,
      textAlign: "center",
   },
   statsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
   },
   statItem: {
      width: "48%",
      marginBottom: 12,
      alignItems: "center",
   },
   statLabel: {
      fontSize: 12,
      fontFamily: Fonts.meduim,
      marginBottom: 4,
   },
   statValue: {
      fontSize: 20,
      fontFamily: Fonts.bold,
   },
   chartCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
   },
   emptyCard: {
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
      alignItems: "center",
      elevation: 2,
   },
   emptyText: {
      fontSize: 16,
      fontFamily: Fonts.regular,
      textAlign: "center",
   },
   recentCard: {
      borderRadius: 16,
      padding: 16,
      elevation: 2,
   },
   shipmentRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#00000010",
   },
   shipmentInfo: {},
   shipmentId: {
      fontSize: 16,
      fontFamily: Fonts.bold,
   },
   shipmentDate: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      marginTop: 2,
   },
   statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
   },
   statusText: {
      fontSize: 12,
      fontFamily: Fonts.meduim,
      color: "#fff",
   },
   errorText: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      textAlign: "center",
      marginBottom: 16,
   },
   retryButton: {
      padding: 8,
   },
   retryText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
   },
});

export default withProtectedRoute(Stats);
