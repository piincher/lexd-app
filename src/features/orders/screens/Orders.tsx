import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { HomeTabScreenProps } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import { useShippingMode } from "@src/store/shippingMode";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemList } from "@src/features/home";
import withProtectedRoute from "@src/hoc/protected";

type dataType = {
   id: string;
   title: string;
   route: any;
   param?: string;
}[];
const list: dataType = [
   {
      id: "0",
      title: "Ajouter une commande",
      route: "SelectUser",
   },
   {
      id: "1",
      title: "Voir les commandes",
      route: "SelectShippingMethod",
   },
   {
      id: "2",
      title: "Ajouter un utilisateur",
      route: "UserAdd",
   },

   {
      id: "3",
      title: "Batch Update",
      route: "BatchUpdate",
   },
   {
      id: "4",
      title: "Marquer comme livré",
      route: "ScanQRCode",
   },
   {
      id: "5",
      title: "Les colis recupérés",
      route: "AdminPastOrders",
   },
   {
      id: "6",
      title: "Chercher des colis d'un client",
      route: "SearchOrder",
   },
   {
      id: "7",
      title: "Liste des utilisateurs",
      route: "UserList",
   },
];

const managerList: dataType = [
   {
      id: "4",
      title: "Marquer comme livré",
      route: "ScanQRCode",
   },
];

const shippingMode: dataType = [
   {
      id: "1",
      title: "Mes Expeditions Aeriennes",
      route: "UserActiveOrders",
      param: "air",
   },
   {
      id: "2",
      title: "Mes Expeditions Maritimes",
      route: "UserActiveOrders",
      param: "sea",
   },
];

const Orders = ({ navigation }: HomeTabScreenProps<"Orders">) => {
   const { role } = useAuth((state) => state.user);
   const { setType } = useShippingMode((state) => state);

   const userRole = role === "admin" ? list : role === "manager" ? managerList : shippingMode;

   const handleAirShiping = () => {
      const air = "air";
      setType(air);
      navigation.navigate("UserActiveOrders", { type: air });
   };

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
         <>
            <ScrollView>
               {userRole ? (
                  <>
                     {/* <RowDetails label='Le nombre de SMS restant' value={smsData?.[1]?.availableUnits ?? 0} />
							<RowDetails label="la date d'expiration de sms" value={formattedDateTime} /> */}

                     <ItemList data={userRole} navigation={navigation} />
                  </>
               ) : (
                  <></>
               )}
            </ScrollView>
         </>
      </SafeAreaView>
   );
};

export default withProtectedRoute(Orders);
