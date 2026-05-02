/** DimensionsInput - Component for entering dimensions or direct CBM */
import React, { useMemo } from "react";
import { View } from "react-native";
import { Text, Card, TouchableRipple } from "react-native-paper";
import { FormInput } from "./FormInput";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createDimensionsInputStyles } from "./DimensionsInput.styles";

export interface DimensionsInputProps {
   useDimensions: boolean;
   onToggleMode: (use: boolean) => void;
   length: string;
   width: string;
   height: string;
   cbm: string;
   onChangeLength: (value: string) => void;
   onChangeWidth: (value: string) => void;
   onChangeHeight: (value: string) => void;
   onChangeCBM: (value: string) => void;
   errors: { length?: string; width?: string; height?: string; cbm?: string };
   calculatedCBM: number;
}

export const DimensionsInput: React.FC<DimensionsInputProps> = ({
   useDimensions = false,
   onToggleMode,
   length,
   width,
   height,
   cbm,
   onChangeLength,
   onChangeWidth,
   onChangeHeight,
   onChangeCBM,
   errors,
   calculatedCBM,
}) => {
   const { colors, isDark } = useAppTheme();
   const styles = useMemo(() => createDimensionsInputStyles(colors, isDark), [colors, isDark]);

   return (
      <Card style={styles.card} elevation={2}>
         <Card.Content style={styles.cardContent}>
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
            {useDimensions ? (
               <View style={styles.dimensionsContainer}>
                  <View style={styles.row}>
                     <View style={styles.dimensionColumn}>
                        <FormInput label="Longueur" value={length} onChangeText={onChangeLength} error={errors.length} keyboardType="decimal-pad" placeholder="0" suffix="cm" />
                     </View>
                     <View style={styles.dimensionColumn}>
                        <FormInput label="Largeur" value={width} onChangeText={onChangeWidth} error={errors.width} keyboardType="decimal-pad" placeholder="0" suffix="cm" />
                     </View>
                     <View style={styles.dimensionColumn}>
                        <FormInput label="Hauteur" value={height} onChangeText={onChangeHeight} error={errors.height} keyboardType="decimal-pad" placeholder="0" suffix="cm" />
                     </View>
                  </View>
                  {calculatedCBM > 0 && (
                     <View style={styles.calculatedContainer}>
                        <View style={styles.calculatedBadge}>
                           <Text style={styles.calculatedLabel}>CBM calculé</Text>
                           <Text style={styles.calculatedValue}>{calculatedCBM.toFixed(4)} m³</Text>
                        </View>
                     </View>
                  )}
               </View>
            ) : (
               <View style={styles.directCbmContainer}>
                  <FormInput label="CBM direct" value={cbm} onChangeText={onChangeCBM} error={errors.cbm} keyboardType="phone-pad" placeholder="0.0000" suffix="m³" />
               </View>
            )}
         </Card.Content>
      </Card>
   );
};

export default DimensionsInput;
