import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@src/components/Header/Header";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useCalendar, Calendar } from "@src/components/Calendar/Calendar";
import { AntDesign } from "@expo/vector-icons";
import AppButton from "@src/components/AppButton/AppButton";
import { Picker } from "@react-native-picker/picker";

import { Fonts } from "@src/constants/Fonts";
import { useMutateBetweenDate } from "../hooks/useOrderManagement";
import { LoadingSpinner } from "@src/components/LoadingSpinner";
import { MultiSelect } from "../../communications/components/MultiSelect";

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
   const { colors, isDark } = useAppTheme();
   const styles = useMemo(() => StyleSheet.create({
      routeContainer: {
         borderColor: colors.border,
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
      selectionControls: {
         flexDirection: "row",
         justifyContent: "space-between",
         marginHorizontal: 20,
         marginTop: 10,
         marginBottom: 10,
      },
      selectButton: {
         flex: 1,
         marginRight: 10,
         backgroundColor: colors.primary.main,
      },
      selectButtonText: {
         color: colors.text.inverse,
      },
      clearButton: {
         flex: 1,
         marginLeft: 10,
         backgroundColor: colors.neutral[200],
      },
      clearButtonText: {
         color: colors.text.secondary,
      },
   }), [colors, isDark]);
   const { open, date, onConfirmSingle, onDismissSingle, setOpen } = useCalendar();
   const [pickerValue, setPickerValue] = useState(Status[0].title);
   const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
   const { mutate, data, isPending, reset } = useMutateBetweenDate();

   const startDate = new Date(
      date?.getFullYear() ?? 1970,
      date?.getMonth() ?? 0,
      date?.getDate() + 1 ?? 1
   );

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

   // Select all items function
   const selectAllItems = () => {
      if (extractedData) {
         const allIds = extractedData
            .map((item) => item.id)
            .filter((id): id is string => typeof id === "string");
         setSelectedItems(allIds);
      }
   };

   // Clear selection function
   const clearSelection = () => {
      setSelectedItems([]);
   };

   if (isPending) {
      return <LoadingSpinner />;
   }

   const handleChange = (value: string) => {
      setPickerValue(value);
   };

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
         <Header
            title="Batch Update Orders"
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

         {/* Add Select All and Clear Selection buttons */}
         <View style={styles.selectionControls}>
            <AppButton
               title="Tout sélectionner"
               onPress={selectAllItems}
               style={styles.selectButton}
            />
            <AppButton
               title="Effacer la sélection"
               onPress={clearSelection}
               style={styles.clearButton}
            />
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
