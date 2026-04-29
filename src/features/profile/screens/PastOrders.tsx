import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PastOrderCardSkeleton } from "@src/features/customer/orders/components/PastOrderCardSkeleton";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { usePastOrders } from "../hooks/usePastOrders";
import {
  PastOrdersHeader,
  PastOrdersFilter,
  PastOrdersCount,
  PastOrdersEmptyState,
  PastOrdersList,
} from "../components";
import { createStyles } from "./PastOrders.styles";

const PastOrders: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    shippingMode,
    setShippingMode,
    orders,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
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
      <PastOrdersHeader />
      <PastOrdersFilter mode={shippingMode} onChange={setShippingMode} />
      <PastOrdersCount count={orders.length} />
      {orders.length === 0 ? (
        <PastOrdersEmptyState shippingMode={shippingMode} />
      ) : (
        <PastOrdersList
          orders={orders}
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )}
    </SafeAreaView>
  );
};

export default PastOrders;
