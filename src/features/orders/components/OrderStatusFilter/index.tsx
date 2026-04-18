import React, { memo } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useAppTheme } from '@src/providers/ThemeProvider';

/**
 * Horizontal status filter tabs for order lists.
 * SRP: Only responsible for rendering filter pills and reporting selection.
 */

interface FilterItem {
   key: string;
   label: string;
}

interface OrderStatusFilterProps {
   filters: FilterItem[];
   activeFilter: string;
   counts: Record<string, number>;
   onSelect: (key: string) => void;
}

const OrderStatusFilterInner: React.FC<OrderStatusFilterProps> = ({
   filters,
   activeFilter,
   counts,
   onSelect,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.wrapper}>
      <ScrollView
         horizontal
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.container}
      >
         {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            const count = counts[filter.key] ?? 0;

            return (
               <Pressable
                  key={filter.key}
                  onPress={() => onSelect(filter.key)}
                  style={[
                     styles.pill,
                     isActive
                        ? { backgroundColor: colors.primary.main }
                        : {
                             backgroundColor: colors.background.paper,
                             borderWidth: 1,
                             borderColor: colors.border,
                          },
                  ]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={`${filter.label}: ${count}`}
               >
                  <Text
                     style={[
                        styles.pillText,
                        { color: isActive ? "#FFFFFF" : colors.text.secondary },
                     ]}
                  >
                     {filter.label}
                  </Text>
                  <View
                     style={[
                        styles.countBadge,
                        {
                           backgroundColor: isActive
                              ? "rgba(255,255,255,0.25)"
                              : colors.border,
                        },
                     ]}
                  >
                     <Text
                        style={[
                           styles.countText,
                           {
                              color: isActive
                                 ? "#FFFFFF"
                                 : colors.text.secondary,
                           },
                        ]}
                     >
                        {count}
                     </Text>
                  </View>
               </Pressable>
            );
         })}
      </ScrollView>
      </View>
   );
};

export const OrderStatusFilter = memo(OrderStatusFilterInner);

const styles = StyleSheet.create({
   wrapper: {
      flexShrink: 0,
   },
   container: {
      paddingHorizontal: 16,
      paddingBottom: 12,
      gap: 8,
      alignItems: "center",
   },
   pill: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 12,
      paddingRight: 6,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 6,
   },
   pillText: {
      fontSize: 13,
      fontWeight: "600",
   },
   countBadge: {
      minWidth: 22,
      height: 22,
      borderRadius: 11,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 5,
   },
   countText: {
      fontSize: 11,
      fontWeight: "700",
   },
});
