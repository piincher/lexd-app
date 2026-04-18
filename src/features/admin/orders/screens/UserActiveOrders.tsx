import { COLORS } from "@src/constants/Colors";
import { UserHeaderInfo } from "@src/shared/components";
import { useGetActiveOrder } from '@src/shared/hooks/useOrders';
import { useAuth } from "@src/store/Auth";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category } from "../components/Category";
import { RootStackScreenProps } from "@src/navigations/type";
import { ListItemOrders } from "@src/components/ListItemOrders";
import { useShippingMode } from "@src/store/shippingMode";

const status = [
   { id: "0", title: "Active" },
   { id: "1", title: "In Transit" },
   { id: "2", title: "Delivered" },
];

const UserActiveOrders = ({ navigation }: RootStackScreenProps<"UserActiveOrders">) => {
   const [statusChange, setStatusChange] = React.useState("Active");
   const { firstName, lastName } = useAuth((state) => state.user);
   const type = useShippingMode((state) => state.type);

   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } =
      useGetActiveOrder(statusChange, type);

   const mappedData = data?.pages.flatMap((page) => page);

   const loadMore = () => {
      if (hasNextPage) {
         fetchNextPage();
      }
   };

   useEffect(() => {
      refetch();
   }, [statusChange]);

   const onStatusChange = (itemValue: string) => {
      setStatusChange(itemValue);
   };

   return (
      <SafeAreaView style={styles.container}>
         <>
            <UserHeaderInfo navigation={navigation} firstName={firstName} lastName={lastName} />
            <Category
               status={status}
               onStatusChange={onStatusChange}
               statusChange={statusChange}
               setStatusChange={setStatusChange}
            />
            <ListItemOrders
               data={mappedData!}
               loadMore={loadMore}
               isFetchingNextPage={isFetchingNextPage}
               hasNextPage={hasNextPage}
               isLoading={isLoading}
            />
         </>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
});

export default UserActiveOrders;
