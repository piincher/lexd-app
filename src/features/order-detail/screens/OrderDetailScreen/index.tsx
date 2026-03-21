import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Share } from "react-native";
import { Text, Appbar, ActivityIndicator, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "@src/navigations/type";
import { COLORS } from "@src/constants/Colors";
import { useGetOrderDetails } from "../../hooks/useOrderDetail";
import { useClipboard } from "@src/hooks/useClipBoard";
import {
   OrderHeader,
   OrderImageSection,
   OrderQuickStats,
   OrderInfoCard,
   OrderShippingCard,
   OrderPaymentCard,
   OrderTimeline,
} from "./components";

const OrderDetailScreen = ({
   route,
   navigation,
}: RootStackScreenProps<"OrderDetail">) => {
   const { id } = route.params;
   const { data: order, isPending, isError, error, refetch } = useGetOrderDetails(id);
   const { copyToClipboard } = useClipboard();

   const handleShare = useCallback(async () => {
      if (!order) return;
      try {
         await Share.share({
            message: `Commande ${order.code}\nStatut: ${order.status}\nClient: ${order.clientName}`,
            title: `Commande ${order.code}`,
         });
      } catch {}
   }, [order]);

   const handleCopyCode = useCallback(() => {
      if (order?.code) copyToClipboard(order.code);
   }, [order, copyToClipboard]);

   const handleChat = useCallback(() => {
      navigation.navigate("SelectAdminToChatWith" as never);
   }, [navigation]);

   // -- Loading --
   if (isPending) {
      return (
         <SafeAreaView style={styles.container}>
            <Appbar.Header>
               <Appbar.BackAction onPress={() => navigation.goBack()} />
               <Appbar.Content title="Détails" />
            </Appbar.Header>
            <View style={styles.center}>
               <ActivityIndicator size="large" color={COLORS.green} />
               <Text style={styles.loadingText}>Chargement...</Text>
            </View>
         </SafeAreaView>
      );
   }

   // -- Error --
   if (isError || !order) {
      return (
         <SafeAreaView style={styles.container}>
            <Appbar.Header>
               <Appbar.BackAction onPress={() => navigation.goBack()} />
               <Appbar.Content title="Détails" />
            </Appbar.Header>
            <View style={styles.center}>
               <MaterialCommunityIcons name="alert-circle" size={56} color={COLORS.danger} />
               <Text style={styles.errorTitle}>Erreur de chargement</Text>
               <Text style={styles.errorText}>
                  {(error as any)?.message ||
                     "Impossible de charger les détails de cette commande."}
               </Text>
               <Button mode="contained" onPress={() => refetch()} style={styles.retryBtn}>
                  Réessayer
               </Button>
            </View>
         </SafeAreaView>
      );
   }

   // -- Content --
   return (
      <SafeAreaView style={styles.container}>
         <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
               title={order.code || "Commande"}
               titleStyle={styles.appbarTitle}
            />
            <Appbar.Action icon="share-variant" onPress={handleShare} />
            <Appbar.Action icon="chat" onPress={handleChat} />
         </Appbar.Header>

         <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
         >
            {/* Status + Shipping mode badges */}
            <OrderHeader order={order} />

            {/* Product photo */}
            <OrderImageSection images={order.images} />

            {/* Quick stats: Quantity, Weight, CBM */}
            <OrderQuickStats order={order} />

            {/* Status timeline */}
            <OrderTimeline
               status={order.status}
               currentStatus={order.currentStatus}
            />

            {/* Order info: client, code, category, transporter */}
            <OrderInfoCard order={order} onCopyCode={handleCopyCode} />

            {/* Shipping details: origin, destination, dates */}
            <OrderShippingCard order={order} />

            {/* Payment details */}
            <OrderPaymentCard order={order} />
         </ScrollView>
      </SafeAreaView>
   );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F9FAFB",
   },
   scrollContent: {
      paddingBottom: 40,
   },
   center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
   },
   loadingText: {
      marginTop: 12,
      fontSize: 14,
      color: "#6B7280",
   },
   errorTitle: {
      marginTop: 16,
      fontSize: 18,
      fontWeight: "700",
      color: "#1F2937",
   },
   errorText: {
      marginTop: 8,
      fontSize: 14,
      color: "#6B7280",
      textAlign: "center",
   },
   retryBtn: {
      marginTop: 20,
      backgroundColor: COLORS.green,
   },
   appbarTitle: {
      fontSize: 16,
      fontWeight: "700",
   },
});
