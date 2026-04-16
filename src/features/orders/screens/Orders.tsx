import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { HomeTabScreenProps } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import { useShippingMode } from "@src/store/shippingMode";
import React, { useCallback, useMemo, useState } from "react";
import {
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   View,
   ActivityIndicator,
   RefreshControl,
} from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { withProtectedRoute } from "@src/features/auth";
import { useAppTheme } from "@src/providers";
import { useGetOrderOfUserById } from "@src/shared/hooks";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { productType } from "@src/api/order";
import { OrderListCard, OrderStatusFilter } from "../components";
import { OrderListSkeleton } from "../components/OrderListSkeleton";

// -- Constants --

type MenuItemType = { id: string; title: string; route: any; param?: string };

const ADMIN_MENU: MenuItemType[] = [
   { id: "0", title: "Ajouter une commande", route: "SelectUser" },
   { id: "1", title: "Voir les commandes", route: "SelectShippingMethod" },
   { id: "2", title: "Ajouter un utilisateur", route: "UserAdd" },
   { id: "3", title: "Batch Update", route: "BatchUpdate" },
   { id: "4", title: "Marquer comme livré", route: "ScanQRCode" },
   { id: "5", title: "Les colis recupérés", route: "AdminPastOrders" },
   { id: "6", title: "Chercher des colis d'un client", route: "SearchOrder" },
   { id: "7", title: "Liste des utilisateurs", route: "UserList" },
];

const MANAGER_MENU: MenuItemType[] = [
   { id: "4", title: "Marquer comme livré", route: "ScanQRCode" },
];

const STATUS_FILTERS = [
   { key: "all", label: "Tous" },
   { key: "Inactive", label: "En attente" },
   { key: "Active", label: "En cours" },
   { key: "In Transit", label: "En transit" },
   { key: "Delivered", label: "Livré" },
];

// ============================================
// AdminMenu — admin / manager navigation hub
// ============================================

const AdminMenu: React.FC<{ navigation: any; items: MenuItemType[] }> = ({
   navigation,
   items,
}) => {
   const { setType } = useShippingMode((state) => state);
   const { colors } = useAppTheme();

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
         <ScrollView>
            {items.map((item) => (
               <Pressable
                  key={item.id}
                  style={[styles.adminItem, { borderColor: colors.primary.main }]}
                  onPress={() => {
                     if (item.param) setType(item.param as "air" | "sea");
                     navigation.navigate(item.route, { param: item.param });
                  }}
               >
                  <Text style={[styles.adminItemText, { color: colors.text.primary }]}>{item.title}</Text>
                  <MaterialIcons name="navigate-next" size={24} color={colors.primary.main} />
               </Pressable>
            ))}
         </ScrollView>
      </SafeAreaView>
   );
};

// ============================================
// CustomerOrders — customer order list
// ============================================

const CustomerOrders: React.FC = () => {
   const { colors } = useAppTheme();
   const navigation = useNavigation();
   const userId = useAuth((state) => state.user._id);
   const { data: orders, isLoading, refetch } = useGetOrderOfUserById(userId);
   const [statusFilter, setStatusFilter] = useState("all");
   const [refreshing, setRefreshing] = useState(false);

   // Refetch on screen focus
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

   // Sort by latest update, filter by status
   const filteredOrders = useMemo(() => {
      if (!orders || !Array.isArray(orders)) return [];
      const sorted = [...orders].sort((a, b) => {
         const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
         const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
         return dateB - dateA;
      });
      if (statusFilter === "all") return sorted;
      return sorted.filter((o) => o.status === statusFilter);
   }, [orders, statusFilter]);

   // Compute counts for filter badges
   const statusCounts = useMemo(() => {
      if (!orders || !Array.isArray(orders))
         return { all: 0, Inactive: 0, Active: 0, "In Transit": 0, Delivered: 0 };
      return {
         all: orders.length,
         Inactive: orders.filter((o) => o.status === "Inactive").length,
         Active: orders.filter((o) => o.status === "Active").length,
         "In Transit": orders.filter((o) => o.status === "In Transit").length,
         Delivered: orders.filter((o) => o.status === "Delivered").length,
      };
   }, [orders]);

   const handleOrderPress = useCallback(
      (order: productType) => {
         (navigation as any).navigate("OrderDetail", { id: order._id });
      },
      [navigation]
   );

   const renderItem: ListRenderItem<productType> = useCallback(
      ({ item }) => (
         <OrderListCard order={item} onPress={() => handleOrderPress(item)} />
      ),
      [handleOrderPress]
   );

   const keyExtractor = useCallback((item: productType) => item._id!, []);

   return (
      <SafeAreaView
         style={[styles.container, { backgroundColor: colors.background.default }]}
         edges={["top"]}
      >
         {/* Header */}
         <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
               Mes Commandes
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
               {statusCounts[statusFilter as keyof typeof statusCounts] ?? 0} commande
               {(statusCounts[statusFilter as keyof typeof statusCounts] ?? 0) !== 1
                  ? "s"
                  : ""}
            </Text>
         </View>

         {/* Status filter */}
         <OrderStatusFilter
            filters={STATUS_FILTERS}
            activeFilter={statusFilter}
            counts={statusCounts}
            onSelect={setStatusFilter}
         />

         {/* Orders list */}
         {isLoading ? (
            <OrderListSkeleton />
         ) : (
            <View style={styles.listWrapper}>
               <FlashList
                  data={filteredOrders}
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                  estimatedItemSize={90}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                  refreshControl={
                     <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.primary.main}
                     />
                  }
                  ListEmptyComponent={
                     <View style={styles.emptyContainer}>
                        <Feather name="inbox" size={48} color={colors.text.disabled} />
                        <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
                           Aucune commande
                        </Text>
                        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                           {statusFilter !== "all"
                              ? `Vous n'avez pas de commande "${STATUS_FILTERS.find(
                                   (f) => f.key === statusFilter
                                )?.label.toLowerCase()}"`
                              : "Vos commandes apparaîtront ici"}
                        </Text>
                     </View>
                  }
               />
            </View>
         )}
      </SafeAreaView>
   );
};

// ============================================
// Orders — main screen (role-based routing)
// ============================================

const Orders = ({ navigation }: HomeTabScreenProps<"Orders">) => {
   const { role } = useAuth((state) => state.user);

   if (role === "admin") return <AdminMenu navigation={navigation} items={ADMIN_MENU} />;
   if (role === "manager") return <AdminMenu navigation={navigation} items={MANAGER_MENU} />;
   return <CustomerOrders />;
};

export default withProtectedRoute(Orders);

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 14,
   },
   headerTitle: {
      fontSize: 22,
      fontWeight: "700",
   },
   headerSubtitle: {
      fontSize: 13,
      marginTop: 2,
   },
   listWrapper: {
      flex: 1,
   },
   listContent: {
      paddingHorizontal: 16,
      paddingBottom: 100,
   },
   loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   emptyContainer: {
      paddingTop: 80,
      alignItems: "center",
      gap: 8,
   },
   emptyTitle: {
      fontSize: 17,
      fontWeight: "600",
   },
   emptyText: {
      fontSize: 14,
      textAlign: "center",
      paddingHorizontal: 40,
   },
   // Admin menu
   adminItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 0.2,
      padding: 12,
      margin: 20,
   },
   adminItemText: {
      fontFamily: Fonts.meduim,
   },
});
