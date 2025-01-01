import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@src/components/Header/Header";
import { RootStackScreenProps } from "@src/navigations/type";
import { useCalendar, Calendar } from "@src/components/Calendar/Calendar";
import { AntDesign } from "@expo/vector-icons";
import AppButton from "@src/components/AppButton/AppButton";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useMutateBetweenDate } from "@src/screens/Admin/hooks/useOrder";
import { LoadingSpinner } from "@src/components/LoadingSpinner";
import { MultiSelect } from "../../SendSms/components/MultiSelect";
const Status = [
   {
      id: "1",
      title: "Active",
   },

   {
      id: "3",
      title: "In Transit",
   },
   {
      id: "4",
      title: "Delivered",
   },
];

const BatchUpdate = ({ navigation }: RootStackScreenProps<"BatchUpdate">) => {
   const { open, date, onConfirmSingle, onDismissSingle, setOpen } = useCalendar();
   const [pickerValue, setPickerValue] = useState(Status[0].title);
   const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
   const { mutate, data, isPending, reset } = useMutateBetweenDate();

   const startDate = new Date(
      date?.getFullYear() ?? 1970,
      date?.getMonth() ?? 0,
      date?.getDate() + 1 ?? 1
   );

   // const getYear2 = new Date(range?.endDate).getFullYear();
   // const getMonth2 = new Date(range?.endDate).getMonth();
   // const getDate2 = new Date(range?.endDate).getDate();
   // const endDate = new Date(getYear2, getMonth2, getDate2 + 1);

   useEffect(() => {
      if (open) {
         reset();
      }
   }, [open]);

   const checkfororders = () => {
      mutate({
         departureDate: startDate,
         status: pickerValue,
      });
   };

   const extractedData = data?.map((item) => {
      return {
         id: item._id,
         name: item?.clientName,
         info: item?.clientPhone,
         images: item?.images[0]?.url,
         currentStatus: item?.currentStatus,
         shippingMode: item?.shippingMode,
         code: item?.code,
         lastUpdate: item?.updatedAt,
         price: item?.priceTotal,
         packageWeight: item?.packageCBM,
      };
   });

   const navigateToNextScreen = () => {
      navigation.navigate("BatchUpdateDetail", { data: selectedItems });
   };

   if (isPending) {
      return <LoadingSpinner />;
   }

   const handleChange = (value: string) => {
      setPickerValue(value);
   };

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
         <Header
            title="Batch Update"
            navigation={navigation}
            rightIcon={<AntDesign name="calendar" size={24} color="black" />}
            rightIconHandler={() => setOpen(true)}
         />
         <Calendar
            open={open}
            onDismissSingle={onDismissSingle}
            date={date}
            onConfirmSingle={onConfirmSingle}
         />
         <View style={styles.routeContainer}>
            <Text style={styles.valueStyle}>{pickerValue}</Text>
            <View>
               {
                  <Picker
                     prompt="Change le trajet"
                     mode="dialog"
                     style={styles.picker}
                     selectedValue={pickerValue}
                     onValueChange={handleChange}
                  >
                     {Status.map((c) => (
                        <Picker.Item
                           key={c.id}
                           style={{ fontFamily: Fonts.black }}
                           label={c.title}
                           value={c.title}
                        />
                     ))}
                  </Picker>
               }
            </View>
         </View>

         <MultiSelect
            items={extractedData || []}
            valueKey="id"
            displayKey="name"
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
         />
         {(extractedData ?? []).length > 0 ? (
            <AppButton onPress={navigateToNextScreen} title={"Suivant"} />
         ) : (
            <AppButton onPress={() => checkfororders()} title={"Obtenir"} />
         )}
      </SafeAreaView>
   );
};

export default BatchUpdate;

const styles = StyleSheet.create({
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
      fontFamily: Fonts.bold,
   },
});
