import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface DimensionsToggleProps {
   useDimensions: boolean;
   onToggleMode: (use: boolean) => void;
}

export const DimensionsToggle: React.FC<DimensionsToggleProps> = ({ useDimensions, onToggleMode }) => {
   const { colors } = useAppTheme();

   const styles = StyleSheet.create({
      toggleContainer: {
         borderRadius: 12,
         backgroundColor: colors.background.paper,
         borderWidth: 1,
         borderColor: colors.border,
      },
      toggleRow: {
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
         padding: 16,
      },
      toggleInfo: {
         flex: 1,
      },
      toggleLabel: {
         fontSize: 15,
         fontWeight: "700",
         color: colors.text.primary,
      },
      toggleHint: {
         fontSize: 13,
         color: colors.text.secondary,
         marginTop: 2,
      },
      toggleSwitch: {
         width: 52,
         height: 32,
         borderRadius: 16,
         backgroundColor: colors.neutral[200],
         padding: 4,
         marginLeft: 12,
      },
      toggleSwitchActive: {
         backgroundColor: colors.status.success,
      },
      toggleThumb: {
         width: 24,
         height: 24,
         borderRadius: 12,
         backgroundColor: colors.background.card,
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.2,
         shadowRadius: 2,
         elevation: 2,
      },
      toggleThumbActive: {
         transform: [{ translateX: 20 }],
      },
   });

   return (
      <TouchableRipple onPress={() => onToggleMode(!useDimensions)} style={styles.toggleContainer}>
         <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
               <Text style={styles.toggleLabel}>Utiliser les dimensions</Text>
               <Text style={styles.toggleHint}>
                  {useDimensions ? "Calcul automatique du CBM" : "Saisie manuelle du CBM"}
               </Text>
            </View>
            <View style={[styles.toggleSwitch, useDimensions && styles.toggleSwitchActive]}>
               <View style={[styles.toggleThumb, useDimensions && styles.toggleThumbActive]} />
            </View>
         </View>
      </TouchableRipple>
   );
};
