import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DetailRow } from "@src/components/DetailsRow/DetailsRow";
import { Header } from "@src/components/Header/Header";
import { LoadingSpinner } from "@src/components/LoadingSpinner";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useChatClient } from "@src/screens/Chat/hooks/useChatClient";
import { formatDate } from "@src/utils/formatDate";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
   Animated,
   Easing,
   Image,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetOrderDetails } from "../hooks/useGetOrderDetail";
import { useGetSeaRoutes } from "../hooks/useSeaRoutes";

const SeaShippingOrderDetails = ({ route, navigation }: RootStackScreenProps<"OrderDetail">) => {
   const [actualLocation, setActualLocation] = useState("");
   const [note, setNote] = useState("");
   const { data: statusData } = useGetSeaRoutes();
   useChatClient();

   const id = route.params.id;
   const { data: item, isPending } = useGetOrderDetails(id);

   useEffect(() => {
      const datad = item?.route?.[item.route?.length - 1] ?? [];
      const coordinateArr = datad?.coordinates || [];
      const lastItem = coordinateArr[coordinateArr?.length - 1];
      setNote(lastItem?.note);
      setActualLocation(item?.currentStatus!);
   }, [item]);

   const handleChat = () => {
      navigation.navigate("SelectAdminToChatWith");
   };

   if (!statusData || isPending) {
      return <LoadingSpinner />;
   }

   const formattedDateTime = formatDate(item?.departureDate!);
   const formattedLastUpdate = formatDate(item?.updatedAt!);

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
         <ScrollView>
            <LinearGradient colors={[COLORS.blue, COLORS.yellow]} style={styles.headerGradient}>
               <Header title="Détails de suivi" navigation={navigation!} />
            </LinearGradient>

            <View style={styles.contentContainer}>
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
                     <MaterialCommunityIcons name="chat" size={28} color={COLORS.blue} />
                  </Pressable>
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

                     <DetailRow
                        label="Date de chargement"
                        value={formattedDateTime}
                        icon="calendar"
                     />
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

               <StatusTimeline statusData={statusData} currentStatus={item?.currentStatus!} />
            </View>
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
const StatusTimeline = ({ statusData, currentStatus }: Status) => {
   const [animations] = useState(() => statusData.map(() => new Animated.Value(0)));
   const currentStatusIndex = statusData.findIndex((step) => step.title === currentStatus);

   useEffect(() => {
      statusData.forEach((_, index) => {
         Animated.timing(animations[index], {
            toValue: 1,
            duration: 800,
            delay: index * 50,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
         }).start();
      });
   }, []);

   return (
      <View style={styles2.container}>
         {statusData.map((step, index) => {
            const formattedDate = formatDate(step.createdAt);
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;

            return (
               <View key={step._id} style={styles2.stepContainer}>
                  {/* Timeline Circle */}
                  <View
                     style={[
                        styles2.circle,
                        isCompleted && styles2.completedCircle,
                        isCurrent && styles2.currentCircle,
                        !isCompleted && !isCurrent && styles2.futureCircle,
                     ]}
                  >
                     <MaterialCommunityIcons
                        name={getStatusIcon(step.title)}
                        size={20}
                        color={COLORS.white}
                     />
                  </View>

                  {/* Content */}
                  <View style={styles2.contentWrapper}>
                     <Text
                        style={[
                           styles2.date,
                           isCompleted && styles2.completedText,
                           isCurrent && styles2.currentText,
                           !isCompleted && !isCurrent && styles2.futureText,
                        ]}
                     >
                        {formattedDate}
                     </Text>
                     <Text
                        style={[
                           styles2.title,
                           isCompleted && styles2.completedText,
                           isCurrent && styles2.currentText,
                           !isCompleted && !isCurrent && styles2.futureText,
                        ]}
                     >
                        {step.title}
                     </Text>
                  </View>

                  {/* Connector Line */}
                  {index < statusData.length - 1 && (
                     <View
                        style={[
                           styles2.line,
                           isCompleted
                              ? styles2.completedLine
                              : isCurrent
                              ? styles2.currentLine
                              : styles2.futureLine,
                        ]}
                     />
                  )}
               </View>
            );
         })}
      </View>
   );
};

// Update styles2
const styles2 = StyleSheet.create({
   container: {
      backgroundColor: COLORS.white,
      borderRadius: 20,
      padding: 20,
      margin: 20,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
   },
   stepContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 24,
      minHeight: 60,
   },
   circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
   },
   completedCircle: {
      backgroundColor: COLORS.success, // #2abe77
   },
   currentCircle: {
      backgroundColor: COLORS.green, // #27ae60
   },
   futureCircle: {
      backgroundColor: COLORS.grey, // #8E8E8F
   },
   contentWrapper: {
      flex: 1,
      paddingRight: 16,
   },
   date: {
      fontFamily: Fonts.meduim,
      fontSize: 12,
   },
   title: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      marginTop: 4,
      lineHeight: 20,
   },
   completedText: {
      color: COLORS.success, // #2abe77
   },
   currentText: {
      color: COLORS.green, // #27ae60
   },
   futureText: {
      color: COLORS.grey, // #8E8E8F
   },
   line: {
      position: "absolute",
      left: 19,
      top: 40,
      width: 2,
      height: 40,
   },
   completedLine: {
      backgroundColor: COLORS.success, // #2abe77
   },
   currentLine: {
      backgroundColor: COLORS.green, // #27ae60
   },
   futureLine: {
      backgroundColor: COLORS.grey, // #8E8E8F
   },
});
const styles = StyleSheet.create({
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
   textContainer: {
      flex: 1,
      marginLeft: 15,
      justifyContent: "center",
   },
   category: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: COLORS.DarkGrey,
      marginBottom: 4,
   },
   trackingNumber: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: COLORS.DarkGrey,
   },
   chatButton: {
      backgroundColor: COLORS.blue,
      padding: 10,
      borderRadius: 15,
      alignSelf: "center",
   },
   detailContainer: {
      marginHorizontal: 16,
      marginVertical: 12,
      padding: 8,
      backgroundColor: COLORS.white,
      borderRadius: 16,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
   },
});

export default SeaShippingOrderDetails;

const getStatusIcon = (status: string) => {
   const icons: { [key: string]: string } = {
      "Le client a passé une commande": "cart",
      "Les colis sont chargés dans le conteneur et prêts pour l'expédition": "package",
      "Le conteneur a quitté le terminal de Nansha (GZ Ocean Terminal)": "ship-wheel",
      "Le conteneur est en route vers le port de Tanjung Pelepas": "navigation",
      "Le conteneur a fait escale à Tanjung Pelepas (Pelabuhan Tanjung Pelepas Terminal)": "anchor",
      "Le conteneur est en route vers le port de Tema, Ghana (Meridian Port)": "ferry",
      "Le conteneur a fait escale au port de Tema, Ghana (Meridian Port)": "warehouse",
      "Le conteneur est en route vers le port de Dakar": "map-marker-path",
      "Le conteneur est arrivé au port de Dakar": "flag-checkered",
      "Le conteneur est en route vers la frontière de Diboli, Mali": "truck",
      "Le conteneur est en cours de dédouanement à la frontière de Diboli, Mali": "passport",
      "Le conteneur a été dédouané et est prêt pour le transport vers Bamako, Mali":
         "check-decagram",
      "Le conteneur est en route vers Bamako, Mali": "road",
      "Les marchandises sont arrivées à Bamako, Mali, pour distribution": "package-variant",
      "Les marchandises sont stockées à Kalaban Coura (+22376696177/+22351005042)": "warehouse",
   };
   return icons[status] || "information";
};
