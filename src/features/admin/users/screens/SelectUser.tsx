import type { RootStackScreenProps } from "@src/navigations/type";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import AppButton from "@src/components/AppButton/AppButton";
import { Header } from "@src/components/Header/Header";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { userData } from "@src/constants/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetUsers } from "../hooks/useUserManagement";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import RenderListItem from "@src/components/RenderListItem/RenderListItem";

const SelectUser = ({ navigation }: RootStackScreenProps<"SelectUser">) => {
   const { colors } = useAppTheme();
   const [selectedUser, setSelectedUser] = useState<userData>();
   const { data } = useGetUsers();
   const [search, setSearch] = useState<string>("");

   // filtered ba
   const filteredData = data?.filter((item) => {
      return (
         item.firstName.toLowerCase().includes(search.toLowerCase()) ||
         item.lastName.toLowerCase().includes(search.toLowerCase()) ||
         (item.phoneNumber ?? "").toLowerCase().includes(search.toLowerCase())
      );
   });
   const handleCreate = async () => {
      navigation.navigate("AddOrder", {
         clientName: `${selectedUser?.firstName} ${selectedUser?.lastName!}`,
         userId: selectedUser?._id!,
         phoneNumber: selectedUser?.phoneNumber?.substring(3)!,
         pushTokens: selectedUser?.pushTokens!,
      });
   };

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
         <Header title="Choisir un client" navigation={navigation} />
         <TextInput
            label="Rechercher un client"
            style={{ margin: 20 }}
            onChangeText={setSearch}
            value={search}
         />
         <FlashList
            data={filteredData}
            renderItem={({ item }) => (
               <RenderListItem
                  item={item}
                  selectedItem={selectedUser!}
                  setSelectedItem={setSelectedUser}
                  renderItemContent={(item) => (
                     <View style={{ padding: 15 }} key={item._id}>
                        <Text style={styles.userName}>
                           {item.firstName}- {item.lastName}
                        </Text>
                        <Text style={styles.userRole}> {item.phoneNumber}</Text>
                        <Text style={styles.userRole}> {item.role}</Text>
                     </View>
                  )}
               />
            )}
            keyExtractor={(item) => item.id}
         />

         <View style={styles.buttonContainer}>
            <AppButton title="Ajouter" onPress={handleCreate} />
         </View>
      </SafeAreaView>
   );
};

const RenderUserItem = ({
   item,
   selectedUser,
   setSelectedUser,
}: {
   item: userData;
   setSelectedUser: React.Dispatch<React.SetStateAction<userData | undefined>>;
   selectedUser: userData;
}) => {
   const isSelected = selectedUser && selectedUser._id === item._id;

   return (
      <Pressable
         style={[styles.userItem, isSelected && styles.selectedUserItem]}
         onPress={() => setSelectedUser(item)}
      >
         <View style={styles.userInfo}>
            <Text style={styles.userName}>
               {item.firstName} {item.lastName}
            </Text>
            <Text style={[styles.userRole]}>+{item.phoneNumber}</Text>
         </View>
         <MaterialIcons name="navigate-next" size={24} color="#22C55E" />
      </Pressable>
   );
};

const styles = StyleSheet.create({
   userItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      marginHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
   },
   selectedUserItem: {
      backgroundColor: "#e6f2ff",
   },
   avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
   },
   userInfo: {
      flex: 1,
   },
   userName: {
      fontSize: 20,
      fontFamily: Fonts.meduim,
   },
   userRole: {
      fontSize: 14,
      color: "#888",
      fontFamily: Fonts.black,
   },
   buttonContainer: {
      width: "50%",
      alignSelf: "center",
      marginBottom: 50,
   },
});

export default SelectUser;
