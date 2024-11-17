import { productType } from "@src/api/order";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@src/screens/Admin/screens/ActiveOrder/components/Slider";
import { ListItem } from "../ListItem/ListItem";
import { Button, Text } from "react-native-paper";
import { Pressable, StyleSheet, View } from "react-native";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import React from "react";
import { useAuth } from "@src/store/Auth";
import { formatDate } from "@src/utils/formatDate";
import { AntDesign } from "@expo/vector-icons";
import { useGetOrderDetails } from "@src/screens/OrderDetail/hooks/useGetOrderDetail";
import { useShippingMode } from "@src/store/shippingMode";

export const RenderOrder = ({ item }: { item: productType }) => {
   const currentRoute = item?.route?.[item?.route?.length - 1];
   const { role } = useAuth((state) => state.user);
   const shippingMode = useShippingMode((state) => state.type);
   const navigation = useNavigation();
   const formattedDate = formatDate(item?.departureDate!);
   const formattedLastUpdate = formatDate(item?.updatedAt!);

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
      { label: "Date de Chargement", value: formattedDate, id: "8" },
      { label: "Dernière mise à jour", value: formattedLastUpdate, id: "9" },
      shippingMode === "sea" && {
         label: "Nombre de CBM",
         value: item.packageCBM,
      },
   ];
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
   return (
      <SafeAreaView style={styles.container}>
         {/* image slider section */}

         <Slider bannerImages={item?.images!} handleNavigate={handleNavigate} />
         {/* text container section */}
         <>
            {role === "admin" && (
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center",
                     marginTop: 10,
                     marginHorizontal: 10,
                  }}
               >
                  <Text
                     style={{
                        fontFamily: Fonts.meduim,
                        fontSize: 20,
                        marginLeft: 20,
                        marginTop: 10,
                     }}
                  >
                     EDIT
                  </Text>
                  <Pressable onPress={handleEdit}>
                     <AntDesign name="edit" size={24} color={COLORS.blue} />
                  </Pressable>
               </View>
            )}
            {textContentData.map((content, index) => {
               return (
                  <Pressable onPress={handleNavigate} key={content.id}>
                     <ListItem label={content.label} value={content.value!} index={content.id} />
                     <View style={styles.bottomLine} />
                  </Pressable>
               );
            })}
         </>

         {/* Button */}

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
