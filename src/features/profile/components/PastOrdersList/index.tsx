import React, { useCallback, useRef } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native-paper";
import { productType } from "@src/shared/types/order";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { PastOrderHistoryCard } from "../PastOrderHistoryCard";
import { createStyles } from "./PastOrdersList.styles";

interface PastOrdersListProps {
  orders: productType[];
  loadMore: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onOrderPress: (order: productType) => void;
}

export const PastOrdersList: React.FC<PastOrdersListProps> = ({
  orders,
  loadMore,
  isFetchingNextPage,
  hasNextPage,
  isRefreshing,
  onRefresh,
  onOrderPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors);
  const hasCalledEndReached = useRef(false);

  const renderItem: ListRenderItem<productType> = useCallback(
    ({ item }) => <PastOrderHistoryCard order={item} onPress={onOrderPress} />,
    [onOrderPress],
  );

  const keyExtractor = useCallback(
    (item: productType, index: number) =>
      item._id || item.code || item.orderId || `${item.shippingMode || "order"}-${index}`,
    [],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  const handleMomentumScrollBegin = useCallback(() => {
    hasCalledEndReached.current = false;
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasCalledEndReached.current || !hasNextPage || isFetchingNextPage) return;
    hasCalledEndReached.current = true;
    loadMore();
  }, [hasNextPage, isFetchingNextPage, loadMore]);

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color={colors.primary.main} animating />
        </View>
      );
    }

    if (!hasNextPage && orders.length > 0) {
      return <Text style={styles.endText}>{"Fin de l'historique"}</Text>;
    }

    return null;
  }, [
    colors.primary.main,
    hasNextPage,
    isFetchingNextPage,
    orders.length,
    styles.endText,
    styles.footer,
  ]);

  return (
    <View style={styles.container}>
      <FlashList
        data={orders}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.35}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.main}
            colors={[colors.primary.main]}
          />
        }
        extraData={isDark}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};
