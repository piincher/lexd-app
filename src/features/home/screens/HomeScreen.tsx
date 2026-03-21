import React, { useCallback, useMemo, useState } from "react";
import { View, Text, ScrollView, RefreshControl, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAppTheme } from "@src/providers";
import { useAuth } from "@src/store/Auth";
import { useGetOrderOfUserById } from "../hooks/useGetActiveOrders";
import { GreetingHeader } from "../components/GreetingHeader";
import { ActiveShipmentCard } from "../components/ActiveShipmentCard";
import { ShipmentSummary } from "../components/ShipmentSummary";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useHomeScreen } from "../hooks/useHomeScreen";

const HomeScreen: React.FC = () => {
   const navigation = useNavigation();
   const { colors } = useAppTheme();
   const userId = useAuth((state) => state.user._id);
   const { data: orders, isLoading, refetch, isRefetching } = useGetOrderOfUserById(userId);
   const { whatsappStyle } = useHomeScreen();
   const [refreshing, setRefreshing] = useState(false);

   // Refetch when screen comes into focus
   useFocusEffect(
      useCallback(() => {
         refetch();
      }, [refetch])
   );

   const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
   }, [refetch]);

   const stats = useMemo(() => {
      if (!orders || !Array.isArray(orders)) {
         return { total: 0, warehouse: 0, transit: 0, delivered: 0 };
      }
      return {
         total: orders.length,
         warehouse: orders.filter((o) => o.status === "Active").length,
         transit: orders.filter((o) => o.status === "In Transit").length,
         delivered: orders.filter((o) => o.status === "Delivered").length,
      };
   }, [orders]);

   // Get the latest updated non-delivered order for the active shipment card
   const activeOrder = useMemo(() => {
      if (!orders || !Array.isArray(orders)) return null;
      const sorted = [...orders].sort((a, b) => {
         const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
         const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
         return dateB - dateA;
      });
      const active = sorted.filter((o) => o.status !== "Delivered");
      if (active.length > 0) return active[0];
      return sorted[0] || null;
   }, [orders]);

   return (
      <SafeAreaView
         style={[
            styles.container,
            { backgroundColor: colors.background.default },
         ]}
         edges={["top"]}
      >
         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.primary.main]}
                  tintColor={colors.primary.main}
               />
            }
         >
            {/* Greeting */}
            <GreetingHeader />

            {/* Active Shipment Section */}
            <View style={styles.section}>
               <View style={styles.sectionHeader}>
                  <Text
                     style={[
                        styles.sectionTitle,
                        { color: colors.text.primary },
                     ]}
                  >
                     Expédition en cours
                  </Text>
                  <Pressable
                     onPress={() => navigation.navigate("Orders" as never)}
                     style={styles.viewAllBtn}
                  >
                     <Text
                        style={[
                           styles.viewAllText,
                           { color: colors.text.secondary },
                        ]}
                     >
                        Voir tout
                     </Text>
                  </Pressable>
               </View>

               {isLoading ? (
                  <View style={styles.loadingContainer}>
                     <ActivityIndicator
                        size="small"
                        color={colors.primary.main}
                     />
                  </View>
               ) : activeOrder ? (
                  <ActiveShipmentCard
                     order={activeOrder}
                     onPress={() =>
                        (navigation as any).navigate("OrderDetail", {
                           id: activeOrder._id,
                        })
                     }
                  />
               ) : (
                  <View
                     style={[
                        styles.emptyCard,
                        {
                           backgroundColor: colors.background.card,
                           borderColor: colors.border,
                        },
                     ]}
                  >
                     <Feather
                        name="package"
                        size={32}
                        color={colors.text.disabled}
                     />
                     <Text
                        style={[
                           styles.emptyText,
                           { color: colors.text.secondary },
                        ]}
                     >
                        Aucune expédition en cours
                     </Text>
                  </View>
               )}
            </View>

            {/* Summary Section */}
            <ShipmentSummary
               stats={stats}
               onViewAll={() => navigation.navigate("Orders" as never)}
            />
         </ScrollView>

         <WhatsAppButton animatedStyle={whatsappStyle} />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   scrollContent: {
      paddingBottom: 100,
   },
   section: {
      marginTop: 16,
   },
   sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginBottom: 14,
   },
   sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
   },
   viewAllBtn: {
      flexDirection: "row",
      alignItems: "center",
   },
   viewAllText: {
      fontSize: 14,
      fontWeight: "500",
   },
   loadingContainer: {
      padding: 40,
      alignItems: "center",
   },
   emptyCard: {
      marginHorizontal: 20,
      borderRadius: 16,
      borderWidth: 1,
      padding: 32,
      alignItems: "center",
      gap: 10,
   },
   emptyText: {
      fontSize: 14,
   },
});

export default HomeScreen;
