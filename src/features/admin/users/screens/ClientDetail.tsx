import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useClientDetail } from "../hooks/useClientDetail";
import { ClientDetailParallaxHeader } from "../components/ClientDetailParallaxHeader";
import { QuickActionBar } from "../components/QuickActionBar";
import { ContactInfoCard } from "../components/ContactInfoCard";
import { OrderStatusDonut } from "../components/OrderStatusDonut";
import { MonthlyTrendChart } from "../components/MonthlyTrendChart";
import { FinancialSummaryCard } from "../components/FinancialSummaryCard";
import { ActivityHeatmap } from "../components/ActivityHeatmap";
import { OrderTimeline } from "../components/OrderTimeline";
import { OrderList } from "../components/OrderList";
import { ClientTicketsSection } from "../components/ClientTicketsSection";
import { ClientPaymentsSection } from "../components/ClientPaymentsSection";
import { ClientCertificatesSection } from "../components/ClientCertificatesSection";
import { ClientContainersSection } from "../components/ClientContainersSection";
import { AccountHealthCard } from "../components/AccountHealthCard";
import { BalanceRewardsCard } from "../components/BalanceRewardsCard";
import { PaymentBreakdown } from "../components/PaymentBreakdown";
import { AdminNotes } from "../components/AdminNotes";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";

const HEADER_HEIGHT = 280;

export default function ClientDetail({ route, navigation }: RootStackScreenProps<"ClientDetails">) {
  const { id } = route.params;
  const { colors } = useAppTheme();
  const scrollY = useSharedValue(0);
  const { user, orders, isLoading, isError, refetch, stats, donutData, handleBlock, handleEdit } = useClientDetail(id);

  const scrollHandler = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;

  const avgOrderValue = stats.total > 0 ? stats.totalPrice / stats.total : 0;
  const openShippingMark = () => {
    const query = user?.shippingClientId || user?.phoneNumber;
    if (query) navigation.navigate('ShippingMarksAdmin', { q: query });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={["top"]}>
      <ClientDetailParallaxHeader user={user} scrollY={scrollY} />
      <Animated.ScrollView contentContainerStyle={{ paddingTop: HEADER_HEIGHT, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false} onScroll={scrollHandler} scrollEventThrottle={16}>
        <QuickActionBar user={user} onBlock={handleBlock} onEdit={handleEdit} onShippingMark={openShippingMark} />
        <AccountHealthCard user={user} />
        <BalanceRewardsCard user={user} />
        <ContactInfoCard user={user} />
        <FinancialSummaryCard totalRevenue={stats.totalPrice} totalCBM={stats.totalCBM}
          orderCount={stats.total} avgOrderValue={avgOrderValue} />
        <OrderStatusDonut data={donutData} total={stats.total} />
        <PaymentBreakdown orders={orders} />
        <MonthlyTrendChart orders={orders} />
        <ActivityHeatmap orders={orders} />
        <OrderTimeline orders={orders} />
        <OrderList orders={orders} userId={id} />
        <ClientTicketsSection userId={id} />
        <ClientPaymentsSection userId={id} />
        <ClientCertificatesSection userId={id} />
        <ClientContainersSection userId={id} />
        <AdminNotes userId={id} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
