import AppButton from "@src/components/AppButton/AppButton";
import { ListItemOrders } from "@src/components/ListItemOrders";
import { useGetRoutes } from '@src/shared/hooks/useRoutes';
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetActiveOrdersAdmin } from "../hooks/useOrderManagement";
import { Category } from "../components/Category";
import { Header } from "@src/components/Header/Header";
import type { RootStackScreenProps } from "@src/navigations/type";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Calendar, useCalendar } from "@src/components/Calendar/Calendar";
import { getSafeDate } from "@src/utils/formatDate";

interface Order {
   id: string;
   clientName: string;
   phoneNumber: string;
   trackingCode: string;
   typeOfGoods: string;
   weight: string;
   partner: string;
   image: string;
}

const status = [
   { id: "0", title: "Active" },
   { id: "1", title: "In Transit" },
   { id: "2", title: "Delivered" },
];

const ActiveOrders = ({ navigation, route }: RootStackScreenProps<"ActiveOrder">) => {
   const [statusChange, setStatusChange] = React.useState("Active");
   const [searchQuery, setSearchQuery] = React.useState("");
   const shippingMethod = route.params.type;

   const { open, date, onConfirmSingle, onDismissSingle, setOpen } = useCalendar();
   const departDate = getSafeDate(date);

   const { data, fetchNextPage, isError, hasNextPage, isFetchingNextPage, refetch, isLoading } =
      useGetActiveOrdersAdmin(statusChange, departDate!, shippingMethod);

   useGetRoutes();

   const filteredData = data?.pages
      .flatMap((page) => page)
      .filter((item) => {
         return (
            item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.clientPhone.toLowerCase().includes(searchQuery.toLowerCase())
         );
      });

   const loadMore = () => {
      if (hasNextPage) {
         fetchNextPage();
      }
   };

   useEffect(() => {
      refetch();
   }, [statusChange, date]);

   const onStatusChange = (itemValue: string) => {
      setStatusChange(itemValue);
   };

   if (isError) {
      return (
         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Erreur lors du chargement des commandes actives</Text>
            <AppButton title="Actualiser" onPress={refetch} />
         </View>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <Header
            title="Commandes"
            navigation={navigation}
            rightIcon={<AntDesign name="calendar" size={24} color="black" />}
            rightIconHandler={() => setOpen(true)}
         />
         <Calendar
            open={open}
            onDismissSingle={onDismissSingle}
            date={date}
            onConfirmSingle={onConfirmSingle}
         />
         <Category
            status={status}
            onStatusChange={onStatusChange}
            statusChange={statusChange}
            setStatusChange={setStatusChange}
         />
         <Searchbar
            style={{ marginHorizontal: 10, marginVertical: 10 }}
            value={searchQuery}
            placeholder="Rechercher par nom, téléphone, code de suivi"
            onChangeText={(query) => setSearchQuery(query)}
         />
         <ListItemOrders
            data={filteredData!}
            loadMore={loadMore}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default ActiveOrders;
