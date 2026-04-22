import { useAppTheme } from "@src/providers/ThemeProvider";
import React, { useMemo } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";
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
   const { colors } = useAppTheme();
   const isSelected = selectedItem === item;

   const styles = useMemo(
      () =>
         StyleSheet.create({
            itemContainer: {
               flexDirection: "row",
               alignItems: "center",
               padding: 16,
               backgroundColor: colors.background.card,
               borderBottomWidth: 1,
               borderBottomColor: colors.border,
               flex: 1,
            },
            selectedItem: {
               backgroundColor: colors.background.paper,
            },
            itemContent: {
               flex: 1,
            },
            userName: {
               fontSize: 16,
               fontWeight: "bold",
            },
            userRole: {
               fontSize: 14,
               color: colors.text.secondary,
            },
         }),
      [colors],
   );

   return (
      <Pressable
         style={[styles.itemContainer, isSelected && styles.selectedItem, style]}
         onPress={() => setSelectedItem(item)}
         accessibilityLabel={`Select item`}
         key={JSON.stringify(item._id)}
      >
         <View style={styles.itemContent}>{renderItemContent(item)}</View>
         <MaterialIcons name="navigate-next" size={24} color={colors.primary.main} />
      </Pressable>
   );
};

export default RenderListItem;
