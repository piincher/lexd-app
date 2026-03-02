import { ListItemOrders } from "@src/components/ListItemOrders";
import { Fonts } from "@src/constants/Fonts";
import { OrderList, useGetActiveOrder } from "@src/features/home";
import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {}

const PastOrders: FC<Props> = () => {
   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetActiveOrder(
      "Inactive",
      "air"
   );

   const loadMore = () => {
      if (hasNextPage) {
         fetchNextPage();
      }
   };

   const pages = data?.pages.flatMap((page) => page);
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <Image
            source={require("../../../../assets/images/log.png")}
            style={{ height: 80, width: 80, alignSelf: "center" }}
         />
         <ListItemOrders
            data={pages}
            loadMore={loadMore}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {},
   textStyle: {
      fontSize: 20,
      fontFamily: Fonts.black,
      textAlign: "center",
   },
});

export default PastOrders;
