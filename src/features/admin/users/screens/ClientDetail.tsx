import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RootStackScreenProps } from "@src/navigations/type";
import { useGetUser } from "@src/shared/hooks/useGetUser";
import { useGetOrderOfUserById } from '@src/shared/hooks/useOrders';

import { useOrderStats, useLastShipments } from "../hooks/useOrderStats";
import { useChartData } from "../hooks/useOrderStats";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { ClientDetailHeader } from "../components/ClientDetailHeader";
import { ProfileCard } from "../components/ProfileCard";
import { StatGrid } from "../components/StatGrid";
import { StatusChart } from "../components/StatusChart";
import { RecentOrders } from "../components/RecentOrders";
import { useAppTheme } from "@src/providers/ThemeProvider";

export default function ClientDetail({ route }: RootStackScreenProps<"ClientDetails">) {
  const { colors } = useAppTheme();
  const { id } = route.params;
  const { data: user } = useGetUser(id);
  const { data: orders, isLoading, isError, refetch } = useGetOrderOfUserById(id);

  const { counts, total, totalCBM, totalPrice } = useOrderStats(orders);
  const chartData = useChartData(counts);
  const lastShipments = useLastShipments(orders);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ClientDetailHeader totalShipments={total} />
        
        <ProfileCard
          firstName={user?.firstName}
          lastName={user?.lastName}
          phoneNumber={user?.phoneNumber}
          role={user?.role}
        />

        <StatGrid
          total={total}
          active={counts.Active}
          inTransit={counts["In Transit"]}
          delivered={counts.Inactive}
          totalCBM={totalCBM}
          totalPrice={totalPrice}
        />

        <StatusChart data={chartData} hasData={total > 0} />
        <RecentOrders orders={lastShipments} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
});
