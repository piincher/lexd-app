import React from 'react';
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./DimensionsToggle.styles";

interface DimensionsToggleProps {
   useDimensions: boolean;
   onToggleMode: (use: boolean) => void;
}

export const DimensionsToggle: React.FC<DimensionsToggleProps> = ({ useDimensions, onToggleMode }) => {
   const { colors } = useAppTheme();
   const styles = createStyles(colors);

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
