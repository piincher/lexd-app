import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { hapticLight } from "@src/shared/lib/haptics";

interface BatchUpdateSelectionBarProps {
   totalCount: number;
   selectedCount: number;
   onSelectAll: () => void;
   onClear: () => void;
}

export const BatchUpdateSelectionBar: React.FC<BatchUpdateSelectionBarProps> = ({
   totalCount,
   selectedCount,
   onSelectAll,
   onClear,
}) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               flexDirection: "row",
               alignItems: "center",
               paddingHorizontal: 16,
               marginBottom: 10,
               minHeight: 36,
            },
            countBadge: {
               backgroundColor: colors.primary[50],
               paddingHorizontal: 10,
               paddingVertical: 4,
               borderRadius: 10,
               marginRight: 12,
            },
            countText: {
               fontSize: 13,
               fontWeight: "800",
               color: colors.primary.main,
            },
            spacer: {
               flex: 1,
            },
            action: {
               flexDirection: "row",
               alignItems: "center",
               gap: 4,
               paddingVertical: 6,
               paddingHorizontal: 8,
               minHeight: 36,
            },
            actionText: {
               fontSize: 13,
               fontWeight: "700",
            },
            divider: {
               width: 1,
               height: 16,
               backgroundColor: colors.border,
               marginHorizontal: 4,
            },
         }),
      [colors]
   );

   if (totalCount === 0) return null;

   return (
      <View style={styles.container}>
         <View style={styles.countBadge}>
            <Text style={styles.countText}>
               {selectedCount} / {totalCount}
            </Text>
         </View>
         <View style={styles.spacer} />
         <Pressable
            accessibilityRole="button"
            onPress={() => {
               hapticLight();
               onSelectAll();
            }}
            style={({ pressed }) => [styles.action, { opacity: pressed ? 0.6 : 1 }]}
         >
            <Ionicons name="checkmark-done-outline" size={16} color={colors.primary.main} />
            <Text style={[styles.actionText, { color: colors.primary.main }]}>Tout</Text>
         </Pressable>
         <View style={styles.divider} />
         <Pressable
            accessibilityRole="button"
            onPress={() => {
               hapticLight();
               onClear();
            }}
            style={({ pressed }) => [styles.action, { opacity: pressed ? 0.6 : 1 }]}
         >
            <Ionicons name="close-circle-outline" size={16} color={colors.text.secondary} />
            <Text style={[styles.actionText, { color: colors.text.secondary }]}>Effacer</Text>
         </Pressable>
      </View>
   );
};
