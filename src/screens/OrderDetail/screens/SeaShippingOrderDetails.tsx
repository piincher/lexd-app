import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { de } from "react-native-paper-dates";
import { useGetRoutes } from "@src/screens/Home/hooks/useRoute";
import { useChatClient } from "@src/screens/Chat/hooks/useChatClient";
import { useGetOrderDetails } from "../hooks/useGetOrderDetail";
import { LoadingSpinner } from "@src/components/LoadingSpinner";
import { formatDate } from "@src/utils/formatDate";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@src/components/Header/Header";
import { DetailRow } from "@src/components/DetailsRow/DetailsRow";
import { useGetSeaRoutes } from "../hooks/useSeaRoutes";

const SeaShippingOrderDetails = ({ route, navigation }: RootStackScreenProps<"OrderDetail">) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [actualLocation, setActualLocation] = useState("");
   const [note, setNote] = useState("");
   const { data } = useGetSeaRoutes();
   useChatClient();

   const showModal = () => {
      setModalVisible(true);
   };

   const hideModal = () => setModalVisible(false);

   const [currentStep, setCurrentStep] = React.useState(0);
   const id = route.params.id;
   const { data: item, isPending } = useGetOrderDetails(id);

   console.log("seas shipping");
   useEffect(() => {
      const datad = item?.route?.[item.route?.length - 1] ?? [];
      const coordinateArr = datad?.coordinates || [];
      const lastItem = coordinateArr[coordinateArr?.length - 1];
      setNote(lastItem?.note);

      console.log("lastItem", lastItem);
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
            <Header title="Détails de suivi" navigation={navigation!} />
            <View style={styles.imageContainer}>
               <Image source={{ uri: item?.images[0]?.url }} style={styles.imageStyle} />
               <View style={{ marginLeft: 12 }}>
                  <Text style={styles.category}>{item?.category?.name || item?.typeOfPackage}</Text>
                  <Text style={styles.trackingNumber}>Numero de Suivi:{item?.code}</Text>
               </View>
               <Pressable onPress={handleChat}>
                  <MaterialCommunityIcons name="chat" size={34} color={COLORS.blue} />
               </Pressable>
            </View>
            <View style={styles.detailContainer}>
               {/* Logistics details */}
               <DetailRow
                  label1="Pays d'envoie"
                  value1="Chine"
                  label2="Pays de reception"
                  value2="Bamako, Mali"
               />
               {/* Goods information */}
               <DetailRow
                  label1="Client"
                  value1={item?.clientName!}
                  label2="Nombre de Kilo"
                  value2={String(item?.packageWeight!)}
               />
               {/* Status and type */}
               <DetailRow
                  label1="Status"
                  value1={item?.currentStatus! || "le client a passe la commande"}
                  label2="Type de colis"
                  value2={item?.category?.name!}
               />
               <DetailRow
                  label1="Position actuelle"
                  value1={actualLocation || "En attente"}
                  label2="Date de depart"
                  value2={formattedDateTime}
               />
               <DetailRow label1="Note" value1={note || ""} label2="" value2="" />
               <DetailRow
                  label1="Derniere mise a jour"
                  value1={formattedLastUpdate}
                  label2=""
                  value2=""
               />
            </View>
            <StatusTimeline
               statusData={data!}
               currentStatus={item?.currentStatus!}
               location={actualLocation}
            />
         </ScrollView>
      </SafeAreaView>
   );
};

export default SeaShippingOrderDetails;

const styles = StyleSheet.create({
   detailContainer: {
      borderWidth: 0.2,
      padding: 20,
      margin: 20,
      borderColor: COLORS.grey,
      borderRadius: 5,
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

interface Coordinate {
   _id: string;
   latitude: number;
   longitude: number;
   location: string;
}

type OrderType = {
   coordinates: Coordinate[];
   _id: string;
   note: string;
   time: string; // ISO date string
   title: string;
   status: string;
};
interface Status {
   statusData: OrderType[];
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
            <Text>Les données logistiques ne sont pas encore disponibles</Text>
         </View>
      );
   }

   const determineCurrentStatus = (orderDetails: OrderType[], currentStatus: string) => {
      for (let i = 0; i < orderDetails.length; i++) {
         if (orderDetails[i].title === currentStatus) {
            return i;
         }
      }
      return -1;
   };
   const currentStatusIndex = determineCurrentStatus(statusData, currentStatus);
   return (
      <View style={styles2.container}>
         {statusData?.map((step, index) => {
            const date = new Date(step.time ?? new Date());
            const formattedDate = date.toISOString().split("T")[0];
            const hours = date.getUTCHours().toString().padStart(2, "0");
            const minutes = date.getUTCMinutes().toString().padStart(2, "0");
            const formattedDateTime = `${formattedDate} ${hours}:${minutes}`;

            return (
               <View key={step._id} style={styles2.stepContainer}>
                  <View style={styles2.stepInnerContainer}>
                     <View
                        style={[
                           styles2.circle,
                           index <= currentStatusIndex && styles2.activeCircle,
                        ]}
                     >
                        <Text
                           style={[
                              styles2.stepText,
                              index <= currentStatusIndex && styles2.activeStepText,
                           ]}
                        >
                           {index + 1}
                        </Text>
                     </View>
                     <Text
                        style={[styles2.label, index <= currentStatusIndex && styles2.activeLabel]}
                        numberOfLines={3}
                     >
                        {formattedDateTime}
                     </Text>
                     <Text
                        style={[styles2.label, index <= currentStatusIndex && styles2.activeLabel]}
                        numberOfLines={3}
                     >
                        {step?.title}
                     </Text>
                  </View>
                  {index < statusData.length - 1 && (
                     <View
                        style={[styles2.line, index < currentStatusIndex && styles2.activeLine]}
                     />
                  )}
               </View>
            );
         })}
      </View>
   );
};

const styles2 = StyleSheet.create({
   container: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
   },
   stepContainer: {
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 20,
   },
   stepInnerContainer: {
      alignItems: "center",
      marginBottom: 5, // Space between the circle and the label
   },
   circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#ccc",
      alignItems: "center",
      justifyContent: "center",
   },
   activeCircle: {
      backgroundColor: "#4caf50",
   },
   stepText: {
      color: "#fff",
   },
   activeStepText: {
      color: "#fff",
   },
   label: {
      marginTop: 5,
      color: "#ccc",
      textAlign: "center",
   },
   activeLabel: {
      color: "#4caf50",
   },
   line: {
      width: 2,
      height: 30,
      backgroundColor: "#ccc",
   },
   activeLine: {
      backgroundColor: "#4caf50",
   },
});
