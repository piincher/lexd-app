import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import React from "react";
import { Pressable, View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface RenderListItemProps<T> {
   item: T;
   selectedItem: T;
   setSelectedItem: React.Dispatch<React.SetStateAction<T | undefined>>;
   renderItemContent: (item: T) => React.ReactNode;
   style?: ViewStyle;
}

const RenderListItem = <T,>({
   item,
   selectedItem,
   setSelectedItem,
   renderItemContent,
   style,
}: RenderListItemProps<T>) => {
   const isSelected = selectedItem === item;

   return (
      <Pressable
         style={[styles.itemContainer, isSelected && styles.selectedItem, style]}
         onPress={() => setSelectedItem(item)}
         accessibilityLabel={`Select item`}
         key={JSON.stringify(item._id)}
      >
         <View style={styles.itemContent}>{renderItemContent(item)}</View>
         <MaterialIcons name="navigate-next" size={24} color={COLORS.blue} />
      </Pressable>
   );
};

const styles = StyleSheet.create({
   itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      backgroundColor: "white", // Default background color
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
   },
   selectedItem: {
      backgroundColor: "#e0f7fa", // Change background color for the selected item
   },
   itemContent: {
      flex: 1, // Allow content to take available space
   },
   userName: {
      fontSize: 16,
      fontWeight: "bold",
   },
   userRole: {
      fontSize: 14,
      color: "#666",
   },
});

export default RenderListItem;
