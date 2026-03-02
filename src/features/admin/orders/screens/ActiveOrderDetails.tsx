import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { Checkbox } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { RootStackScreenProps } from "@src/navigations/type";
import { useGetOrderDetail } from "@src/features/orders/hooks/useOrderDetail";
import AppButton from "@src/components/AppButton/AppButton";
import { useGetRoutes } from "@src/features/routes";
import { DetailRow } from "@src/components/DetailsRow/DetailsRow";
import { formatDate } from "@src/utils/formatDate";
import { useUpdateOrder, useUpdateStatusDelivery } from "../hooks/useOrderManagement";

interface UpdateSelected {
   title: string;
   coordinates: {
      latitude: string;
      location: string;
      longitude: string;
   }[];
   id: string;
   time: string;
}

const ActiveOrderDetails = ({ route }: RootStackScreenProps<"ActiveOrderDetails">) => {
   const [selectedCheckboxes, setSelectedCheckboxes] = useState<{ [key: string]: boolean }>({});
   const [selected, setSelected] = useState<any>(null);
   const { mutate } = useUpdateOrder();
   const [coordinatesData, setCoordinatesData] = useState<
      { latitude: string; location: string; longitude: string }[]
   >([]);
   const [note, setNote] = useState("");

   const id = route.params.id;
   const { data: item } = useGetOrderDetail(id);
   const [statusChange, setStatusChange] = useState("");
   const { data: Routes } = useGetRoutes();
   const [actualLocation, setActualLocation] = useState("");
   const [pickerValue, setPickerValue] = useState(actualLocation);
   const { mutate: updateStatusDelivery, isPending } = useUpdateStatusDelivery(id);

   const updateDeliver = () => {
      updateStatusDelivery({
         ...item,
         orderId: item?.code!,
      });
   };

   const Status = Routes?.[0];

   const updateOrder = (updatedSelected: UpdateSelected) => {
      mutate({
         ...item,
         orderId: item._id!,
         currentPosition: updatedSelected,
      });
   };

   useEffect(() => {
      const datad = item?.route?.[item.route?.length - 1] ?? [];
      const coordinateArr = datad?.coordinates || [];
      const lastItem = coordinateArr[coordinateArr?.length - 1];
      setActualLocation(lastItem?.location);
   }, [item]);

   const handleStepChange = (value: string, status: string, coordinates: any) => {
      const location = coordinates.find((loc: any) => loc.location === value);
      setStatusChange(status);
      setPickerValue(value);
      setNote(location?.note);
      if (location) {
         setCoordinatesData([location]);
      }
   };

   const updateTransiteStatus = () => {
      const updatedSelected = {
         title: statusChange,
         coordinates: coordinatesData,
         id: Math.random().toString(36).substring(7),
         time: new Date().toISOString(),
         note: note,
      };
      updateOrder(updatedSelected);
   };

   const handleCheckboxPress = (location: string, status: string, coordinates: any) => {
      const updatedCheckboxes = {
         ...selectedCheckboxes,
         [location]: !selectedCheckboxes[location],
      };

      const updatedSelected = {
         title: status,
         coordinates,
         id: Math.random().toString(36).substring(7),
         time: new Date().toISOString(),
         note: `La status de votre colis est : ${status} `,
      };

      setSelectedCheckboxes(updatedCheckboxes);
      setSelected(updatedSelected);
      updateOrder(updatedSelected);
   };

   useEffect(() => {
      if (item) {
         const initialCheckboxes = item?.route?.reduce(
            (acc: { [key: string]: boolean }, route: any) => {
               route?.coordinates?.forEach((location: any) => {
                  acc[location.location] = Status?.orderDetail.some(
                     (detail: any) =>
                        detail.status === route.title &&
                        detail.coordinates.some((coord: any) => coord.location === location.location)
                  );
               });
               return acc;
            },
            {}
         );

         setSelectedCheckboxes(initialCheckboxes);
      }
   }, [item, Status]);

   const formattedDateTime = formatDate(item?.departureDate!);
   const formattedLastUpdate = formatDate(item?.updatedAt!);

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView>
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
                     label="Volume du colis"
                     value={`${item?.packageCBM?.toLocaleString() || "0"} CBM`}
                     icon="cube-outline"
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
                  <DetailRow label="Date de chargement" value={formattedDateTime} icon="calendar" />
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

            {/* Routes section */}
            {Status?.orderDetail?.map((routeItem: any) => (
               <View key={routeItem.id} style={styles.routeContainer}>
                  <Text style={styles.valueStyle}>{routeItem.status}</Text>
                  <View>
                     {routeItem.status === "Order in Transit" ? (
                        <Picker
                           prompt="Change le trajet"
                           mode="dialog"
                           style={styles.picker}
                           selectedValue={pickerValue || actualLocation}
                           onValueChange={(itemValue) => {
                              handleStepChange(itemValue, routeItem?.status, routeItem?.coordinates);
                           }}
                        >
                           {routeItem.coordinates.map((c: any) => (
                              <Picker.Item key={c.location} label={c.location} value={c.location} />
                           ))}
                        </Picker>
                     ) : (
                        routeItem.coordinates.map((location: any) => (
                           <Pressable
                              key={location.location}
                              onPress={() =>
                                 handleCheckboxPress(
                                    location.location,
                                    routeItem.status,
                                    routeItem.coordinates
                                 )
                              }
                              style={styles.checkboxContainer}
                           >
                              <Text style={styles.propertyStyle}>{location.location}</Text>
                              <Checkbox
                                 status={
                                    selectedCheckboxes[location.location] ? "checked" : "unchecked"
                                 }
                                 onPress={() =>
                                    handleCheckboxPress(
                                       location.location,
                                       routeItem.status,
                                       routeItem.coordinates
                                    )
                                 }
                              />
                           </Pressable>
                        ))
                     )}
                  </View>
               </View>
            ))}

            {item?.status === "Inactive" ? (
               <Text
                  style={{
                     color: COLORS.green,
                     textAlign: "center",
                     fontSize: 18,
                     fontFamily: Fonts.bold,
                  }}
               >
                  Le client a recupere son colis
               </Text>
            ) : (
               <View style={styles.buttonContainer}>
                  <AppButton title="Update" onPress={updateTransiteStatus} />
               </View>
            )}

            <View style={styles.buttonContainer}>
               <AppButton
                  style={{ marginTop: 25, backgroundColor: COLORS.redShade }}
                  title="Mark comme delivre"
                  onPress={updateDeliver}
                  background="red"
                  busy={isPending}
               />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

const detailStyles = StyleSheet.create({
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
});

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   routeContainer: {
      borderColor: COLORS.grey,
      borderWidth: 0.5,
      padding: 10,
      margin: 20,
   },
   valueStyle: {
      fontFamily: Fonts.bold,
   },
   picker: {
      width: "100%",
   },
   checkboxContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
   propertyStyle: {
      fontFamily: Fonts.regular,
      color: COLORS.grey,
   },
   buttonContainer: { width: "50%", alignSelf: "center" },
});

export default ActiveOrderDetails;
