import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useOrderDetailScreen } from "../../hooks/useOrderDetailScreen";
import { OrderDetailLoading } from "../../components/OrderDetailLoading";
import { OrderDetailError } from "../../components/OrderDetailError";
import { OrderHeader } from "./components/OrderHeader";
import { OrderImageSection } from "./components/OrderImageSection";
import { OrderQuickStats } from "./components/OrderQuickStats";
import { OrderTimeline } from "./components/OrderTimeline";
import { OrderInfoCard } from "./components/OrderInfoCard";
import { OrderShippingCard } from "./components/OrderShippingCard";
import { OrderPaymentCard } from "./components/OrderPaymentCard";

const OrderDetailScreen = ({
   route,
   navigation,
}: RootStackScreenProps<"OrderDetail">) => {
   const { id } = route.params;
   const {
      order,
      isPending,
      isError,
      error,
      refetch,
      handleShare,
      handleCopyCode,
      colors,
      styles,
   } = useOrderDetailScreen(id);

   if (isPending) {
      return <OrderDetailLoading navigation={navigation} />;
   }

   if (isError || !order) {
      return (
         <OrderDetailError
            error={error}
            onRetry={refetch}
            navigation={navigation}
         />
      );
   }

   return (
      <SafeAreaView
         style={[styles.container, { backgroundColor: colors.background.default }]}
      >
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
            <OrderHeader order={order} />

            <OrderImageSection images={order.images} goodsIds={order.goodsIds} />

            <OrderQuickStats order={order} />

            <OrderTimeline
               status={order.status}
               currentStatus={order.currentStatus}
            />

            <OrderInfoCard order={order} onCopyCode={handleCopyCode} />

            <OrderShippingCard order={order} />

            <OrderPaymentCard order={order} />
         </ScrollView>
      </SafeAreaView>
   );
};

export default OrderDetailScreen;
