import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface BatchUpdateFooterProps {
   hasData: boolean;
   selectedCount: number;
   onCheckOrders: () => void;
   onNavigateNext: () => void;
}

export const BatchUpdateFooter: React.FC<BatchUpdateFooterProps> = ({
   hasData,
   selectedCount,
   onCheckOrders,
   onNavigateNext,
}) => {
   const { colors } = useAppTheme();
   const disabled = hasData && selectedCount === 0;
   const title = hasData ? `Continuer (${selectedCount})` : "Rechercher les commandes";

   return (
      <View style={[styles.container, { backgroundColor: colors.background.default, borderColor: colors.border }]}>
         {hasData && (
            <Text style={[styles.helper, { color: colors.text.secondary }]}>
               Sélectionnez les commandes à mettre à jour en lot.
            </Text>
         )}
         <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={hasData ? onNavigateNext : onCheckOrders}
            style={({ pressed }) => [
               styles.button,
               {
                  backgroundColor: disabled ? colors.action.disabledBackground : colors.primary.main,
                  opacity: pressed ? 0.78 : 1,
               },
            ]}
         >
            <Text style={[styles.buttonText, { color: colors.text.inverse }]}>{title}</Text>
            <Ionicons name={hasData ? "arrow-forward" : "search"} size={20} color={colors.text.inverse} />
         </Pressable>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      borderTopWidth: 1,
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 16,
   },
   helper: {
      fontSize: 12,
      marginBottom: 8,
      textAlign: "center",
   },
   button: {
      minHeight: 56,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
   },
   buttonText: {
      fontSize: 15,
      fontWeight: "800",
   },
});
