import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DetailRow } from "@src/components/DetailsRow/DetailsRow";
import { Header } from "@src/components/Header/Header";
import { LoadingSpinner } from "@src/components/LoadingSpinner";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useChatClient } from "@src/features/chat";
import { formatDate } from "@src/utils/formatDate";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
   ActivityIndicator,
   Animated,
   Easing,
   Image,
   Modal,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetOrderDetails } from "../hooks/useOrderDetail";
import { useGetSeaRoutes } from "../hooks/useSeaRoutes";
import { RootStackScreenProps } from "@src/navigations/type";
import { useBalance } from "@src/features/profile/hooks/useProfile";
import { useProcessPayment } from "@src/features/admin/finance/hooks/useTopUp";

const PAYMENT_STRINGS = {
   PAY_NOW: "Payer maintenant",
   PAYMENT_DETAILS: "Détails de paiement",
   TOTAL_AMOUNT: "Montant total",
   DUE_NOW: "À payer maintenant",
   CURRENT_BALANCE: "Solde actuel",
   INSUFFICIENT_BALANCE: "Solde insuffisant!",
   TOPUP_REQUIRED: "Rechargez votre compte pour continuer",
   DEFICIT_AMOUNT: (amount: number) => `Manque ${amount.toLocaleString()} FCFA`,
   TOPUP_CTA: "Recharger le compte",
};

