import RenderListItem from "@src/components/RenderListItem/RenderListItem";
import { COLORS } from "@src/constants/Colors";
import { RootStackParamList, RootStackScreenProps } from "@src/navigations/type";
import { useShippingMode } from "@src/store/shippingMode";
import React, { FC, useState } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Item = {
   id: string;
   title: "air" | "sea";
};
type DataType = Item[];

const list: DataType = [
   { id: "0", title: "air" },
   { id: "1", title: "sea" },
];

const ShippingMethod = ({ navigation }: RootStackScreenProps<"ShippingMethod">) => {
   const [selectedItem, setSelectedItem] = useState<DataType[number] | undefined>(undefined);
   const setType = useShippingMode((state) => state.setType);
   const items = list;

   const handleTypeChange = (item: Item) => {
      setType(item.title);
      navigation.navigate("ActiveOrder", { type: item.title });
   };
   return (
      <SafeAreaView style={styles.container}>
         <FlatList
            data={items}
            renderItem={({ item }) => (
               <RenderListItem
                  item={item}
                  selectedItem={selectedItem!}
                  setSelectedItem={setSelectedItem}
                  renderItemContent={(item) => (
                     <Pressable style={{ padding: 20 }} onPress={() => handleTypeChange(item)}>
                        <Text style={styles.userName}>{item.title}</Text>
                     </Pressable>
                  )}
               />
            )}
            keyExtractor={(item) => item.id}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   userName: {
      fontSize: 20,
      fontWeight: "bold",
   },
   userRole: {
      fontSize: 14,
      color: "#666",
   },
   buttonContainer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      padding: 20,
      backgroundColor: "white",
   },
});

export default ShippingMethod;
