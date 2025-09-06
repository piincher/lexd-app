import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

interface MultiSelectProps<T> {
   items: (string | T)[];
   valueKey?: keyof T;
   displayKey?: keyof T;
   imageKey?: keyof T;
   statusKey?: keyof T;
   dateKey?: keyof T;
   weightKey?: keyof T;
   selectedItems: string[];
   setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function MultiSelect<T>(props: MultiSelectProps<T>): JSX.Element {
   const {
      items,
      valueKey,
      displayKey,
      imageKey,
      statusKey,
      dateKey,
      weightKey,
      selectedItems,
      setSelectedItems,
      ...otherprops
   } = props;

   const handleSelect = (item: string | T) => {
      setSelectedItems((prev) => {
         const itemId = valueKey ? (item as T)[valueKey] : item;
         if (prev.includes(String(itemId))) {
            return prev.filter((i) => String(i) !== String(itemId));
         }
         return [...prev, String(itemId)];
      });
   };

   console.log("selected items", selectedItems);

   return (
      <FlatList
         data={items}
         ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
               <Text style={styles.emptyText}>No items available</Text>
            </View>
         )}
         keyExtractor={(item, index) => (valueKey ? String((item as T)[valueKey]) : String(index))}
         renderItem={({ item }) => {
            const isSelected = selectedItems.includes(
               valueKey ? String((item as T)[valueKey]) : String(item)
            );

            console.log("rendering item", item, "isSelected:", isSelected);

            return (
               <Pressable
                  onPress={() => handleSelect(item)}
                  {...otherprops}
                  style={[styles.card, isSelected ? styles.selectedCard : styles.notSelectedCard]}
               >
                  {/* Image */}
                  {item?.images ? (
                     <Image source={{ uri: item?.images }} style={styles.image} />
                  ) : (
                     <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>No Image</Text>
                     </View>
                  )}

                  {/* Details */}
                  <View style={styles.cardDetails}>
                     {/* Name */}
                     <Text style={styles.cardTitle}>
                        {displayKey ? String((item as T)[displayKey]) : String(item)}
                     </Text>

                     {/* Additional Info */}
                     <Text style={styles.cardSubtitle}>Numero de telephone: {item?.info}</Text>
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
      borderColor: COLORS.primary,
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
      marginBottom: 2,
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