const SeaShippingOrderDetails = ({
   route,
   navigation,
}: RootStackScreenProps<"SeaShippingOrderDetails">) => {
   const [actualLocation, setActualLocation] = useState("");
   const [note, setNote] = useState("");
   const { data: statusData } = useGetSeaRoutes();
   const [showBalanceError, setShowBalanceError] = useState(false);
   const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed" | "">("");
   const [isPaying, setIsPaying] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const fadeAnim = useState(new Animated.Value(0))[0];

   const id = route.params.id;
   const { data: item, isPending } = useGetOrderDetails(id);
   // Mock user balance - replace with actual data from your backend
   const { data } = useBalance();
   const isBalanceSufficient = data?.balance >= (item?.priceTotal || 0);
   const { mutate: processMutate, isSuccess, data: processData } = useProcessPayment();

   console.log("payment response from backend", processData);
   useChatClient();

   useEffect(() => {
      if (isSuccess) {
         setPaymentStatus("success");
         setShowModal(true);
         setIsPaying(false);
      }
   }, [isSuccess]);
   useEffect(() => {
      if (showModal) {
         Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
         }).start();
      }
   }, [showModal]);
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
   const handlePayment = async () => {
      if (!isBalanceSufficient) return;

      setIsPaying(true);

      //  API call
      processMutate(id);
   };

   const renderPaymentModal = () => (
      <Modal
         animationType="fade"
         transparent={true}
         visible={showModal && paymentStatus === "success"}
         onRequestClose={() => setShowModal(false)}
      >
         <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
               <MaterialCommunityIcons name="check-circle" size={60} color={COLORS.success} />
               <Text style={styles.modalTitle}>Paiement Réussi!</Text>
               <Text style={styles.modalText}>
                  Votre paiement de {item?.priceTotal?.toLocaleString()} FCFA a été traité avec
                  succès.
               </Text>
               <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                     Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                     }).start(() => {
                        setShowModal(false);
                        navigation.goBack();
                     });
                  }}
               >
                  <Text>RETOUR À LA COMMANDE</Text>
               </TouchableOpacity>
            </Animated.View>
         </View>
      </Modal>
   );

   const formattedDateTime = formatDate(item?.departureDate!);
   const formattedLastUpdate = formatDate(item?.updatedAt!);
   const getButtonColors = () => {
      if (item?.paymentStatus === "Paid") return [COLORS.success, COLORS.success];
      if (!isBalanceSufficient) return [COLORS.grey, COLORS.DarkGrey];
      return [COLORS.success, "#1f7a45"];
   };

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
         <ScrollView>
            <LinearGradient colors={[COLORS.blue, COLORS.yellow]} style={styles.headerGradient}>
               <Header title="Détails de suivi" navigation={navigation!} />
            </LinearGradient>

            <View style={styles.contentContainer}>
               {/* Payment Section */}
               <View style={styles.paymentCard}>
                  <Text style={styles.paymentHeader}>Détails de paiement</Text>

                  <View style={styles.amountRow}>
                     <Text style={styles.amountLabel}>Montant total</Text>
                     <Text style={styles.amountValue}>
                        {item?.priceTotal?.toLocaleString() || "0"} FCFA
                     </Text>
                  </View>

                  {!isBalanceSufficient && (
                     <View style={styles.balanceAlert}>
                        <View style={styles.alertHeader}>
                           <MaterialCommunityIcons
                              name="alert-circle-outline"
                              size={24}
                              color={COLORS.redShade}
                           />
                           <Text style={styles.alertTitle}>Solde insuffisant!</Text>
                        </View>
                        <View style={styles.balanceDetails}>
                           <View style={styles.balanceRow}>
                              <Text style={styles.balanceLabel}>Solde actuel</Text>
                              <Text style={styles.balanceValue}>
                                 {data?.balance.toLocaleString()} FCFA
                              </Text>
                           </View>
                           <View style={styles.balanceRow}>
                              <Text style={styles.balanceLabel}>À payer maintenant</Text>
                              <Text style={styles.dueAmount}>
                                 {item?.priceTotal?.toLocaleString()} FCFA
                              </Text>
                           </View>
                           <View style={styles.deficitContainer}>
                              <Text style={styles.deficitText}>
                                 Manque{" "}
                                 {(item?.priceTotal! - (data?.balance ?? 0)).toLocaleString()} FCFA
                              </Text>
                           </View>
                        </View>
                        <TouchableOpacity
                           style={styles.topupButton}
                           onPress={() => navigation.navigate("TopUp")}
                        >
                           <LinearGradient
                              colors={[COLORS.primary, COLORS.secondary]}
                              style={styles.gradientButton}
                           >
                              <MaterialCommunityIcons
                                 name="wallet-plus"
                                 size={24}
                                 color={COLORS.white}
                              />
                              <Text style={styles.topupButtonText}>Recharger le compte</Text>
                           </LinearGradient>
                        </TouchableOpacity>
                     </View>
                  )}

                  <TouchableOpacity
                     style={[
                        styles.payButton,
                        (!isBalanceSufficient || item?.paymentStatus === "Paid") &&
                           styles.disabledButton,
                     ]}
                     onPress={handlePayment}
                     disabled={!isBalanceSufficient || item?.paymentStatus === "Paid"}
                  >
                     <LinearGradient colors={getButtonColors()} style={styles.gradientButton}>
                        {isPaying ? (
                           <ActivityIndicator color={COLORS.white} />
                        ) : (
                           <>
                              <Text style={styles.payButtonText}>
                                 {item?.paymentStatus === "Paid" ? "Déjà Payé" : "Payer maintenant"}
                              </Text>
                              <MaterialCommunityIcons
                                 name={item?.paymentStatus === "Paid" ? "check" : "shield-check"}
                                 size={24}
                                 color={COLORS.white}
                              />
                           </>
                        )}
                     </LinearGradient>
                  </TouchableOpacity>
               </View>

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

               <StatusTimeline
                  statusData={statusData}
                  currentStatus={item?.currentStatus!}
                  route={item?.route}
               />
            </View>

            {renderPaymentModal()}
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
const StatusTimeline = ({ statusData, currentStatus, route }: Status) => {
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
            const match = route.find((r) => r?.title?.toLowerCase() === step?.title?.toLowerCase());
            const formattedDate = match ? formatDate(match.time) : "Non spécifié";

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
   paymentCard: {
      backgroundColor: COLORS.white,
      borderRadius: 16,
      padding: 20,
      margin: 16,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
   },
   paymentHeader: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: COLORS.blue,
      marginBottom: 16,
   },
   amountRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
   },
   amountLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: COLORS.secondaryText,
   },
   amountValue: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: COLORS.primary,
   },
   balanceAlert: {
      backgroundColor: COLORS.errorLight,
      borderRadius: 12,
      padding: 16,
      marginVertical: 12,
   },
   alertHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
   },
   alertTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: COLORS.error,
      marginLeft: 8,
   },
   balanceDetails: {
      borderTopWidth: 1,
      borderTopColor: COLORS.errorLight,
      paddingTop: 12,
   },
   balanceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
   },
   balanceLabel: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: COLORS.secondaryText,
   },
   balanceValue: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: COLORS.error,
   },
   dueAmount: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: COLORS.primaryText,
   },
   deficitContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 8,
      padding: 8,
      marginTop: 12,
   },
   deficitText: {
      fontFamily: Fonts.bold,
      fontSize: 14,
      color: COLORS.error,
      textAlign: "center",
   },
   topupButton: {
      marginTop: 16,
      borderRadius: 12,
      overflow: "hidden",
   },
   gradientButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 24,
   },
   topupButtonText: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: COLORS.white,
      marginLeft: 12,
   },
   payButton: {
      borderRadius: 12,
      overflow: "hidden",
      marginTop: 16,
   },
   payButtonText: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: COLORS.white,
      marginRight: 12,
   },
   disabledButton: {
      opacity: 0.7,
   },
   modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.4)",
   },
   modalContent: {
      backgroundColor: COLORS.white,
      padding: 25,
      borderRadius: 20,
      alignItems: "center",
      width: "85%",
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
