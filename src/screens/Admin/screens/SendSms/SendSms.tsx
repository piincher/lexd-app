import React, { FC, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MultiSelect } from "./components/MultiSelect";
import { useGetUsers } from "../../hooks/useGetUsers";
import { Button, TextInput } from "react-native-paper";
import { useGetOrderBaseonDate, useSendNotificationSms } from "../../hooks/useOrder";
import { Notification } from "@src/components/Notification/Notification";
import AppButton from "@src/components/AppButton/AppButton";
import { COLORS } from "@src/constants/Colors";
import { Header } from "@src/components/Header/Header";
import { RootStackScreenProps } from "@src/navigations/type";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Calendar, useCalendar } from "@src/components/Calendar/Calendar";
interface Props {}

const SendSms = ({ navigation }: RootStackScreenProps<"SendSms">) => {
   const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
   const [visible, setVisible] = React.useState<boolean>(false);
   const { mutate, isSuccess, isPending } = useSendNotificationSms();
   const [search, setSearch] = React.useState<string>("");
   const [message, setMessage] = React.useState<string>("");

   const { open, date, onConfirmSingle, onDismissSingle, setOpen } = useCalendar();

   const {
      mutate: fetchMutation,
      data: fetctedData,
      isSuccess: fetchDataSuccess,
      isPending: fetchDataIsPending,
      reset,
   } = useGetOrderBaseonDate();

   const handleSendSms = () => {
      mutate({
         phoneNumbers: selectedItems,
         message,
      });
   };

   useEffect(() => {
      if (isSuccess) {
         setVisible(true);
      }
   }, [isSuccess, setVisible]);

   const onDismissSnackBar = () => setVisible(false);

   useEffect(() => {
      if (open) {
         reset();
      }
   }, [open]);
   const extractedData2 = fetctedData?.map((item) => {
      return {
         id: item.clientPhone,
         name: item.clientName,
         info: item.clientPhone,
      };
   });

   const filteredData = extractedData2?.filter((item) => {
      return (
         item.name.toLowerCase().includes(search.toLowerCase()) ||
         item.info.toLowerCase().includes(search.toLowerCase())
      );
   });

   const departureDate = new Date(
      date?.getFullYear() ?? 1970,
      date?.getMonth() ?? 0,
      date?.getDate() + 1 ?? 1
   );

   const fetch = () => {
      fetchMutation({
         departureDate: departureDate,
      });
   };

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView keyboardShouldPersistTaps="always">
            <KeyboardAvoidingView
               style={{
                  flex: 1,
                  justifyContent: "center",
               }}
               behavior={Platform.OS === "ios" ? "height" : undefined}
            >
               <Header
                  title="Envoyer un message"
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
               <TextInput
                  label="search client"
                  mode="outlined"
                  onChangeText={(text) => setSearch(text)}
                  multiline
                  numberOfLines={4}
                  style={{ margin: 10 }}
               />
               <MultiSelect
                  items={filteredData}
                  valueKey="id"
                  displayKey="name"
                  selectedItems={selectedItems}
                  setSelectedIte
                  setSelectedItems={setSelectedItems}
               />

               <Notification
                  message="message envoye"
                  type="success"
                  visible={visible}
                  onDismissSnackBar={onDismissSnackBar}
               />
               <TextInput
                  label="Message"
                  mode="outlined"
                  onChangeText={(text) => setMessage(text)}
                  multiline
                  numberOfLines={4}
                  style={{ margin: 10 }}
               />
               <AppButton
                  onPress={fetctedData?.length > 0 ? handleSendSms : fetch}
                  title={fetctedData?.length > 0 ? "Envoyez un message" : "Obtenir les client "}
                  busy={fetchDataIsPending || isPending}
               />
            </KeyboardAvoidingView>
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
});

export default SendSms;
