import { productType } from "@src/api/order";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@src/screens/Admin/screens/ActiveOrder/components/Slider";
import { ListItem } from "../ListItem/ListItem";
import { Button, Text } from "react-native-paper";
import { Pressable, StyleSheet, View } from "react-native";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useEffect, useState } from "react";
import { useAuth } from "@src/store/Auth";
import { formatDate } from "@src/utils/formatDate";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useGetOrderDetails } from "@src/screens/OrderDetail/hooks/useGetOrderDetail";
import { useShippingMode } from "@src/store/shippingMode";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { CustomModal } from "../Modal/Modal";
import { useDeleteOrder } from "@src/screens/Admin/hooks/useOrder";

export const RenderOrder = ({ item }: { item: productType }) => {
   const currentRoute = item?.route?.[item?.route?.length - 1];
   const { role } = useAuth((state) => state.user);
   const shippingMode = useShippingMode((state) => state.type);
   const navigation = useNavigation();
   const formattedDate = formatDate(item?.departureDate!);
   const formattedLastUpdate = formatDate(item?.updatedAt!);
   const [showModal, setShowModal] = useState(false);
   const { mutate, isSuccess } = useDeleteOrder();

   useEffect(() => {
      if (isSuccess) {
         setShowModal(false);
      }
   }, [isSuccess]);

   useGetOrderDetails(item._id!);

   const textContentData = [
      { label: "Nom du client", value: item.clientName, id: "0" },
      { label: "Numéro du client", value: item.clientPhone, id: "1" },
      { label: "Numéro de suivi", value: item.code, id: "2" },
      { label: "Mode d'expédition", value: item.shippingMode, id: "3" },
      {
         label: "Position Actuelle",
         value: currentRoute?.title ?? "le client a passé une commande",
         id: "5",
      },
      { label: "Nombre de colis", value: item.quantity, id: "6" },
      { label: "Type de colis", value: item?.category?.name || "", id: "7" },
      {
         label: shippingMode === "sea" ? "Date de Chargement" : "Date de Depart",
         value: formattedDate,
         id: "8",
      },
      { label: "Dernière mise à jour", value: formattedLastUpdate, id: "9" },
      ...(shippingMode === "sea"
         ? [
              { label: "Prix Unitaire", value: item.unitPrice, id: "10" },
              { label: "Nombre de CBM", value: item.packageCBM, id: "11" },
              { label: "Le Prix Total", value: item.priceTotal, id: "12" },
              { label: "Compagnie de Transport", value: item.contenairNumber, id: "13" },
              {
                 label: "Status de Paiement",
                 value:
                    item.paymentStatus === "Paid" ? (
                       <Text style={{ color: COLORS.green, fontFamily: Fonts.meduim }}>Payé</Text>
                    ) : (
                       <Text style={{ color: COLORS.danger, fontFamily: Fonts.meduim }}>
                          Non payé
                       </Text>
                    ),
                 id: "14",
              },
           ]
         : []),
   ].filter((item) => item.value !== undefined && item.value !== null && item.value !== "");

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

   const showPopUpModel = () => {
      setShowModal(true);
   };

   const onConfirm = () => {
      mutate({
         orderId: item._id!,
      });
   };

   return (
      <SafeAreaView style={styles.container}>
         <CustomModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={onConfirm}
            cancelText="Cancel"
            title="Delete Order"
            message="Are you sure you want to delete this order?"
         />
         <Slider bannerImages={item?.images!} handleNavigate={handleNavigate} />

         {role === "admin" && (
            <View style={styles.adminActions}>
               <Pressable onPress={showPopUpModel}>
                  <FontAwesome5 name="trash-alt" size={24} color={COLORS.danger} />
               </Pressable>
               <Pressable onPress={handleEdit}>
                  <AntDesign name="edit" size={24} color={COLORS.blue} />
               </Pressable>
            </View>
         )}

         {textContentData.map((content) => (
            <Pressable onPress={handleNavigate} key={content.id}>
               <ListItem label={content.label} value={content.value} index={content.id} />
               <View style={styles.bottomLine} />
            </Pressable>
         ))}

         {role === "admin" && (
            <Button mode="contained" style={styles.buttonStyle} onPress={handleNavigate}>
               <Text style={{ fontFamily: Fonts.meduim, color: COLORS.white }}>Next</Text>
            </Button>
         )}
      </SafeAreaView>
   );
};

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   adminActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      marginHorizontal: 25,
   },
   buttonStyle: {
      width: 200,
      alignSelf: "center",
      backgroundColor: COLORS.blue,
      marginTop: 20,
      height: 40,
      borderRadius: 1,
   },
   bottomLine: {
      borderBottomColor: COLORS.grey,
      borderBottomWidth: 0.2,
      marginHorizontal: 20,
      marginVertical: 5,
   },
});
