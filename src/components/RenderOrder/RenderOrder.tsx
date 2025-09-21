import { productType } from "@src/api/order";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@src/screens/Admin/screens/ActiveOrder/components/Slider";
import { ListItem } from "../ListItem/ListItem";
import { Button, Text } from "react-native-paper";
import { Pressable, StyleSheet, View, Alert } from "react-native";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useEffect, useState } from "react";
import { useAuth } from "@src/store/Auth";
import { formatDate } from "@src/utils/formatDate";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useGetOrderDetails } from "@src/screens/OrderDetail/hooks/useGetOrderDetail";
import { useShippingMode } from "@src/store/shippingMode";
import { CustomModal } from "../Modal/Modal";
import { useDeleteOrder } from "@src/screens/Admin/hooks/useOrder";
import { useClipboard } from "@src/hooks/useClipBoard";

export const RenderOrder = ({ item }: { item: productType }) => {
   const { role } = useAuth((state) => state.user);
   const shippingMode = useShippingMode((state) => state.type);
   const navigation = useNavigation();
   const formattedDate = formatDate(item?.departureDate!);
   const formattedLastUpdate = formatDate(item?.updatedAt!);
   const [showModal, setShowModal] = useState(false);
   const { mutate, isSuccess } = useDeleteOrder();
   const { copyToClipboard } = useClipboard();

   useEffect(() => {
      if (isSuccess) {
         setShowModal(false);
      }
   }, [isSuccess]);

   useGetOrderDetails(item._id!);

   // Get the actual status value from the item (this is the key fix)
   const orderStatus = item.status; // Using item.status instead of currentRoute.title

   const customerInfo = [
      { label: "Nom du client", value: item.clientName, icon: "person" },
      { label: "Numéro de téléphone", value: item.clientPhone, icon: "phone" },
      { label: "Numéro de suivi", value: item.code, icon: "qr-code", isCopyable: true },
   ];

   const shippingDetails = [
      { label: "Mode d'expédition", value: item.shippingMode, icon: "local-shipping" },
      {
         label: "Position actuelle",
         value: item.currentStatus || "En attente",
         icon: "location-on",
      },
      { label: "Nombre de colis", value: (item.quantity ?? 0).toString(), icon: "123" },
      { label: "Type de colis", value: item?.category?.name || "Non spécifié", icon: "category" },
      {
         label: shippingMode === "sea" ? "Date de chargement" : "Date de départ",
         value: formattedDate,
         icon: "calendar-today",
      },
      { label: "Dernière mise à jour", value: formattedLastUpdate, icon: "update" },
   ];

   const paymentInfo =
      shippingMode === "sea"
         ? [
              { label: "CBM", value: item.packageCBM, icon: "square" },
              {
                 label: "Prix unitaire (FCFA)",
                 value: item.unitPrice ? `${item.unitPrice} FCFA` : "Non disponible",
                 icon: "attach-money",
              },
              { label: "Prix total (FCFA)", value: `${item.priceTotal} `, icon: "attach-money" },
              {
                 label: "Compagnie de transport",
                 value: item.contenairNumber,
                 icon: "local-shipping",
              },
              {
                 label: "Statut de paiement",
                 value:
                    item.paymentStatus === "Paid" ? (
                       <Text style={{ color: COLORS.success, fontFamily: Fonts.meduim }}>Payé</Text>
                    ) : (
                       <Text style={{ color: COLORS.danger, fontFamily: Fonts.meduim }}>
                          Non payé
                       </Text>
                    ),
                 icon: "payment",
              },
           ]
         : [];

   const handleNavigate = () => {
      if (role === "admin") {
         navigation.navigate("ActiveOrderDetails", {
            id: item._id!,
         });
         return;
      }
      const routeName = shippingMode === "sea" ? "SeaShippingOrderDetails" : "OrderDetail";
      navigation.navigate(routeName, {
         id: item._id!,
      });
   };

   const handleEdit = () => {
      navigation.navigate("EditOrder", {
         id: item._id!,
         orderId: item?.category?._id,
      });
   };

   const showDeleteModal = () => {
      setShowModal(true);
   };

   const onConfirmDelete = () => {
      mutate({
         orderId: item._id!,
      });
   };

   const copyTrackingNumber = () => {
      if (item.code) {
         copyToClipboard(item.code);
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <CustomModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={onConfirmDelete}
            title="Supprimer la commande"
            message="Êtes-vous sûr de vouloir supprimer cette commande ? Cette action ne peut pas être annulée."
            confirmText="Supprimer"
            cancelText="Annuler"
            icon="warning"
         />

         {/* Header Section with Dynamic Progress Tracker */}
         <View style={styles.headerCard}>
            <View style={styles.headerContent}>
               <View style={styles.progressContainer}>
                  <Text style={styles.progressTitle}>Suivi de la commande</Text>
                  <View style={styles.progressTrack}>
                     <View style={styles.progressStep}>
                        <MaterialIcons name="check" size={20} color={COLORS.success} />
                        <Text style={styles.progressText}>Commande passée</Text>
                     </View>
                     <View style={styles.progressStep}>
                        <MaterialIcons
                           name={
                              orderStatus === "In Transit" || orderStatus === "Delivered"
                                 ? "check"
                                 : "circle"
                           }
                           size={20}
                           color={
                              orderStatus === "In Transit" || orderStatus === "Delivered"
                                 ? COLORS.success
                                 : COLORS.grey
                           }
                        />
                        <Text style={styles.progressText}>En transit</Text>
                     </View>
                     <View style={styles.progressStep}>
                        <MaterialIcons
                           name={orderStatus === "Delivered" ? "check" : "circle"}
                           size={20}
                           color={orderStatus === "Delivered" ? COLORS.success : COLORS.grey}
                        />
                        <Text style={styles.progressText}>Livré</Text>
                     </View>
                  </View>
               </View>

               <View style={styles.statusContainer}>
                  <View
                     style={[
                        styles.statusBadge,
                        item.paymentStatus === "Paid" ? styles.paid : styles.unpaid,
                     ]}
                  >
                     {item.paymentStatus === "Paid" ? (
                        <MaterialIcons name="check-circle" size={16} color={COLORS.white} />
                     ) : (
                        <MaterialIcons name="warning" size={16} color={COLORS.white} />
                     )}
                     <Text style={styles.statusText}>
                        {item.paymentStatus === "Paid" ? "Payé" : "Non payé"}
                     </Text>
                  </View>
                  <Text style={styles.orderId}>Commande #{item.code}</Text>
               </View>
               <Text style={styles.dateText}>Dernière mise à jour: {formattedLastUpdate}</Text>
            </View>
         </View>

         {/* Image Slider */}
         <View style={styles.sliderContainer}>
            <Slider bannerImages={item?.images!} handleNavigate={handleNavigate} />
         </View>

         {/* Customer Information Section */}
         <View style={styles.card}>
            <Text style={styles.sectionTitle}>Informations client</Text>
            {customerInfo.map((item, index) => (
               <ListItem
                  key={`customer-${index}`}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                  isCopyable={item.isCopyable}
                  onCopy={copyTrackingNumber}
               />
            ))}
         </View>

         {/* Shipping Details Section */}
         <View style={styles.card}>
            <Text style={styles.sectionTitle}>Détails d'expédition</Text>
            {shippingDetails.map((item, index) => (
               <ListItem
                  key={`shipping-${index}`}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
               />
            ))}
         </View>

         {/* Payment Information Section (conditional) */}
         {shippingMode === "sea" && (
            <View style={styles.card}>
               <Text style={styles.sectionTitle}>Informations de paiement</Text>
               {paymentInfo.map((item, index) => (
                  <ListItem
                     key={`payment-${index}`}
                     label={item.label}
                     value={item.value}
                     icon={item.icon}
                  />
               ))}
            </View>
         )}

         {/* Admin Actions */}
         {role === "admin" && (
            <View style={styles.adminActions}>
               <Pressable onPress={handleEdit} style={styles.adminButton}>
                  <AntDesign name="edit" size={20} color={COLORS.blue} />
                  <Text style={styles.adminButtonText}>Modifier</Text>
               </Pressable>
               <Pressable onPress={showDeleteModal} style={styles.adminButton}>
                  <FontAwesome5 name="trash-alt" size={20} color={COLORS.danger} />
                  <Text style={styles.adminButtonText}>Supprimer</Text>
               </Pressable>
            </View>
         )}

         {/* Primary Action Button */}
         <Button
            mode="contained"
            style={styles.primaryButton}
            onPress={handleNavigate}
            contentStyle={styles.buttonContent}
         >
            <Text style={styles.buttonText}>Voir les détails</Text>
         </Button>
      </SafeAreaView>
   );
};

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   headerCard: {
      backgroundColor: COLORS.white,
      borderRadius: 16,
      padding: 16,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      marginBottom: 16,
   },
   headerContent: {
      flex: 1,
   },
   progressContainer: {
      marginBottom: 16,
   },
   progressTitle: {
      fontSize: 14,
      fontWeight: "600",
      fontFamily: Fonts.medium,
      color: COLORS.dark,
      marginBottom: 8,
   },
   progressTrack: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   progressStep: {
      alignItems: "center",
   },
   progressText: {
      fontSize: 12,
      fontWeight: "500",
      fontFamily: Fonts.regular,
      color: COLORS.grey,
      marginTop: 4,
   },
   statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
   },
   statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginRight: 12,
      backgroundColor: COLORS.blue,
   },
   paid: {
      backgroundColor: COLORS.success,
   },
   unpaid: {
      backgroundColor: COLORS.danger,
   },
   statusText: {
      fontSize: 12,
      fontWeight: "600",
      fontFamily: Fonts.medium,
      color: COLORS.white,
   },
   orderId: {
      fontSize: 18,
      fontWeight: "700",
      fontFamily: Fonts.bold,
      color: COLORS.dark,
   },
   dateText: {
      fontSize: 14,
      color: COLORS.grey,
      fontFamily: Fonts.regular,
   },
   card: {
      backgroundColor: COLORS.white,
      borderRadius: 16,
      padding: 16,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      marginBottom: 16,
   },
   sliderContainer: {
      marginBottom: 16,
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
   },
   sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      fontFamily: Fonts.bold,
      color: COLORS.dark,
      marginBottom: 12,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
   },
   adminActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 16,
      marginTop: 16,
   },
   adminButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
   },
   adminButtonText: {
      marginLeft: 8,
      fontSize: 14,
      fontFamily: Fonts.medium,
   },
   primaryButton: {
      width: "90%",
      alignSelf: "center",
      backgroundColor: COLORS.blue,
      marginVertical: 16,
      borderRadius: 12,
      height: 50,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
   },
   buttonContent: {
      justifyContent: "center",
   },
   buttonText: {
      fontFamily: Fonts.medium,
      color: COLORS.white,
      fontSize: 16,
   },
});
