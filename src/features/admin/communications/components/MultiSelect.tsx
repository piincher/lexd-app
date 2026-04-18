import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

interface Item {
   id: string;
   name: string;
   info?: string;
   currentStatus?: string;
   lastUpdate?: string;
   packageWeight?: string;
   images?: string;
}

interface MultiSelectProps {
   items: Item[];
   valueKey?: keyof Item;
   displayKey?: keyof Item;
   imageKey?: keyof Item;
   statusKey?: keyof Item;
   dateKey?: keyof Item;
   weightKey?: keyof Item;
   selectedItems: string[];
   setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function MultiSelect(props: MultiSelectProps): React.ReactElement {
   const {
      items,
      valueKey = "id",
      displayKey = "name",
      imageKey = "images",
      statusKey = "currentStatus",
      dateKey = "lastUpdate",
      weightKey = "packageWeight",
      selectedItems,
      setSelectedItems,
      ...otherprops
   } = props;

   const handleSelect = (item: Item) => {
      setSelectedItems((prev) => {
         const itemId = item[valueKey] as string;
         if (prev.includes(itemId)) {
            return prev.filter((i) => i !== itemId);
         }
         return [...prev, itemId];
      });
   };

   return (
      <FlashList
         data={items}
         ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
               <Text style={styles.emptyText}>No items available</Text>
            </View>
         )}
         keyExtractor={(item) => item[valueKey] as string}
         renderItem={({ item }) => {
            const isSelected = selectedItems.includes(item[valueKey] as string);
            const lastUpdate = item[dateKey] ? new Date(item[dateKey] as string) : null;

            return (
               <Pressable
                  onPress={() => handleSelect(item)}
                  {...otherprops}
                  style={[styles.card, isSelected ? styles.selectedCard : styles.notSelectedCard]}
               >
                  {/* Image */}
                  {item[imageKey] ? (
                     <Image source={{ uri: item[imageKey] as string }} style={styles.image} />
                  ) : (
                     <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>No Image</Text>
                     </View>
                  )}

                  {/* Details */}
                  <View style={styles.cardDetails}>
                     {/* Name */}
                     <Text style={styles.cardTitle}>
                        {String(item[displayKey])}
                     </Text>

                     {/* Additional Info */}
                     <Text style={styles.cardSubtitle}>Numero de telephone: {item.info}</Text>
                     <Text style={styles.cardSubtitle}>Current Status : {item[statusKey]}</Text>
                     <Text style={styles.cardSubtitle}>
                        Date : {lastUpdate ? lastUpdate.toLocaleDateString() : "N/A"}
                     </Text>
                     <Text style={styles.cardSubtitle}>CBM : {item[weightKey]}</Text>
                  </View>

                  {/* Selection Indicator */}
                  <View
                     style={[
                        styles.indicator,
                        isSelected ? styles.selectedIndicator : styles.notSelectedIndicator,
                     ]}
                  />
               </Pressable>
            );
         }}
      />
   );
}

const styles = StyleSheet.create({
   card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.white,
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
   },
   selectedCard: {
      borderColor: COLORS.blue,
      borderWidth: 2,
   },
   notSelectedCard: {
      borderColor: COLORS.grey,
      borderWidth: 1,
   },
   image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
   },
   placeholderImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: COLORS.grey,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
   },
   placeholderText: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 12,
   },
   cardDetails: {
      flex: 1,
      justifyContent: "center",
      marginRight: 10,
   },
   cardTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: COLORS.black,
      marginBottom: 4,
   },
   cardSubtitle: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: COLORS.grey,
      marginBottom: 10,
   },
   indicator: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.black,
   },
   selectedIndicator: {
      backgroundColor: COLORS.blue,
   },
   notSelectedIndicator: {
      backgroundColor: COLORS.white,
   },
   emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   emptyText: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      textAlign: "center",
      color: COLORS.grey,
   },
});

export default MultiSelect;
