import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PastOrderCardSkeleton } from "@src/shared/ui/PastOrderCardSkeleton";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { usePastOrders } from "../hooks/usePastOrders";
import {
  PastOrdersHeader,
  PastOrdersFilter,
  PastOrdersCount,
  PastOrdersEmptyState,
  PastOrdersList,
  PastOrdersSummary,
} from "../components";
import { createStyles } from "./PastOrders.styles";

const PastOrders: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    shippingMode,
    setShippingMode,
    searchQuery,
    setSearchQuery,
    orders,
    visibleOrders,
    summary,
    isLoading,
    isRefetching,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
    handleOrderPress,
  } = usePastOrders();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <PastOrdersHeader />
        <PastOrderCardSkeleton count={5} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PastOrdersHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <View style={styles.content}>
        <PastOrdersSummary summary={summary} />
        <PastOrdersFilter mode={shippingMode} onChange={setShippingMode} />
        <PastOrdersCount count={visibleOrders.length} totalCount={orders.length} />
      </View>
      {orders.length === 0 || visibleOrders.length === 0 ? (
        <ScrollView
          contentContainerStyle={styles.emptyScrollContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={colors.primary.main}
              colors={[colors.primary.main]}
            />
          }
        >
          <PastOrdersEmptyState
            shippingMode={shippingMode}
            hasSearch={searchQuery.trim().length > 0}
          />
        </ScrollView>
      ) : (
        <PastOrdersList
          orders={visibleOrders}
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          isRefreshing={isRefetching}
          onRefresh={refetch}
          onOrderPress={handleOrderPress}
        />
      )}
    </SafeAreaView>
  );
};

export default PastOrders;
