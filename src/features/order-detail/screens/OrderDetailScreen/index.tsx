import React, { useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet, Share } from "react-native";
import { Text, Appbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useGetOrderDetails } from "../../hooks/useOrderDetail";
import { useClipboard } from "@src/hooks/useClipBoard";
import { useCreateShareToken } from "@src/features/public/hooks/useCreateShareToken";
import { OrderHeader } from "./components/OrderHeader";
import { OrderImageSection } from "./components/OrderImageSection";
import { OrderQuickStats } from "./components/OrderQuickStats";
import { OrderInfoCard } from "./components/OrderInfoCard";
import { OrderShippingCard } from "./components/OrderShippingCard";
import { OrderPaymentCard } from "./components/OrderPaymentCard";
import { OrderTimeline } from "./components/OrderTimeline";
import { OrderDetailSkeleton } from "./components/OrderDetailSkeleton";

const OrderDetailScreen = ({
   route,
   navigation,
}: RootStackScreenProps<"OrderDetail">) => {
   const { id } = route.params;
   const { colors } = useAppTheme();
   const { data: order, isPending, isError, error, refetch } = useGetOrderDetails(id);
   const { copyToClipboard } = useClipboard();
   const { mutateAsync: createShareToken } = useCreateShareToken();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               flex: 1,
               backgroundColor: colors.background.default,
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
               color: colors.text.secondary,
            },
            errorTitle: {
               marginTop: 16,
               fontSize: 18,
               fontWeight: "700",
               color: colors.text.primary,
            },
            errorText: {
               marginTop: 8,
               fontSize: 14,
               color: colors.text.secondary,
               textAlign: "center",
            },
            retryBtn: {
               marginTop: 20,
            },
            appbarTitle: {
               fontSize: 16,
               fontWeight: "700",
            },
         }),
      [colors]
   );

   const handleShare = useCallback(async () => {
      if (!order) return;
      try {
         const result = await createShareToken({
            type: 'order',
            resourceReference: order.code || id,
         });
         await Share.share({
            message: `Suivez ma commande ChinaLink Express: ${order.code}\n${result.url}`,
            title: `Commande ${order.code}`,
         });
      } catch {
         // Fallback to plain text share if API fails
         try {
            await Share.share({
               message: `Commande ${order.code}\nStatut: ${order.status}\nClient: ${order.clientName}`,
               title: `Commande ${order.code}`,
            });
         } catch {}
      }
   }, [order, id, createShareToken]);

   const handleCopyCode = useCallback(() => {
      if (order?.code) copyToClipboard(order.code);
   }, [order, copyToClipboard]);

   // -- Loading --
   if (isPending) {
      return (
         <SafeAreaView style={styles.container}>
            <Appbar.Header>
               <Appbar.BackAction onPress={() => navigation.goBack()} />
               <Appbar.Content title="Détails" />
            </Appbar.Header>
            <OrderDetailSkeleton />
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
               <MaterialCommunityIcons name="alert-circle" size={56} color={colors.status.error} />
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
         </Appbar.Header>

         <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
         >
            {/* Status + Shipping mode badges */}
            <OrderHeader order={order} />

            {/* Product photo — includes goods photos from linked goodsIds */}
            <OrderImageSection images={order.images} goodsIds={order.goodsIds} />

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
