import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DetailRow } from "@src/components/DetailsRow/DetailsRow";
import { Header } from "@src/components/Header/Header";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import { formatDate } from "@src/utils/formatDate";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Line } from "react-native-svg";
import { useChatClient } from "@src/features/chat";
import { useGetRoutes } from "@src/features/routes";
import { useGetOrderDetails } from "../hooks/useOrderDetail";
import { LoadingSpinner } from "@src/components/LoadingSpinner";
import { LinearGradient } from "expo-linear-gradient";

// interface StepIndicatorProps {
// 	steps: Array<{
// 		id: string;
// 		title: string;
// 		time: string;
// 	}>;
// 	currentStep: number;
// }

// const statusData = {
// 	orderDetail: [
// 		{
// 			id: '1',
// 			status: 'Order arrived at warehouse',
// 			coordinates: [{ latitude: 23.1291, longitude: 113.2644, location: 'Guangzhou' }],
// 		},
// 		{
// 			id: '2',
// 			status: 'Order in Processing',
// 			coordinates: [{ latitude: 23.1291, longitude: 113.2644, location: 'Guangzhou entrepot' }],
// 		},
// 		{
// 			id: '3',
// 			status: 'Order in Transit',
// 			coordinates: [
// 				{
// 					latitude: 22.5429,
// 					longitude: 113.9526,
// 					location: 'Hong Kong',
// 					note: 'les Colis sont expédiées et transférées vers le port',
// 				},
// 				{
// 					latitude: 22.3193,
// 					longitude: 114.1694,
// 					location: 'Hong Kong',
// 					note: "Les Colis sont transféré à l'entrepôt de Hong Kong",
// 				},
// 				{
// 					latitude: 22.308,
// 					longitude: 113.9185,
// 					location: "L'Éthiopie",
// 					note: "Les colis ont décollé pour L'Éthiopie",
// 				},
// 				{
// 					latitude: 8.97778,
// 					longitude: 38.7994,
// 					location: 'Ethiopie',
// 					note: "Les Colis transféré vers l'aéroport d'Éthiopie",
// 				},
// 				{
// 					latitude: 12.5416,
// 					longitude: -7.94994,
// 					location: 'Bamako, Mali',
// 					note: "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement",
// 				},
// 				{
// 					latitude: 12.5585407,
// 					longitude: -7.9811036,
// 					location: 'Bamako, Mali Aeroport',
// 					note: 'Les marchandises sont arrivées et ont été stockées (Kalaban-Coura, près de FEBAK, précisément à côté du lycée Birgo. +22376696177 / +22350005142)',
// 				},
// 			],
// 		},
// 		{
// 			id: '4',
// 			status: 'Order in Arrived',
// 			coordinates: [{ latitude: 23.1291, longitude: 113.2644, location: 'Kalaban-Coura pret du lycee birgo' }],
// 		},
// 	],
// };

interface Coordinate {
   _id: string;
   latitude: number;
   longitude: number;
   location: string;
}

// Define the type for the status
interface Status {
   statusData: {
      coordinates: Coordinate[];
      _id: string;
      note: string;
      time: string; // ISO date string
      title: string;
      status: string;
   }[];
   currentStatus:
      | "Order arrived at warehouse"
      | "Order in Processing"
      | "Order in Transit"
      | "Order in Arrived";
   location: string;
}
const StatusTimeline = ({ statusData, currentStatus, location }: Status) => {
   if (!statusData || statusData.length === 0) {
      return (
         <View>
            <Text style={styles3.noShippingText}>
               Les données logistiques ne sont pas encore disponibles
            </Text>
         </View>
      );
   }

   const determineCurrentStatus = (orderDetails: any, currentStatus: string) => {
      for (let i = 0; i < orderDetails.length; i++) {
         if (orderDetails[i].status === currentStatus) {
            return i;
         }
      }
      return -1;
   };
   const currentStatusIndex = determineCurrentStatus(statusData, currentStatus);
   return (
      <View style={styles3.container}>
         <Svg height={(statusData?.length + 1) * 60} width="50">
            <Line
               x1="25"
               y1="0"
               x2="25"
               y2={(statusData.length + 1) * 200}
               stroke="gray"
               strokeWidth="1"
            />
            {statusData?.map((item, index) => (
               <Circle
                  key={item.id}
                  cx="25"
                  cy={(index + 1) * 59}
                  r="10"
                  fill={index <= currentStatusIndex ? COLORS.blue : COLORS.white}
                  stroke={COLORS.blue}
                  strokeWidth="1"
               />
            ))}
         </Svg>
         <View style={styles3.statusContainer}>
            {statusData?.map((item, index) => {
               return (
                  <>
                     <View key={item._id} style={styles3.statusItem}>
                        <Text style={styles3.statusText}>{item.status}</Text>
                        <Text style={styles3.locationText}>
                           {item.status === "Order in Transit"
                              ? location
                              : item?.coordinates.map((coord) => coord.location)}
                        </Text>
                     </View>
                  </>
               );
            })}
         </View>
      </View>
   );
};

const styles3 = StyleSheet.create({
   container: {
      flexDirection: "row",
      alignItems: "flex-start",
   },
   statusContainer: {},
   noShippingText: {
      fontFamily: Fonts.bold,
      fontSize: 22,
      color: COLORS.redShade,
      textAlign: "center",
      marginTop: 30,
   },
   statusItem: {
      top: "9%",
   },
   statusText: {
      fontSize: 14,
      color: COLORS.blue,
      marginTop: 21,
      marginBottom: 9,
      fontFamily: Fonts.bold,
   },
   locationText: { fontSize: 12, color: COLORS.grey },
});

