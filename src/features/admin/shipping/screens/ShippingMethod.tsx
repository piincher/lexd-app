import RenderListItem from "@src/components/RenderListItem/RenderListItem";
import type { RootStackParamList, RootStackScreenProps } from "@src/navigations/type";
import { useShippingMode } from "@src/store/shippingMode";
import React, { FC, useState, useMemo } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";

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
   const { colors, isDark } = useAppTheme();

   const styles = useMemo(() => StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: colors.background.default,
      },
      userName: {
         fontSize: 20,
         fontWeight: "bold",
      },
      userRole: {
         fontSize: 14,
         color: colors.text.secondary,
      },
      buttonContainer: {
         position: "absolute",
         bottom: 0,
         width: "100%",
         padding: 20,
         backgroundColor: colors.background.card,
      },
   }), [colors, isDark]);

   const handleTypeChange = (item: Item) => {
      setType(item.title);
      navigation.navigate("ActiveOrder", { type: item.title });
   };
   return (
      <SafeAreaView style={styles.container}>
         <FlashList
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

export default ShippingMethod;
