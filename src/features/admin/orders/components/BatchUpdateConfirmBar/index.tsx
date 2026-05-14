import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { hapticLight } from "@src/shared/lib/haptics";

interface BatchUpdateConfirmBarProps {
   disabled: boolean;
   loading: boolean;
   orderCount: number;
   onConfirm: () => void;
}

export const BatchUpdateConfirmBar: React.FC<BatchUpdateConfirmBarProps> = ({
   disabled,
   loading,
   orderCount,
   onConfirm,
}) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               borderTopWidth: 1,
               paddingHorizontal: 16,
               paddingTop: 10,
               paddingBottom: 16,
            },
            helper: {
               fontSize: 12,
               fontWeight: "500",
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
         }),
      [colors]
   );

   return (
      <View style={[styles.container, { backgroundColor: colors.background.default, borderColor: colors.border }]}>
         <Text style={[styles.helper, { color: colors.text.secondary }]}>
            {disabled
               ? "Sélectionnez un statut pour continuer"
               : `${orderCount} commande(s) seront mises à jour`}
         </Text>
         <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: disabled || loading }}
            disabled={disabled || loading}
            onPress={() => {
               hapticLight();
               onConfirm();
            }}
            style={({ pressed }) => [
               styles.button,
               {
                  backgroundColor: disabled ? colors.action.disabledBackground : colors.primary.main,
                  opacity: pressed ? 0.78 : 1,
               },
            ]}
         >
            {loading ? (
               <Text style={[styles.buttonText, { color: colors.text.inverse }]}>Mise à jour...</Text>
            ) : (
               <>
                  <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
                     Confirmer la mise à jour
                  </Text>
                  <Ionicons name="checkmark-circle-outline" size={20} color={colors.text.inverse} />
               </>
            )}
         </Pressable>
      </View>
   );
};
