import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { Button, Checkbox } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useUpdateOrder, useUpdateStatusDelivery } from "../../hooks/useOrder";
import { RootStackScreenProps } from "@src/navigations/type";
import { useGetOrderDetails } from "@src/screens/OrderDetail/hooks/useGetOrderDetail";
import AppButton from "@src/components/AppButton/AppButton";
import { useGetRoutes } from "@src/screens/Home/hooks/useRoute";
import { DetailRow } from "@src/components/DetailsRow/DetailsRow";

interface updateSelected {
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
   const [selected, setSelected] = useState<any>(null); // Update the type according to your data structure
   const { mutate } = useUpdateOrder();
   const [coordinatesData, setCoordinatesData] = useState<
      { latitude: string; location: string; longitude: string }[]
   >([]);
   const [note, setNote] = useState("");
   const [locationNote, setLocationNote] = useState("");

   const id = route.params.id;
   const { data: item } = useGetOrderDetails(id);
   const [statusChange, setStatusChange] = useState("");
   const { data: Routes } = useGetRoutes();
   const [actualLocation, setActualLocation] = useState("");
   const [pickerValue, setPickerValue] = useState(actualLocation);
   const { mutate: updateStatusDelivery } = useUpdateStatusDelivery();

   console.log("item", item?.currentStatus);

   const updateDeliver = () => {
      updateStatusDelivery({
         ...item,
         orderId: item?.code,
      });
   };

   const Status = Routes?.[0];

   const updateOrder = (updatedSelected: updateSelected) => {
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
      setLocationNote(lastItem?.note);
   }, [item]);

   const handleStepChange = (value: string, status: string, coordinates: any) => {
      console.log("value", value, status, coordinates);
      const location = coordinates.find((loc) => loc.location === value);

      console.log("location", location);
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

   // handle checkbox press
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

   //  when the screen load check the value of checkbox
   useEffect(() => {
      if (item) {
         const initialCheckboxes = item?.route?.reduce(
            (acc: { [key: string]: boolean }, route: any) => {
               route?.coordinates?.forEach((location: any) => {
                  acc[location.location] = Status?.orderDetail.some(
                     (detail) =>
                        detail.status === route.title &&
                        detail.coordinates.some((coord) => coord.location === location.location)
                  );
               });
               return acc;
            },
            {}
         );

         setSelectedCheckboxes(initialCheckboxes);
      }
   }, [item]);

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView>
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
                  value1={item?.currentStatus!}
                  label2="Type de colis"
                  value2={item?.typeOfPackage!}
               />
               <DetailRow label1="Note" value1={locationNote!} label2="" value2={""} />
            </View>

            {/* Routes section */}
            {Status?.orderDetail?.map((route) => (
               <View key={route.id} style={styles.routeContainer}>
                  <Text style={styles.valueStyle}>{route.status}</Text>
                  <View>
                     {route.status === "Order in Transit" ? (
                        <Picker
                           prompt="Change le trajet"
                           mode="dialog"
                           style={styles.picker}
                           selectedValue={pickerValue || actualLocation}
                           onValueChange={(item) => {
                              handleStepChange(item, route?.status, route?.coordinates);
                           }}
                        >
                           {route.coordinates.map((c) => (
                              <Picker.Item key={c.location} label={c.location} value={c.location} />
                           ))}
                        </Picker>
                     ) : (
                        route.coordinates.map((location) => (
                           <Pressable
                              key={location.location}
                              onPress={() =>
                                 handleCheckboxPress(
                                    location.location,
                                    route.status,
                                    route.coordinates
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
                                       route.status,
                                       route.coordinates
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
               />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   detailContainer: {
      borderWidth: 0.2,
      padding: 20,
      margin: 20,
      borderColor: COLORS.grey,
      borderRadius: 5,
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
