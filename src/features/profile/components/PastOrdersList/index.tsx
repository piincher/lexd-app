import React from "react";
import { View } from "react-native";
import { productType } from "@src/shared/types/order";
import { ListItemOrders } from "@src/components/ListItemOrders";
import { styles } from "./PastOrdersList.styles";

interface PastOrdersListProps {
  orders: productType[];
  loadMore: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export const PastOrdersList: React.FC<PastOrdersListProps> = ({
  orders,
  loadMore,
  isFetchingNextPage,
  hasNextPage,
}) => {
  return (
    <View style={styles.listContainer}>
      <ListItemOrders
        data={orders}
        loadMore={loadMore}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        isLoading={false}
      />
    </View>
  );
};
