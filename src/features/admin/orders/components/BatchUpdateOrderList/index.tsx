import React, { useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { styles } from "./BatchUpdateOrderList.styles";

export interface BatchUpdateOrderItem {
   id?: string;
   name?: string;
   info?: string;
   images?: string;
   currentStatus?: string;
   shippingMode?: string;
   code?: string;
   lastUpdate?: string;
   price?: number;
   packageWeight?: number | string;
}

interface BatchUpdateOrderListProps {
   orders: BatchUpdateOrderItem[];
   selectedItems: string[];
   setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
   hasData: boolean;
}

interface OrderRowProps {
   item: BatchUpdateOrderItem;
   selected: boolean;
   onToggle: (id: string) => void;
}

const formatDate = (value?: string) => {
   if (!value) return "Date inconnue";
   return new Date(value).toLocaleDateString();
};

const OrderRow = React.memo(({ item, selected, onToggle }: OrderRowProps) => {
   const { colors } = useAppTheme();
   const itemId = item.id || "";

   return (
      <Pressable
         accessibilityRole="checkbox"
         accessibilityState={{ checked: selected }}
         onPress={() => onToggle(itemId)}
         style={({ pressed }) => [
            styles.card,
            {
               backgroundColor: colors.background.card,
               borderColor: selected ? colors.primary.main : colors.border,
               opacity: pressed ? 0.82 : 1,
            },
         ]}
      >
         {item.images ? (
            <Image source={{ uri: item.images }} style={styles.image} />
         ) : (
            <View style={[styles.imageFallback, { backgroundColor: colors.primary[50] }]}>
               <Ionicons name="cube-outline" size={22} color={colors.primary[700]} />
            </View>
         )}
         <View style={styles.body}>
            <View style={styles.titleRow}>
               <Text numberOfLines={1} style={[styles.name, { color: colors.text.primary }]}>
                  {item.name || "Client inconnu"}
               </Text>
               <View
                  style={[
                     styles.check,
                     {
                        backgroundColor: selected ? colors.primary.main : colors.background.card,
                        borderColor: selected ? colors.primary.main : colors.border,
                     },
                  ]}
               >
                  {selected && <Ionicons name="checkmark" size={14} color={colors.text.inverse} />}
               </View>
            </View>
            <Text numberOfLines={1} style={[styles.meta, { color: colors.text.secondary }]}>
               {item.code || "Sans code"} - {item.info || "Aucun téléphone"}
            </Text>
            <View style={styles.detailRow}>
               <Text style={[styles.badge, { color: colors.primary[700], backgroundColor: colors.primary[50] }]}>
                  {item.currentStatus || "Statut inconnu"}
               </Text>
               <Text style={[styles.detail, { color: colors.text.secondary }]}>
                  {formatDate(item.lastUpdate)}
               </Text>
            </View>
         </View>
      </Pressable>
   );
});

OrderRow.displayName = "BatchUpdateOrderRow";

export const BatchUpdateOrderList: React.FC<BatchUpdateOrderListProps> = ({
   orders,
   selectedItems,
   setSelectedItems,
   hasData,
}) => {
   const { colors } = useAppTheme();

   const handleToggle = useCallback((id: string) => {
      if (!id) return;
      Haptics.selectionAsync();
      setSelectedItems((prev) => (
         prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
      ));
   }, [setSelectedItems]);

   const renderItem = useCallback(({ item }: { item: BatchUpdateOrderItem }) => (
      <OrderRow item={item} selected={selectedItems.includes(item.id || "")} onToggle={handleToggle} />
   ), [handleToggle, selectedItems]);

   const emptyTitle = hasData ? "Aucune commande trouvée" : "Choisissez un statut et une date";
   const emptySubtitle = hasData
      ? "Essayez un autre filtre pour retrouver les commandes concernées."
      : "Lancez la recherche pour préparer une mise à jour en lot.";

   return (
      <FlashList
         data={orders}
         renderItem={renderItem}
         keyExtractor={(item) => item.id || item.code || "unknown-order"}
         contentContainerStyle={styles.listContent}
         ListEmptyComponent={(
            <View style={styles.empty}>
               <Ionicons name="file-tray-outline" size={34} color={colors.text.secondary} />
               <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>{emptyTitle}</Text>
               <Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>{emptySubtitle}</Text>
            </View>
         )}
      />
   );
};