const OrderDetails = ({ route, navigation }: RootStackScreenProps<"OrderDetail">) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [actualLocation, setActualLocation] = useState("");
   const [note, setNote] = useState("");
   const { data } = useGetRoutes();
   useChatClient();

   const showModal = () => {
      setModalVisible(true);
   };

   const hideModal = () => setModalVisible(false);

   const [currentStep, setCurrentStep] = React.useState(0);
   const id = route.params.id;
   const { data: item, isPending } = useGetOrderDetails(id);

   useEffect(() => {
      const datad = item?.route?.[item.route?.length - 1] ?? [];
      const coordinateArr = datad?.coordinates || [];
      const lastItem = coordinateArr[coordinateArr?.length - 1];
      setNote(lastItem?.note);

      setActualLocation(lastItem?.location);
   }, [item]);
   const handleChat = () => {
      navigation.navigate("SelectAdminToChatWith");
   };

   if (!data) {
      return <LoadingSpinner />;
   }

   const formattedDateTime = formatDate(item?.departureDate!);
   const formattedLastUpdate = formatDate(item?.updatedAt!);
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <ScrollView>
            <LinearGradient
               colors={[COLORS.green, COLORS.yellow, COLORS.redShade]}
               style={styles.headerGradient}
            >
               <Header title="Détails de suivi" navigation={navigation!} />
            </LinearGradient>
            <View>
               <View style={styles.imageContainer}>
                  <LinearGradient colors={[COLORS.blue, COLORS.yellow]} style={styles.imageBorder}>
                     <Image source={{ uri: item?.images[0]?.url }} style={styles.imageStyle} />
                  </LinearGradient>
                  <View style={styles.textContainer}>
                     <Text style={styles.category}>
                        {item?.category?.name || item?.typeOfPackage}
                     </Text>
                     <Text style={styles.trackingNumber}>Numero de Suivi: {item?.code}</Text>
                  </View>
                  <Pressable onPress={handleChat} style={styles.chatButton}>
                     <MaterialCommunityIcons name="chat" size={28} color={COLORS.white} />
                  </Pressable>
               </View>
            </View>
            <View style={detailStyles.container}>
               <DetailRow label="Pays d'envoie" value="Chine, Foshan" icon="earth" />

               <DetailRow label="Pays de réception" value="Bamako, Mali" icon="map-marker" />

               <View style={detailStyles.card}>
                  <DetailRow
                     label="Client"
                     value={item?.clientName || "Non spécifié"}
                     icon="account"
                  />

                  <DetailRow
                     label="Prix Total"
                     value={`${item?.priceTotal?.toLocaleString() || "0"} FCFA`}
                     icon="cash"
                  />
                  <DetailRow
                     label="Nombre de CBM"
                     value={item?.numberOfCbm?.toString() || "0"}
                     icon="cash"
                  />

                  <DetailRow
                     label="Type de colis"
                     value={item?.category?.name || "Général"}
                     icon="package-variant"
                  />
               </View>

               <View style={detailStyles.card}>
                  <DetailRow
                     label="Statut actuel"
                     value={item?.currentStatus || "Commande passée"}
                     icon="progress-check"
                  />

                  <DetailRow
                     label="Dernière mise à jour"
                     value={formattedLastUpdate}
                     icon="update"
                  />

                  <DetailRow label="Date de depart" value={formattedDateTime} icon="calendar" />
               </View>

               <View style={detailStyles.card}>
                  <DetailRow
                     label="Notes"
                     value={note || "Aucune note disponible"}
                     icon="note-text"
                     isLast
                  />
               </View>
            </View>
            <StatusTimeline
               statusData={data[0]?.orderDetail!}
               currentStatus={item?.currentStatus!}
               location={actualLocation}
            />
         </ScrollView>
      </SafeAreaView>
   );
};
export const detailStyles = StyleSheet.create({
   container: {
      padding: 16,
      backgroundColor: COLORS.extra1,
   },

   card: {
      backgroundColor: COLORS.white,
      borderRadius: 14,
      marginVertical: 8,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
   },
   sectionHeader: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: COLORS.DarkGrey,
      marginVertical: 12,
      paddingLeft: 8,
   },
});
const styles = StyleSheet.create({
   detailContainer: {
      borderWidth: 0.2,
      padding: 20,
      margin: 20,
      borderColor: COLORS.grey,
      borderRadius: 5,
   },
   chatButton: {
      backgroundColor: COLORS.blue,
      padding: 1,
      borderRadius: 15,
      alignSelf: "center",
   },
   contentContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
   },
   imageContainer: {
      flexDirection: "row",
      backgroundColor: COLORS.white,
      borderRadius: 20,
      padding: 15,
      marginBottom: 20,
      shadowColor: COLORS.DarkGrey,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
   },
   imageBorder: {
      borderRadius: 12,
      padding: 3,
   },
   imageStyle: {
      width: 80,
      height: 80,
      borderRadius: 10,
   },
   headerGradient: {
      paddingTop: 5,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: COLORS.DarkGrey,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
   },
   category: {
      fontFamily: Fonts.bold,
      fontSize: 18,
   },
   trackingNumber: {
      fontFamily: Fonts.regular,
      fontSize: 16,
      color: COLORS.grey,
   },
   imageContainer: {
      flexDirection: "row",
      padding: 20,
      marginHorizontal: 10,
      alignItems: "center",
      justifyContent: "space-between",
   },
   imageStyle: {
      width: 100,
      height: 100,
      borderRadius: 10,
   },
});

export default OrderDetails;
