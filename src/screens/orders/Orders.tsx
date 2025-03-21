import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { HomeTabScreenProps } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import { useShippingMode } from "@src/store/shippingMode";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemList } from "../Home/components/ItemList";

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

   console.log("role", role);
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

export default Orders;

const styles = StyleSheet.create({
   container: {
      margin: 10,
   },
   card: {
      borderWidth: 1,
      borderColor: COLORS.primary,
      padding: 10,
      backgroundColor: COLORS.white,
   },
   title: {
      borderColor: COLORS.primary,
      marginBottom: 20,
      fontFamily: Fonts.bold,
      padding: 10,
   },
   name: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: "left",
      marginRight: 50,
      fontFamily: Fonts.black,
      padding: 5,
   },
   date: {
      fontWeight: "500",
      marginBottom: 10,
   },
   daysRemaining: {
      textAlign: "left",
      marginRight: 80,
      fontFamily: Fonts.bold,
      padding: 5,
   },
   headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      borderWidth: 0.5,
      padding: 20,
      borderColor: COLORS.primary,
   },
   hsCArgoText: { fontFamily: Fonts.bold, fontSize: 20 },
   pressable: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: COLORS.primary,
      borderWidth: 0.9,
      padding: 12,
      margin: 20,
   },
});

// {
// 		steps: [
// 			{
// 				id: '0',
// 				title: 'le client a passé une commande',
// 				coordinates: [
// 					{
// 						latitude: 23.1291,
// 						longitude: 113.2644,
// 						_id: '66bbb4da3f5437942b2c5fbb',
// 					},
// 				],
// 			},
// 			{
// 				id: '1',
// 				title: "Votre colis est arrivé à l'entrepôt",
// 				coordinates: [
// 					{
// 						latitude: 23.1291,
// 						longitude: 113.2644,
// 						_id: '66bbb4da3f5437942b2c5fbd',
// 					},
// 				],
// 				_id: '66bbb4da3f5437942b2c5fbc',
// 			},
// 			{
// 				id: '2',
// 				title: 'les colis sont emballées',
// 				coordinates: [
// 					{
// 						latitude: 23.1291,
// 						longitude: 113.2644,
// 						_id: '66bbb4da3f5437942b2c5fbf',
// 					},
// 				],
// 			},
// 			{
// 				id: '3',
// 				title: 'les Colis sont expédiées et transférées vers le port',
// 				coordinates: [
// 					{
// 						latitude: 22.5429,
// 						longitude: 113.9526,
// 					},
// 				],
// 			},
// 			{
// 				id: '4',
// 				title: "Les Colis sont transféré vers l'entrepôt de Hong Kong",
// 				coordinates: [
// 					{
// 						latitude: 22.3193,
// 						longitude: 114.1694,
// 					},
// 				],
// 				_id: '66bbb4da3f5437942b2c5fc2',
// 			},
// 			{
// 				id: '5',
// 				title: "Les colis ont décollé pour L'Éthiopie",
// 				coordinates: [
// 					{
// 						latitude: 22.308,
// 						longitude: 113.9185,
// 					},
// 				],
// 			},
// 			{
// 				id: '6',
// 				title: "Les Colis sont transférés vers l'aéroport d'Éthiopie",
// 				coordinates: [
// 					{
// 						latitude: 9.145,
// 						longitude: 40.4897,
// 						_id: '66bbb4da3f5437942b2c5fc7',
// 					},
// 				],
// 			},
// 			{
// 				id: '7',
// 				title: "Les Colis sont arrivé à l'aéroport de Bamakko et prêt pour le dédouanement",
// 				coordinates: [
// 					{
// 						latitude: 12.6392,
// 						longitude: -8.0029,
// 					},
// 				],
// 			},
// 			{
// 				id: '8',
// 				title:
// 					'Les marchandises sont arrivées  et ont été stockées (Kalaban-Coura, près de FEBAK, précisément à côté du lycée Birgo. +22376696177 / +22350005142)',
// 				coordinates: [
// 					{
// 						latitude: 12.6392,
// 						longitude: -8.0029,
// 					},
// 				],
// 			},
// 		],
// 	},
