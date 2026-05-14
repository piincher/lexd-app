import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { hapticSelection } from "@src/shared/lib/haptics";

export interface StatusOption {
   id: string;
   title: string;
}

interface BatchUpdateStatusFilterProps {
   options: StatusOption[];
   selected: string;
   onSelect: (title: string) => void;
}

export const BatchUpdateStatusFilter: React.FC<BatchUpdateStatusFilterProps> = ({
   options,
   selected,
   onSelect,
}) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               marginBottom: 16,
            },
            label: {
               fontSize: 13,
               fontWeight: "700",
               color: colors.text.secondary,
               marginBottom: 10,
               paddingHorizontal: 16,
            },
            scroll: {
               paddingHorizontal: 16,
               gap: 8,
            },
            chip: {
               minHeight: 40,
               paddingHorizontal: 16,
               paddingVertical: 8,
               borderRadius: 20,
               borderWidth: 1.5,
               marginRight: 8,
               alignItems: "center",
               justifyContent: "center",
            },
            chipText: {
               fontSize: 14,
               fontWeight: "700",
            },
         }),
      [colors]
   );

   return (
      <View style={styles.container}>
         <Text style={styles.label}>Filtrer par statut</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            {options.map((option) => {
               const isActive = selected === option.title;
               return (
                  <Pressable
                     key={option.id}
                     accessibilityRole="button"
                     accessibilityState={{ selected: isActive }}
                     onPress={() => {
                        hapticSelection();
                        onSelect(option.title);
                     }}
                     style={({ pressed }) => [
                        styles.chip,
                        {
                           backgroundColor: isActive ? colors.primary.main : colors.background.card,
                           borderColor: isActive ? colors.primary.main : colors.border,
                           opacity: pressed ? 0.78 : 1,
                        },
                     ]}
                  >
                     <Text
                        style={[
                           styles.chipText,
                           { color: isActive ? colors.text.inverse : colors.text.primary },
                        ]}
                     >
                        {option.title}
                     </Text>
                  </Pressable>
               );
            })}
         </ScrollView>
      </View>
   );
};
